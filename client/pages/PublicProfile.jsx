import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../services/api";

export default function PublicProfile() {
  const { username } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (username) {
      getProfile(username).then(setData);
    }
  }, [username]);
  

  if (!data) {
    return <div className="loading-screen">Curating Gallery...</div>;
  }

  return (
    <div>
      {/* Profile Header Section */}
      <div className="profile-header">
        {/* Username ka First Letter as Avatar */}
        <div className="profile-avatar-placeholder">
        {data?.username?.charAt(0)?.toUpperCase()}

        </div>
        
        <h1 className="artist-name">@{data.username}</h1>
        <p className="artist-label">Artist Portfolio</p>
      </div>

      {/* Gallery Section */}
      {data.images.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-secondary)" }}>
          <h3>No artwork showcased yet.</h3>
        </div>
      ) : (
        <div className="masonry-grid">
          {data.images.map((img) => (
            <div key={img._id} className="pin-item">
              <img 
                src={img.imageUrl} 
                alt={`${data.username}'s art`} 
                loading="lazy" 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}