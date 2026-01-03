import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Token delete karo
    localStorage.removeItem("username");
    navigate("/login"); // Login page pe bhejo
    window.location.reload(); // Page refresh karo taaki navbar update ho
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Showcase.
      </Link>

      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>

        {/* Agar Token nahi hai (User Logged Out hai) */}
        {!token ? (
          <>
            <Link to="/login" className="nav-item">Login</Link>
            <Link to="/signup" className="nav-btn">Sign Up</Link>
          </>
        ) : (
          /* Agar Token hai (User Logged In hai) */
          <>
            <Link to="/dashboard" className="nav-item">Dashboard</Link>
            <button 
              onClick={handleLogout} 
              className="nav-btn-outline" 
              style={{ cursor: "pointer", background: "transparent" }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}