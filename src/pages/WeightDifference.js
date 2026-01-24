import { useState } from "react";

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

    const diff = s.weight - e.weight;
    setResult(diff);
  };

  return (
    <div className="container">
      <h3 style={{fontSize:"25px"}}>Find Weight Difference</h3>

      <input
        type="date"
        value={start}
        onChange={e => setStart(e.target.value)}
      />

      <input
        type="date"
        value={end}
        onChange={e => setEnd(e.target.value)}
      />

      <button onClick={calculate}>Calculate</button>

      {error && <p className="error">{error}</p>}

      {result !== null && (
        <p className="result">
          Weight Difference: <strong>{result} kg</strong>
        </p>
      )}
    </div>
  );
}
