import { useState } from "react";
import "../styles/WeightDifference.css";

export default function WeightDifference() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const users = JSON.parse(localStorage.getItem("users"));
  const currentUser = users.find(u => u.email === user.email);

  const calculate = () => {
    setError("");
    setResult(null);

    if (!start || !end) {
      setError("Please select both dates");
      return;
    }

    const s = currentUser.weights.find(w => w.date === start);
    const e = currentUser.weights.find(w => w.date === end);

    if (!s || !e) {
      setError("No weight data found for selected dates");
      return;
    }

    const diff = parseFloat(s.weight) - parseFloat(e.weight);
    setResult(diff.toFixed(2));
  };

  return (
    <div className="diff-wrapper">
      <div className="diff-card">
        <h3 className="diff-title">Find Weight Difference</h3>

        <input
          type="date"
          className="diff-input"
          value={start}
          onChange={e => setStart(e.target.value)}
        />

        <input
          type="date"
          className="diff-input"
          value={end}
          onChange={e => setEnd(e.target.value)}
        />

        <button className="diff-btn" onClick={calculate}>
          Calculate
        </button>

        {error && <p className="diff-error">{error}</p>}

        {result !== null && (
          <div className="diff-result">
            Weight Difference: {result} kg
          </div>
        )}
      </div>
    </div>
  );
}