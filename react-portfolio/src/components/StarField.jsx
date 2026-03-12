import { useRef, useEffect } from 'react';

const StarField = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animFrameId;
        let w, h, dpr;

        const resize = () => {
            dpr = window.devicePixelRatio || 1;
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
        };
        resize();
        window.addEventListener('resize', resize);

        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };
        const handleMouseLeave = () => {
            mouseRef.current.x = -9999;
            mouseRef.current.y = -9999;
        };
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        // --- STAR SYSTEM ---
        // Each star has a "home" position spread across the viewport,
        // and a "current" render position that gets attracted towards the mouse.
        const STAR_COUNT = 4000;
        const MOUSE_RADIUS = 220;     // Attraction radius
        const ATTRACTION = 0.035;     // How aggressively stars pull towards cursor
        const RETURN_SPEED = 0.02;    // How fast they drift back home
        const stars = [];

        for (let i = 0; i < STAR_COUNT; i++) {
            const homeX = Math.random() * w;
            const homeY = Math.random() * h;
            stars.push({
                homeX,
                homeY,
                x: homeX,
                y: homeY,
                size: Math.random() * 1.2 + 0.3,
                baseAlpha: Math.random() * 0.5 + 0.1, // subtle, not flashy
                twinkleSpeed: (Math.random() * 0.015) + 0.003,
                twinklePhase: Math.random() * Math.PI * 2,
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, w, h);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const mouseActive = mx > 0 && my > 0;

            for (let i = 0; i < STAR_COUNT; i++) {
                const s = stars[i];

                // Twinkle
                s.twinklePhase += s.twinkleSpeed;
                const twinkle = (Math.sin(s.twinklePhase) + 1) * 0.5; // 0..1

                if (mouseActive) {
                    const dx = mx - s.homeX;
                    const dy = my - s.homeY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < MOUSE_RADIUS) {
                        // Normalized influence: 1 at center, 0 at edge
                        const influence = 1 - (dist / MOUSE_RADIUS);
                        // Attract towards mouse — stronger pull when closer
                        const pullStrength = influence * influence; // quadratic falloff
                        const targetX = s.homeX + dx * pullStrength * 0.6;
                        const targetY = s.homeY + dy * pullStrength * 0.6;
                        s.x += (targetX - s.x) * ATTRACTION * 3;
                        s.y += (targetY - s.y) * ATTRACTION * 3;
                    } else {
                        // Return home smoothly
                        s.x += (s.homeX - s.x) * RETURN_SPEED;
                        s.y += (s.homeY - s.y) * RETURN_SPEED;
                    }
                } else {
                    s.x += (s.homeX - s.x) * RETURN_SPEED;
                    s.y += (s.homeY - s.y) * RETURN_SPEED;
                }

                // Compute render alpha: brighter when clustered near mouse
                let alpha = s.baseAlpha * (0.4 + twinkle * 0.6);
                let size = s.size;

                if (mouseActive) {
                    const rdx = mx - s.x;
                    const rdy = my - s.y;
                    const renderDist = Math.sqrt(rdx * rdx + rdy * rdy);
                    if (renderDist < MOUSE_RADIUS) {
                        const proximity = 1 - (renderDist / MOUSE_RADIUS);
                        alpha = Math.min(1, alpha + proximity * 0.7);
                        size = s.size + proximity * 1.2;
                    }
                }

                // Draw — monochrome white/light-blue for professionalism
                ctx.beginPath();
                ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 220, 240, ${alpha})`;
                ctx.fill();
            }

            // Subtle soft glow at cursor position
            if (mouseActive) {
                const grad = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS * 0.6);
                grad.addColorStop(0, 'rgba(200, 220, 240, 0.06)');
                grad.addColorStop(1, 'rgba(200, 220, 240, 0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(mx, my, MOUSE_RADIUS * 0.6, 0, Math.PI * 2);
                ctx.fill();
            }

            animFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animFrameId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
};

export default StarField;
