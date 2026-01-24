import { useState } from "react";

export default function AddWeight() {
  const [weight, setWeight] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const users = JSON.parse(localStorage.getItem("users"));
  const currentUser = users.find(u => u.email === user.email);

  const addWeight = () => {
    const today = new Date().toISOString().split("T")[0];

    if (currentUser.weights.find(w => w.date === today)) {
      alert("You already added today's weight");
      return;
    }

    currentUser.weights.push({
      id: Date.now(),
      weight,
      date: today,
      time: new Date().toLocaleTimeString()
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Weight added successfully");
    setWeight("");
  };

  return (
    <div className="container add-weight-container">
      <h3 style={{fontSize:"25px"}}>Add Today’s Weight</h3>
      <input classname="container.add-weight-container input"
        placeholder="Enter weight (kg)"
        value={weight}
        onChange={e => setWeight(e.target.value)}
      />
      <button classname="container.add-weight-container button" onClick={addWeight}>Add Weight</button>
    </div>
  );
}
