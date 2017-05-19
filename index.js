const xmlParser = require('xml-parser');
const pluralize = require('pluralize');

function removeNamespace(key) {
  return key.replace(/\w+:/, '');
}

function normalizeChildren(arr = []) {
  const obj = {};
  const keys = arr.map(item => item.name);

  keys.forEach((key, index) => {
    const numOfMatchingKeys = keys.filter(k => k === key).length;
    const currentItem = arr[index];
    const keyName = numOfMatchingKeys > 1 ? pluralize(removeNamespace(key)) : removeNamespace(key);
    const contentForNonChildren = currentItem.content || Object.assign({}, currentItem.attributes);
    const hasChildren = Boolean(currentItem.children.length);

    if (numOfMatchingKeys > 1) {
      obj[keyName] = obj[keyName] || [];
      obj[keyName].push(
        hasChildren ? normalizeChildren(currentItem.children) : contentForNonChildren
      );
    } else {
      obj[keyName] = hasChildren ? normalizeChildren(currentItem.children) : contentForNonChildren;
    }
  });

  return obj;
}

function preprocess(xml = '') {
  const xmlDeclareTagRegex = /^(<\?xml|<\? xml).*?>/;
  const cdataRegex = /<!\[CDATA\[|\]\]>/g;
  return xml
    .replace(xmlDeclareTagRegex, '')
    .replace(cdataRegex, '');
}

function mapXMLToJSON(xml) {
  const trimmedXml = preprocess(xml);

  const xmlObj = xmlParser(trimmedXml);

  if (!xmlObj.root) {
    return null;
  }

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
