import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/add-weight");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h3>Login</h3>

        <label htmlFor="loginEmail" className="login-label">Email:</label>
        <input
          id="loginEmail"
          type="email"
          className="login-input"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor="loginPassword" className="login-label">Password:</label>
        <input
          id="loginPassword"
          type="password"
          className="login-input"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="login-link">
          New user? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
}