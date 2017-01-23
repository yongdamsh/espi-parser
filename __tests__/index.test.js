const fs = require('fs');
const path = require('path');
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
