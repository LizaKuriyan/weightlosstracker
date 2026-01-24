import { useState } from "react";

export default function WeightHistory() {
  const user = JSON.parse(localStorage.getItem("user"));
  const users = JSON.parse(localStorage.getItem("users"));
  const currentUser = users.find(u => u.email === user.email);

  const [page, setPage] = useState(1);
  const perPage = 5;

  const [editId, setEditId] = useState(null);
  const [editWeight, setEditWeight] = useState("");

  const start = (page - 1) * perPage;
  const data = currentUser.weights.slice(start, start + perPage);

  const handleEditClick = (id, weight) => {
    setEditId(id);
    setEditWeight(weight);
  };

  const handleSave = (id) => {
    if (!editWeight || isNaN(editWeight)) {
      alert("Please enter a valid weight");
      return;
    }
    const userIndex = users.findIndex(u => u.email === user.email);
    const weightIndex = users[userIndex].weights.findIndex(w => w.id === id);
    users[userIndex].weights[weightIndex].weight = parseFloat(editWeight);
    localStorage.setItem("users", JSON.stringify(users));
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    const userIndex = users.findIndex(u => u.email === user.email);
    users[userIndex].weights = users[userIndex].weights.filter(w => w.id !== id);
    localStorage.setItem("users", JSON.stringify(users));
    setEditId(null);
  };

  return (
    <div className="container weight-history-container">
      <h3 style={{fontSize:"25px"}}>Weight History</h3>
      {data.map(w => (
        <div className="weight-entry" key={w.id}>
          <div className="info">
            {w.date} -{" "}
            {editId === w.id ? (
              <input
                type="number"
                value={editWeight}
                onChange={e => setEditWeight(e.target.value)}
                style={{ width: "80px" }}
              />
            ) : (
              `${w.weight} kg`
            )}{" "}
            ({w.time})
          </div>

          <div className="btn-group">
            {editId === w.id ? (
              <>
                <button onClick={() => handleSave(w.id)}>Save</button>
                <button className="delete" onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => handleEditClick(w.id, w.weight)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(w.id)}>Delete</button>
              </>
            )}
          </div>
        </div>
      ))}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
