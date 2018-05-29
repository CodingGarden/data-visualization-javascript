const url = 'https://api.coindesk.com/v1/bpi/currentprice/USD.json';

const ctx = document.getElementById('chart').getContext('2d');

const labels = [];
const data = [];

var lineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels,
    datasets: [{
      label: "Realtime Bitcoin Price",
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data,
      fill: false,
    }]
  },
  options: {}
});

getLatestPrice();

async function getLatestPrice() {
  const response = await fetch(url);
  const result = await response.json();
  const price = result.bpi.USD.rate_float;
  const time = result.time.updatedISO;
  showLatestPrice(price, time);
  setTimeout(getLatestPrice, 1000);
}

function showLatestPrice(price, time) {
  const dateTime = new Date(time);
  labels.push(dateTime.toTimeString());
  data.push({
    x: dateTime,
    y: price
  });
  lineChart.update();
}