import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Signup.css"; // ✅ import css

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(u => u.email === email);
    if (userExists) {
      alert("User with this email already exists");
      return;
    }

    users.push({
      email,
      password,
      weights: []
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h3>Signup</h3>

        <label className="signup-label">Email:</label>
        <input
          type="email"
          className="signup-input"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label className="signup-label">Password:</label>
        <input
          type="password"
          className="signup-input"
          placeholder="Minimum 8 characters"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <label className="signup-label">Confirm Password:</label>
        <input
          type="password"
          className="signup-input"
          placeholder="Re-enter password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />

        <button className="signup-btn" onClick={handleSignup}>
          Signup
        </button>

        <div className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}