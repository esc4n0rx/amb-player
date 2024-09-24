import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Video1 from './madagascar3.mp4';  
import Video2 from './vingadores.mp4';  
import Video3 from './patagonia.mp4';  

const AmbilightPlayer = () => {
  const videoRef = useRef(null);
  const [ambilightColor, setAmbilightColor] = useState('#000'); 
  const [selectedVideo, setSelectedVideo] = useState(null); 
  const [showModal, setShowModal] = useState(true); 

  useEffect(() => {
    if (!selectedVideo) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 64;
    canvas.height = 36;

    const getDominantColor = () => {
      if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;

        let r = 0, g = 0, b = 0, count = 0;

        for (let i = 0; i < imageData.length; i += 4) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
          count++;
        }

        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);

        setAmbilightColor(`rgb(${r},${g},${b})`);
      }
    };

    const interval = setInterval(getDominantColor, 100);

    return () => clearInterval(interval);
  }, [selectedVideo]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video); 
    setShowModal(false); 
  };

  return (
    <div className="ambilight-container" style={{ backgroundColor: ambilightColor }}>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Escolha um vídeo</h2>
            <button onClick={() => handleVideoSelect(Video1)}>Madagascar 3</button>
            <button onClick={() => handleVideoSelect(Video2)}>Vingadores Ultimato</button>
            <button onClick={() => handleVideoSelect(Video3)}>Patagonia</button>
          </div>
        </div>
      )}
      
      {selectedVideo && (
        <div className="player-card">
          <video ref={videoRef} controls autoPlay loop className="video-player">
            <source src={selectedVideo} type="video/mp4" />
            Seu navegador não suporta a tag de vídeo.
          </video>
        </div>
      )}
    </div>
  );
};

export default AmbilightPlayer;
