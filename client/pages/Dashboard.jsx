import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage, getMyImages } from "../services/api";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ SAFE USER PARSING (NO CRASH)
  let user = null;
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined") {
    try {
      user = JSON.parse(storedUser);
    } catch (err) {
      console.error("Invalid user JSON", err);
    }
  }

  // ✅ AUTH PROTECTION
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const data = await getMyImages(token);
      setImages(data || []);
    } catch (err) {
      console.error("Failed to load images", err);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await uploadImage(file, token);
      setFile(null);
      await loadImages();
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      
      {/* Header */}
      <div className="dashboard-header">
        <h1>Your Dashboard</h1>

        {user && (
          <a
            href={`/profile/${user.username}`}
            target="_blank"
            rel="noreferrer"
            className="profile-link"
          >
            View Public Profile ↗
          </a>
        )}
      </div>

      {/* Upload Section */}
      <div className="upload-container">
        <label className="upload-label">
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="upload-icon">☁️</div>
          <h3>Click to select an artwork</h3>
          <p style={{ color: "#aaa", fontSize: "0.9rem" }}>
            JPG, PNG supported
          </p>
        </label>

        {file && (
          <>
            <div className="file-name">Selected: {file.name}</div>

            <button
              className="action-btn"
              onClick={handleUpload}
              disabled={uploading}
              style={{ marginTop: "1rem" }}
            >
              {uploading ? "Uploading..." : "Upload Artwork"}
            </button>
          </>
        )}
      </div>

      {/* Gallery */}
      <h2
        style={{
          marginBottom: "1.5rem",
          borderBottom: "1px solid #333",
          paddingBottom: "10px",
        }}
      >
        Your Collection
      </h2>

      {images.length === 0 ? (
        <p style={{ textAlign: "center", color: "#aaa" }}>
          No images yet. Upload your first masterpiece!
        </p>
      ) : (
        <div className="masonry-grid">
          {images.map((img) => (
            <div key={img._id} className="pin-item">
              <img src={img.imageUrl} alt="My Upload" loading="lazy" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
