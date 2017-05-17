const fs = require('fs');
const path = require('path');
const util = require('util');
const espiParser = require('../index');

const fixtures = {
  ApplicationInformation: fs.readFileSync(path.join(__dirname, '../__fixtures__/ApplicationInformation.xml'), 'utf8'),
  UsagePoint: fs.readFileSync(path.join(__dirname, '../__fixtures__/UsagePoint.xml'), 'utf8'),
  ReadingType: fs.readFileSync(path.join(__dirname, '../__fixtures__/ReadingType.xml'), 'utf8'),
  MeterReading: fs.readFileSync(path.join(__dirname, '../__fixtures__/MeterReading.xml'), 'utf8'),
  IntervalBlock: fs.readFileSync(path.join(__dirname, '../__fixtures__/IntervalBlock.xml'), 'utf8'),
  LocalTimeParameters: fs.readFileSync(path.join(__dirname, '../__fixtures__/LocalTimeParameters.xml'), 'utf8'),
  ElectricPowerUsageSummary: fs.readFileSync(path.join(__dirname, '../__fixtures__/ElectricPowerUsageSummary.xml'), 'utf8'),
  ElectricPowerQualitySummary: fs.readFileSync(path.join(__dirname, '../__fixtures__/ElectricPowerQualitySummary.xml'), 'utf8'),
};

test('parse XML to JSON', () => {
  const outputs = Object.keys(fixtures).map(k => espiParser(fixtures[k]));

  expect(outputs.every(output => output && typeof output === 'object')).toBeTruthy();
});

test('get child object with non namespace key', () => {
  const json = espiParser(fixtures.ApplicationInformation);

  expect(typeof json.feed === 'object').toBeTruthy();
});

test('link tag has attributes', () => {
  const json = espiParser(fixtures.ApplicationInformation);
  const expectedKeys = ['href', 'rel'];

  expect(Object.keys(json.feed.link)).toEqual(expectedKeys);
});

test('handling CDATA included xml', () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://naesb.org/espi espi.xsd"><id>urn:uuid:0f30576c-a6c0-4aae-9889-91e3466d18ff</id><title><![CDATA[SDG&E Generated AMI Data File for Enertalk]]></title><author><name>Meter Data Service (MDS)</name></author></feed>`;
  const json = espiParser(xml);

  expect(json.feed.title).toBe('SDG&E Generated AMI Data File for Enertalk');
  expect(json.feed.author.name).toBe('Meter Data Service (MDS)');
});

test('collect duplicate tags in array', () => {
  const json = espiParser(fixtures.IntervalBlock);

  expect(json.entry.content.IntervalBlock.IntervalReadings).toBeInstanceOf(Array);
});

test('remove xml declare tag', () => {
  const xml = `<?xml version="1.0" encoding="UTF-8">
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://naesb.org/espi espi.xsd"><id>urn:uuid:0f30576c-a6c0-4aae-9889-91e3466d18ff</id><title>SDG&E Generated AMI Data File for Enertalk</title><author><name>Meter Data Service (MDS)</name></author></feed>`;
  const json = espiParser(xml);
  console.log(json);
  expect(typeof json.feed === 'object').toBeTruthy();
});
