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
<ns3:entry xmlns:espi="http://naesb.org/espi" xmlns:ns3="http://www.w3.org/2005/Atom">
  <ns3:id>urn:uuid:e0383570-16b1-4ab9-8642-fdb7e89660db</ns3:id>
  <ns3:link href="https://services.greenbuttondata.org/DataCustodian/espi/1_1/resource/Subscription/1/UsagePoint/1/MeterReading/1/IntervalBlock" rel="up"/>
  <ns3:link href="https://services.greenbuttondata.org/DataCustodian/espi/1_1/resource/Subscription/1/UsagePoint/1/MeterReading/1/IntervalBlock/1" rel="self"/>
  <ns3:title><![CDATA[Generated AMI Data File for Enertalk]]></ns3:title>
  <ns3:content>
    <espi:IntervalBlock>
      <espi:interval>
        <espi:duration>2678400</espi:duration>
        <espi:start>1357016400</espi:start>
      </espi:interval>
      <espi:IntervalReading>
        <espi:cost>256347</espi:cost>
        <espi:timePeriod>
          <espi:duration>86400</espi:duration>
          <espi:start>1357016400</espi:start>
        </espi:timePeriod>
        <espi:value>21021</espi:value>
      </espi:IntervalReading>
      <espi:IntervalReading>
        <espi:cost>256347</espi:cost>
        <espi:timePeriod>
          <espi:duration>86400</espi:duration>
          <espi:start>1357102800</espi:start>
        </espi:timePeriod>
        <espi:value>21021</espi:value>
      </espi:IntervalReading>
      <espi:IntervalReading>
        <espi:cost>256347</espi:cost>
        <espi:timePeriod>
          <espi:duration>86400</espi:duration>
          <espi:start>1357189200</espi:start>
        </espi:timePeriod>
        <espi:value>21021</espi:value>
      </espi:IntervalReading>
    </espi:IntervalBlock>
  </ns3:content>
  <ns3:published>2013-02-01T05:00:00Z</ns3:published>
  <ns3:updated>2013-02-01T05:00:00Z</ns3:updated>
</ns3:entry>

`;

const json = espiParser(exampleXml);

console.log(util.inspect(json, { depth: Infinity }));
```

It will be print:
```js
{
  entry: {
    id: 'urn:uuid:e0383570-16b1-4ab9-8642-fdb7e89660db',
    links: [
      {
        href: 'https://services.greenbuttondata.org/DataCustodian/espi/1_1/resource/Subscription/1/UsagePoint/1/MeterReading/1/IntervalBlock',
        rel: 'up'
      },
      {
        href: 'https://services.greenbuttondata.org/DataCustodian/espi/1_1/resource/Subscription/1/UsagePoint/1/MeterReading/1/IntervalBlock/1',
        rel: 'self'
      }
    ],
    title: 'Generated AMI Data File for Enertalk',
    content: {
      IntervalBlock: {
        interval: {
          duration: '2678400',
          start: '1357016400'
        },
        IntervalReadings:
        [
          {
            cost: '256347',
            timePeriod: {
              duration: '86400',
              start: '1357016400'
            },
            value: '21021'
          },
          {
            cost: '256347',
            timePeriod: {
              duration: '86400',
              start: '1357102800'
            },
            value: '21021'
          },
          {
            cost: '256347',
            timePeriod: {
              duration: '86400',
              start: '1357189200'
            },
            value: '21021'
          }
        ]
      }
    },
    published: '2013-02-01T05:00:00Z',
    updated: '2013-02-01T05:00:00Z'
  }
}
```
