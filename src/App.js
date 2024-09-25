import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Video1 from './vids/madagascar3.mp4';
import Video2 from './vids/vingadores.mp4';
import Video3 from './vids/patagonia.mp4';
import Video4 from './vids/america.mp4';

const AmbilightPlayer = () => {
  const videoRef = useRef(null);
  const [ambilightColor, setAmbilightColor] = useState('#000'); 
  const [selectedVideo, setSelectedVideo] = useState(null); 
  const [showModal, setShowModal] = useState(true); 
  const [videoUrl, setVideoUrl] = useState('');  

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

        console.log(imageData);

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

        console.log(`rgb(${r},${g},${b})`);

        setAmbilightColor(`rgb(${r},${g},${b})`);
      }
    };

    const interval = setInterval(getDominantColor, 100);
    return () => clearInterval(interval);
  }, [selectedVideo]);

  const handleVideoSelect = (videoPath) => {
    setSelectedVideo(videoPath); 
    setShowModal(false); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoUrl) {
      setSelectedVideo(videoUrl); 
      setShowModal(false);
    }
  };

  return (
    <div className="ambilight-container" style={{ backgroundColor: ambilightColor }}>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Escolha um vídeo ou insira o link direto do vídeo (como um arquivo .mp4)</h2>
            {/* Lista de vídeos locais */}
            <button onClick={() => handleVideoSelect(Video1)}>Madagascar 3</button>
            <button onClick={() => handleVideoSelect(Video2)}>Vingadores Ultimato</button>
            <button onClick={() => handleVideoSelect(Video3)}>Patagonia</button>
            <button onClick={() => handleVideoSelect(Video4)}>America</button>
            
            {/* Campo para link direto do vídeo */}
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Insira o link direto (mp4)" 
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <button type="submit">Reproduzir</button>
            </form>
          </div>
        </div>
      )}
      
      {selectedVideo && (
        <div className="player-card">
          {/* Reproduz o vídeo usando <video> HTML5 */}
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
