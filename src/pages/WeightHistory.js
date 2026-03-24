import { useState } from "react";
import "../styles/WeightHistory.css";

export default function WeightHistory() {
  const user = JSON.parse(localStorage.getItem("user"));
  const users = JSON.parse(localStorage.getItem("users"));
  const currentUser = users.find(u => u.email === user.email);

  const [page, setPage] = useState(1);
  const perPage = 5;

  const [editId, setEditId] = useState(null);
  const [editWeight, setEditWeight] = useState("");

  const reversedWeights = [...currentUser.weights].reverse();

  const start = (page - 1) * perPage;
  const data = reversedWeights.slice(start, start + perPage);

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
  };

  return (
    <div className="history-wrapper">
      <div className="history-card">
        <h3 className="history-title">Weight History</h3>

        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Weight</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map(w => (
              <tr key={w.id}>
                <td>{w.date}</td>

                <td>
                  {editId === w.id ? (
                    <input
                      type="number"
                      className="history-input"
                      value={editWeight}
                      onChange={e => setEditWeight(e.target.value)}
                    />
                  ) : (
                    `${w.weight} kg`
                  )}
                </td>

                <td>{w.time}</td>

                <td>
                  <div className="btn-group">
                    {editId === w.id ? (
                      <>
                        <button className="btn btn-save" onClick={() => handleSave(w.id)}>Save</button>
                        <button className="btn btn-cancel" onClick={() => setEditId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-edit" onClick={() => handleEditClick(w.id, w.weight)}>Edit</button>
                        <button className="btn btn-delete" onClick={() => handleDelete(w.id)}>Delete</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="page-btn"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <button
            className="page-btn"
            disabled={start + perPage >= reversedWeights.length} 
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}