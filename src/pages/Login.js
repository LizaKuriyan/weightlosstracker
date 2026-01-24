import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
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
 <div className="login-container">
  <h2>Login</h2>
  <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
  <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
  <button onClick={handleLogin}>Login</button>

  <div className="link">
    New user? <Link to="/signup">Signup</Link>
  </div>
</div>

  );
}
