# espi-parser

The parser which convert ESPI(Energy Service Provider Interface) XML Data to JSON with namespace removed keys.

### Setup
```sh
npm install espi-parser
```

### Usage
```js
const util = require('util');
const espiParser = require('espi-parser');

const exampleXml = `
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <id>urn:uuid:f30946a0-0955-466b-901a-366feb2a8424</id>
  <title>Green Button Usage Feed</title>
  <updated>2014-05-22T17:45:50Z</updated>
  <link href="https://services.greenbuttondata.org/DataCustodian/espi/1_1/resource/ApplicationInformation" rel="self"/>
</feed>
`;

const json = espiParser(exampleXml);

console.log(util.inspect(json, { depth: Infinity }));
```

It will be print:
```js
{
  feed: {
    id: 'urn:uuid:f30946a0-0955-466b-901a-366feb2a8424',
    title: 'Green Button Usage Feed',
    updated: '2014-05-22T17:45:50Z',
    link: {
      href: 'https://services.greenbuttondata.org/DataCustodian/espi/1_1/resource/ApplicationInformation',
      rel: 'self'
    }
  }
}
```
