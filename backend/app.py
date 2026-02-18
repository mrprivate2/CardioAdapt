from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route("/api/heartrate", methods=["GET"])
def heartrate():
    mode = request.args.get("mode", "normal")
    bpm = random.randint(60, 160)

    risk = 0
    status = "Normal"
    explanation = ""

    if mode == "athlete":
        if bpm > 150:
            risk, status = 70, "High Risk"
            explanation = "Heart rate unusually high for athlete baseline."
        else:
            risk, explanation = 20, "Normal for athlete."

    elif mode == "medical":
        if bpm > 120:
            risk, status = 85, "Critical"
            explanation = "Potential cardiac risk detected."
        else:
            risk, explanation = 40, "Stable but monitoring advised."

    else:
        if bpm > 140:
            risk, status = 65, "Warning"
            explanation = "Above normal resting heart rate."
        else:
            risk, explanation = 30, "Normal resting range."

    return jsonify({
        "bpm": bpm,
        "risk": risk,
        "status": status,
        "explanation": explanation
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)