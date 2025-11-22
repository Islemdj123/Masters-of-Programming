import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(50, Math.max(20, Math.floor(window.innerWidth / 30)));

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      // Clear canvas with semi-transparent background
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Wrap around
        particle.x = (particle.x + canvas.width) % canvas.width;
        particle.y = (particle.y + canvas.height) % canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${particle.opacity})`;
        ctx.fill();

        // Draw connections between nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${(particle.opacity * other.opacity) * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-background/70 via-background/40 to-background pointer-events-none" />
    </>
  );
}
