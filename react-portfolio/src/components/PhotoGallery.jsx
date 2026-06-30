import { useState, useRef } from 'react';
import { X } from 'lucide-react';

const PhotoGallery = ({ images = [], open, onClose }) => {
  const [active, setActive] = useState(null);
  const hoverTimer = useRef(null);

  if (!open) return null;

  const handleThumbClick = (src) => {
    setActive(src);
  };

  const handleThumbEnter = (src) => {
    // start a 2s timer to open the single view
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setActive(src), 2000);
  };

  const handleThumbLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-70 w-[90vw] max-w-5xl max-h-[80vh] glass-strong p-4 overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 z-80 p-2 rounded-md hover:bg-white/5">
          <X className="w-5 h-5 text-zinc-200" />
        </button>

        {/* Grid container with scroll */}
        <div className="overflow-y-auto max-h-[70vh] py-6 px-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center justify-center" style={{ perspective: '1000px' }}>
            {images.map((src, idx) => {
              const offset = (idx % 4) - 1.5; // -1.5 .. 1.5
              const rot = offset * 8; // rotate for curved/cylindrical feel
              const tz = Math.abs(offset) * -8; // slight translateZ
              return (
                <div
                  key={idx}
                  onClick={() => handleThumbClick(src)}
                  onMouseEnter={() => handleThumbEnter(src)}
                  onMouseLeave={handleThumbLeave}
                  className="relative w-full h-36 sm:h-40 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                  style={{ transform: `rotateY(${rot}deg) translateZ(${tz}px)` }}
                >
                  <img src={src} alt={`photo-${idx}`} className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-0 transition-opacity" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Single enlarged view */}
        {active && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="relative w-full max-w-3xl max-h-[80vh]">
              <button onClick={() => setActive(null)} className="absolute top-2 right-2 p-2 rounded-md z-50 hover:bg-white/5">
                <X className="w-5 h-5 text-zinc-100" />
              </button>
              <div className="w-full h-full flex items-center justify-center">
                <img src={active} alt="active" className="object-contain max-h-[78vh] max-w-full rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
