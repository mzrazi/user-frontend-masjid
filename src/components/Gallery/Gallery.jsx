import React, { useState, useEffect } from 'react';
import './Gallery.css';
import Navbar from '../Navbar/Navbar';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/gallery') 
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setImages(data.images);
        } else {
          console.error('Failed to fetch images:', data.message);
        }
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  return (
    <div className="gallery-container">
        <Navbar/>
      <h2 className="gallery-title">Gallery</h2>
      <div className="gallery-grid">
        {images.map((image) => (
          <div key={image._id} className="gallery-item">
            <img src={image.imagePath} alt={`Gallery item`} className="gallery-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
