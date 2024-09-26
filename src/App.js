import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Video1 from './vids/madagascar3.mp4';
import Video2 from './vids/vingadores.mp4';
import Video3 from './vids/patagonia.mp4';
import Video4 from './vids/america.mp4';

const AmbilightPlayer = () => {
  const videoRef = useRef(null);
  const [ambilightColors, setAmbilightColors] = useState({
    topColor: '#000',
    bottomColor: '#000',
    leftColor: '#000',
    rightColor: '#000',
  });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (!selectedVideo) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 18;

    let animationFrameId;

    const averageColor = (data) => {
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
      return `rgb(${Math.floor(r / count)}, ${Math.floor(g / count)}, ${Math.floor(b / count)})`;
    };

    const getEdgeColors = () => {
      if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const topData = context.getImageData(0, 0, canvas.width, 1).data;
        const bottomData = context.getImageData(0, canvas.height - 1, canvas.width, 1).data;
        const leftData = context.getImageData(0, 0, 1, canvas.height).data;
        const rightData = context.getImageData(canvas.width - 1, 0, 1, canvas.height).data;

        const topColor = averageColor(topData);
        const bottomColor = averageColor(bottomData);
        const leftColor = averageColor(leftData);
        const rightColor = averageColor(rightData);

        setAmbilightColors({ topColor, bottomColor, leftColor, rightColor });
      }
    };

    const updateAmbilight = () => {
      getEdgeColors();
      animationFrameId = requestAnimationFrame(updateAmbilight);
    };

    updateAmbilight();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
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
    <div
      className="ambilight-container"
      style={{
        background: `
          radial-gradient(circle at top left, ${ambilightColors.topColor}, transparent),
          radial-gradient(circle at top right, ${ambilightColors.rightColor}, transparent),
          radial-gradient(circle at bottom left, ${ambilightColors.leftColor}, transparent),
          radial-gradient(circle at bottom right, ${ambilightColors.bottomColor}, transparent)
        `,
      }}
    >
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Escolha um vídeo ou insira o link direto do vídeo (como um arquivo .mp4)</h2>

            <button onClick={() => handleVideoSelect(Video1)}>Madagascar 3</button>
            <button onClick={() => handleVideoSelect(Video2)}>Vingadores Ultimato</button>
            <button onClick={() => handleVideoSelect(Video3)}>Patagonia</button>
            <button onClick={() => handleVideoSelect(Video4)}>Capitão América</button>

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
