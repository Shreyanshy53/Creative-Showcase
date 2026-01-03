import { useEffect, useState } from "react";
import { fetchFeed } from "../services/api";

export default function Landing() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchFeed().then(setImages);
  }, []);

  return (
    <div>
      {/* Hero Section: Pehli cheez jo user dekhega */}
      <div className="hero">
      <h1 className="hero-title">Creative Showcase</h1>

        <p>
          Discover a collection of digital memories and artwork. 
          Upload your own and join the gallery.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="masonry-grid">
        {images.map((img) => (
          <div key={img._id} className="pin-item">
            <img 
              src={img.imageUrl} 
              alt="Artwork" 
              loading="lazy" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}