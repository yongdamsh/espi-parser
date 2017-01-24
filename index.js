const xmlParser = require('xml-parser');

function removeNamespace(key) {
  return key.replace(/\w+:/, '');
}

function hasDuplicatedKeys(arr = []) {
  return arr.length > 1 && arr.every((item, index) => {
    if (index === 0) {
      return true;
    }

    return item.name === arr[index - 1].name;
  });
}

function normalizeChildren(arr = []) {
  const obj = {};

  arr.forEach((item) => {
    if (item.children.length) {
      if (hasDuplicatedKeys(item.children)) {
        obj[removeNamespace(item.name)] = item.children.map(
          child => normalizeChildren(child.children)
        );
      } else {
        obj[removeNamespace(item.name)] = normalizeChildren(item.children);
      }
    } else {
      obj[removeNamespace(item.name)] = item.content || Object.assign({}, item.attributes);
    }
  });

  return obj;
}

function preprocess(xml = '') {
  const cdataRegex = /<!\[CDATA\[|\]\]>/g;
  return xml.replace(cdataRegex, '');
}

function mapXMLToJSON(xml) {
  const trimmedXml = preprocess(xml);

  const xmlObj = xmlParser(trimmedXml);
  return {
    [xmlObj.root.name]: normalizeChildren(xmlObj.root.children),
  };
}

function getRawJSON(xml) {
  return xmlParser(xml);
}

module.exports = mapXMLToJSON;
module.exports.test = {
  getRawJSON,
};
