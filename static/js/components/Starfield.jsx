import { useEffect, useRef } from "react";

export default function Starfield({ density = 1, shootingStars = true }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let raf;

        let w = (canvas.width = window.innerWidth * window.devicePixelRatio);
        let h = (canvas.height = window.innerHeight * window.devicePixelRatio);
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";

        const starCount = Math.floor((w * h) / 9000) * density;
        const stars = Array.from({ length: starCount }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.4 * window.devicePixelRatio + 0.2,
            a: Math.random() * 0.7 + 0.2,
            twinkle: Math.random() * 0.02,
            phase: Math.random() * Math.PI * 2,
        }));

        const shooters = [];

        const handleResize = () => {
            w = canvas.width = window.innerWidth * window.devicePixelRatio;
            h = canvas.height = window.innerHeight * window.devicePixelRatio;
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = window.innerHeight + "px";
        };
        window.addEventListener("resize", handleResize);

        const draw = () => {
            ctx.clearRect(0, 0, w, h);

            // Stars
            for (const s of stars) {
                s.phase += s.twinkle;
                const a = s.a + Math.sin(s.phase) * 0.25;
                ctx.beginPath();
                ctx.fillStyle = `rgba(220,235,255,${Math.max(0.05, a)})`;
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            }

            // Shooting stars
            if (shootingStars && Math.random() < 0.004 && shooters.length < 2) {
                shooters.push({
                    x: Math.random() * w * 0.7,
                    y: Math.random() * h * 0.5,
                    vx: 6 * window.devicePixelRatio + Math.random() * 4,
                    vy: 2 * window.devicePixelRatio + Math.random() * 2,
                    life: 1,
                });
            }

            for (let i = shooters.length - 1; i >= 0; i--) {
                const sh = shooters[i];
                const tailLen = 70 * window.devicePixelRatio;
                const grad = ctx.createLinearGradient(
                    sh.x,
                    sh.y,
                    sh.x - sh.vx * 10,
                    sh.y - sh.vy * 10,
                );
                grad.addColorStop(0, `rgba(255,255,255,${sh.life})`);
                grad.addColorStop(1, "rgba(255,255,255,0)");
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.4 * window.devicePixelRatio;
                ctx.beginPath();
                ctx.moveTo(sh.x, sh.y);
                ctx.lineTo(sh.x - sh.vx * 10, sh.y - sh.vy * 10);
                ctx.stroke();

                sh.x += sh.vx;
                sh.y += sh.vy;
                sh.life -= 0.012;
                if (sh.life <= 0 || sh.x > w + tailLen) shooters.splice(i, 1);
            }

            raf = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", handleResize);
        };
    }, [density, shootingStars]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
            data-testid="starfield-canvas"
        />
    );
}
