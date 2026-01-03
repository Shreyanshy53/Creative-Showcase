import { useState } from "react";
import { signup } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      // Optional: Success message dikha sakte hain
      alert("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed. Try a different username/email.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Join the Showcase</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', marginTop: '-1rem' }}>
          Create an account to start sharing your art.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            name="username"
            placeholder="Choose a Username"
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            name="password"
            type="password"
            placeholder="Create Password"
            onChange={handleChange}
            required
          />

          <button className="auth-btn" type="submit">
            Sign Up
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? 
          <Link to="/login" className="auth-link">Log In</Link>
        </p>
      </div>
    </div>
  );
}