const xmlParser = require('xml-parser');
const pluralize = require('pluralize');

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
  const keys = arr.map(item => item.name);

  keys.forEach((key, index) => {
    const numOfMatchingKeys = keys.filter(k => k === key).length;
    const currentItem = arr[index];

    if (numOfMatchingKeys > 1) {
      const pluralKeyName = pluralize(removeNamespace(key));

      obj[pluralKeyName] = obj[pluralKeyName] || [];

      if (currentItem.children.length) {
        obj[pluralKeyName].push(normalizeChildren(currentItem.children));
      } else {
        obj[pluralKeyName].push(currentItem.content || Object.assign({}, currentItem.attributes));
      }
    } else {

      if (currentItem.children.length) {
        obj[removeNamespace(currentItem.name)] = normalizeChildren(currentItem.children);
      } else {
        obj[removeNamespace(currentItem.name)] = currentItem.content || Object.assign({}, currentItem.attributes);
      }
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
    [removeNamespace(xmlObj.root.name)]: normalizeChildren(xmlObj.root.children),
  };
}

function rawJSON(xml) {
  return xmlParser(xml);
}

module.exports = mapXMLToJSON;
module.exports.test = {
  rawJSON,
};
