import { useState } from "react";
import "../styles/AddWeight.css";

export default function AddWeight() {
  const [weight, setWeight] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const users = JSON.parse(localStorage.getItem("users"));
  const currentUser = users.find(u => u.email === user.email);

  const addWeight = () => {
    if (!weight || isNaN(weight)) {
      alert("Please enter a valid weight");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (currentUser.weights.find(w => w.date === today)) {
      alert("You already added today's weight");
      return;
    }

    currentUser.weights.push({
      id: Date.now(),
      weight: parseFloat(weight),
      date: today,
      time: new Date().toLocaleTimeString()
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Weight added successfully");
    setWeight("");
  };

  return (
    <div className="add-weight-wrapper">
      <div className="add-weight-card">
        <h2>Add Today’s Weight</h2>

        <input
          type="number"
          className="add-weight-input"
          placeholder="Enter weight (kg)"
          value={weight}
          onChange={e => setWeight(e.target.value)}
        />

        <button className="add-weight-btn" onClick={addWeight}>
          Add Weight
        </button>
      </div>
    </div>
  );
}