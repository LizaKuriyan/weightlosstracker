import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2>Weight Tracker</h2>
      <div className="nav-links">
        <Link to="/add-weight">Add Weight</Link>
        <Link to="/history">History</Link>
        <Link to="/difference">Difference</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
