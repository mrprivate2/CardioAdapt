let chart;

window.onload = () => {
  const ctx = document.getElementById("heartChart").getContext("2d");

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Heart Rate (BPM)",
        data: [],
        borderColor: "#1e88e5",
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      scales: {
        y: {
          min: 40,
          max: 200
        }
      }
    }
  });
};

function updateChart(bpm) {
  const time = new Date().toLocaleTimeString();
  chart.data.labels.push(time);
  chart.data.datasets[0].data.push(bpm);

  if (chart.data.labels.length > 10) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }

  chart.update();
}