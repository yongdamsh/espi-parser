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

function mapXMLToJSON(xml) {
  const xmlObj = xmlParser(xml);
  return {
    [xmlObj.root.name]: normalizeChildren(xmlObj.root.children),
  };
}

module.exports = mapXMLToJSON;
