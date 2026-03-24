import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="custom-navbar d-flex align-items-center">
      <h1 className="navbar-title">Weight Tracker</h1>

      <div className="ms-auto navbar-links">
        <Link className="navbar-btn" to="/add-weight">Add Weight</Link>
        <Link className="navbar-btn" to="/history">History</Link>
        <Link className="navbar-btn" to="/difference">Difference</Link>
        <button className="navbar-btn logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}