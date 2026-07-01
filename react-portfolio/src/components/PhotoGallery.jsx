import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PHOTO_GRID_SIZE = 9;
const PHOTO_COLUMN_SIZE = 3;

const getVisibleImages = (images, start) => {
  return Array.from({ length: PHOTO_GRID_SIZE }, (_, index) => {
    const wrappedIndex = (start + index) % images.length;
    return images[wrappedIndex];
  });
};

const imageRatios = [
  4 / 5,
  3 / 2,
  16 / 9,
  9 / 16,
  1,
  5 / 4,
  2 / 3,
  3 / 4,
  4 / 3,
];

const PhotoGallery = ({ images = [], open, onClose }) => {
  const [active, setActive] = useState(null);
  const [currentStart, setCurrentStart] = useState(0);
  const [pageDir, setPageDir] = useState(0);

  const visibleImages = useMemo(() => getVisibleImages(images, currentStart), [images, currentStart]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setActive(null);
      setCurrentStart(0);
      setPageDir(0);
    }
  }, [open]);

  if (!open) return null;

  const handleThumbClick = (src) => {
    setActive(src);
  };

  const shiftColumn = (direction) => {
    setPageDir(direction);
    setCurrentStart((prev) => (prev + direction * PHOTO_COLUMN_SIZE + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative z-[10000] w-full max-w-6xl max-h-[90vh] glass-strong p-4 overflow-hidden"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 rounded-md hover:bg-white/10">
          <X className="w-5 h-5 text-zinc-200" />
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100">Photography Roll</h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl">
              Press the buttons to rotate the cylindrical roll one column at a time.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => shiftColumn(-1)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-100 transition hover:bg-white/10"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              type="button"
              onClick={() => shiftColumn(1)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-100 transition hover:bg-white/10"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          className="relative overflow-hidden w-full h-[68vh] rounded-[1.75rem] bg-black/20"
          style={{ perspective: 1800, transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_55%)] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStart}
              className="absolute inset-0 flex gap-0 p-2"
              initial={{ opacity: 0, x: pageDir * 220, rotateY: pageDir * 10, rotateX: -3 }}
              animate={{ opacity: 1, x: 0, rotateY: 0, rotateX: -4 }}
              exit={{ opacity: 0, x: -pageDir * 220, rotateY: -pageDir * 10, rotateX: -3 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {[0, 1, 2].map((col) => {
                const columnImages = visibleImages.slice(col * 3, col * 3 + 3);
                const isCenter = col === 1;
                const rotateY = isCenter ? 0 : col === 0 ? 24 : -24;
                const translateZ = isCenter ? 34 : 2;
                const translateY = isCenter ? -24 : 10;
                const scale = isCenter ? 1.03 : 0.95;
                const brightness = isCenter ? 1 : 0.92;

                return (
                  <motion.div
                    key={`column-${col}-${currentStart}`}
                    className="relative flex flex-col gap-1 basis-1/3 overflow-hidden"
                    animate={{ rotateY, rotateX: -7, z: translateZ, y: translateY, scale, filter: `brightness(${brightness})` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 22 }}
                    style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
                  >
                    {columnImages.map((src, rowIndex) => {
                      const shapeRatio = imageRatios[(col * 3 + rowIndex) % imageRatios.length];

                      return (
                        <motion.button
                          key={`${src}-${rowIndex}`}
                          type="button"
                          onClick={() => handleThumbClick(src)}
                          className="relative overflow-hidden rounded-xl bg-zinc-950/80 ring-1 ring-white/5"
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.985 }}
                          style={{ aspectRatio: shapeRatio, transformStyle: 'preserve-3d' }}
                        >
                          <motion.img
                            src={src}
                            alt={`photo-${col}-${rowIndex}`}
                            className="object-cover w-full h-full"
                            initial={{ opacity: 0.88 }}
                            animate={{ opacity: active === src ? 1 : 0.92 }}
                            transition={{ duration: 0.3 }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-90" />
                        </motion.button>
                      );
                    })}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />
              <div className="relative w-full max-w-4xl max-h-[80vh] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <button onClick={() => setActive(null)} className="absolute top-4 right-4 z-50 p-3 rounded-full bg-black/40 hover:bg-black/60">
                  <X className="w-5 h-5 text-white" />
                </button>
                <motion.img
                  src={active}
                  alt="active"
                  className="object-contain w-full h-full bg-black"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PhotoGallery;
