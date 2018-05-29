// http://c3js.org/samples/timeseries.html

const url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-05-01&end=2018-05-28';

// fetch(url)
//   .then(response => response.json())
//   .then(result => {
//     const prices = Object.values(result.bpi);
//     chartData(['USD', ...prices]);
//   });

getData();

async function getData() {
  const response = await fetch(url);
  const result = await response.json();
  console.log(result.bpi);
  const prices = Object.values(result.bpi);
  const dates = Object.keys(result.bpi);
  chartData(['USD', ...prices], ['x', ...dates]);
}

function chartData(prices, dates) {
  var chart = c3.generate({
    bindto: '#chart',
    data: {
      x: 'x',
      columns: [
        dates,
        prices
      ]
    },
    axis: {
      x: {
        label: 'Date',
        type: 'timeseries',
        tick: {
          format: '%Y-%m-%d',
          fit: true
        }
      },
      y: {
        label: 'USD',
        tick: {
          // http://c3js.org/reference.html#axis-y-tick-format
          format: d3.format('$,')
        }
      }
    }
  });
}