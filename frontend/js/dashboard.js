let readings = [];
let baseline = null;
let dangerHigh, dangerLow;
let emergencyTriggered = false;
let history = [];
let lastBpm = null;

const userType = localStorage.getItem("userType") || "normal";
document.getElementById("modeLabel").innerText = "Mode: " + userType;

function fetchHeartRate() {
  fetch(`http://localhost:5001/api/heartrate?mode=${userType}`)
    .then(res => res.json())
    .then(data => {
      const bpm = data.bpm;

      document.getElementById("heartRate").innerText = bpm + " BPM";
      document.getElementById("status").innerText = data.status;
      document.getElementById("riskScore").innerText = data.risk;
      document.getElementById("explanation").innerText = data.explanation;

      updateChart(bpm);
      handleBaseline(bpm);
      updateHistory(bpm);
    });
}

function handleBaseline(bpm) {
  if (baseline === null) {
    readings.push(bpm);
    document.getElementById("explanation").innerText =
      `Calibrating baseline (${readings.length}/10)`;

    if (readings.length === 10) {
      baseline = readings.reduce((a, b) => a + b) / readings.length;

      if (userType === "athlete") {
        dangerHigh = baseline + 50;
        dangerLow = baseline - 30;
      } else if (userType === "medical") {
        dangerHigh = baseline + 25;
        dangerLow = baseline - 15;
      } else {
        dangerHigh = baseline + 35;
        dangerLow = baseline - 20;
      }

      document.getElementById("explanation").innerText =
        `Baseline set at ${baseline.toFixed(1)} BPM`;
    }
    return;
  }

  if ((bpm > dangerHigh || bpm < dangerLow) && !emergencyTriggered) {
    triggerEmergency(bpm);
  }
}

function triggerEmergency(bpm) {
  emergencyTriggered = true;
  document.body.classList.add("emergency");
  document.getElementById("resetBtn").style.display = "block";

  alert(`🚨 Emergency Alert!\nAbnormal BPM detected: ${bpm}`);
}

function resetEmergency() {
  emergencyTriggered = false;
  document.body.classList.remove("emergency");
  document.getElementById("resetBtn").style.display = "none";
  document.getElementById("explanation").innerText =
    "Monitoring resumed.";
}

function updateHistory(bpm) {
  history.push(bpm);
  if (history.length > 10) history.shift();

  const avg =
    history.reduce((a, b) => a + b, 0) / history.length;

  document.getElementById("avgBpm").innerText =
    "Average BPM: " + avg.toFixed(1);

  document.getElementById("historyText").innerText =
    "Recent BPM: " + history.join(", ");
}

setInterval(fetchHeartRate, 3000);