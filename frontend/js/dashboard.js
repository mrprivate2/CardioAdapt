// HRV DOT CHART
new Chart(document.getElementById("hrvChart"), {
  type: "scatter",
  data: {
    datasets: [{
      data: Array.from({ length: 24 }, (_, i) => ({
        x: i,
        y: 60 + Math.random() * 40
      })),
      backgroundColor: "#fb923c"
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false }
    }
  }
});

// ECG WAVEFORM
new Chart(document.getElementById("ecgChart"), {
  type: "line",
  data: {
    labels: Array.from({ length: 60 }, (_, i) => i),
    datasets: [{
      data: Array.from({ length: 60 }, () => Math.random() * 25),
      borderColor: "#fb923c",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0
    }]
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false }
    }
  }
});