import React, { useRef, useEffect } from "react";

function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Use device pixel ratio for crisp rendering
    let dpr = window.devicePixelRatio || 1;

    // set canvas CSS size and internal pixel size relative to parent (header)
    const parent = canvas.parentElement || document.body;
    const setSize = () => {
      dpr = window.devicePixelRatio || 1;
      const pw = parent.clientWidth || window.innerWidth;
      const ph = parent.clientHeight || window.innerHeight;
      canvas.style.width = pw + "px";
      canvas.style.height = ph + "px";
      canvas.width = Math.max(1, Math.floor(pw * dpr));
      canvas.height = Math.max(1, Math.floor(ph * dpr));
      // Transform so drawing coordinates are in CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();

    const particles = [];
    const backgroundParticles = []; // étoiles de fond
    const numParticles = 250; // Ajustable
    const maxDistance = 100; // Distance max pour dessiner une ligne
    const mouse = { x: null, y: null };

    // Création des particules (positions en CSS pixels)
    const initParticles = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      particles.length = 0;
      backgroundParticles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const size = Math.random() * 2 + 1;
        particles.push({ x, y, originX: x, originY: y, size });
      }
      for (let i = 0; i < 150; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const size = Math.random() * 0.5 + 0.2; // très petites
        const vx = (Math.random() - 0.5) * 0.1;
        const vy = (Math.random() - 0.5) * 0.1;
        backgroundParticles.push({ x, y, size, vx, vy });
      }
    };

    initParticles();

    const updateBackgroundStars = () => {
      const parent = canvas.parentElement || document.body;
      const w = (canvas.width / dpr) || parent.clientWidth;
      const h = (canvas.height / dpr) || parent.clientHeight;
      backgroundParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // rebondir sur les bords
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });
    };
    // Gestion de la souris attachée au parent (header)
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    // Dessiner une étoile (4 pointes)
    const drawStar = (x, y, size) => {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x + size, y);
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y + size);
      ctx.stroke();
    };

    // Dessiner toutes les particules
    const drawParticles = () => {
      backgroundParticles.forEach((p) => drawStar(p.x, p.y, p.size));
      particles.forEach((p) => drawStar(p.x, p.y, p.size));
    };

    // Dessiner les lignes entre particules proches
    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(255,255,255,${1 - distance / maxDistance})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Mettre à jour les positions vers la souris
    const updateParticles = () => {
      const attraction = 0.03; // vitesse d’attraction vers la souris
      const returnSpeed = 0.02; // vitesse de retour vers la position initiale

      particles.forEach((p) => {
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Attirer vers la souris
            p.x += dx * attraction;
            p.y += dy * attraction;
          } else {
            // Retour progressif à la position initiale
            const dxOrigin = p.originX - p.x;
            const dyOrigin = p.originY - p.y;
            p.x += dxOrigin * returnSpeed;
            p.y += dyOrigin * returnSpeed;
          }
        } else {
          // Pas de souris → revenir à la position initiale
          const dxOrigin = p.originX - p.x;
          const dyOrigin = p.originY - p.y;
          p.x += dxOrigin * returnSpeed;
          p.y += dyOrigin * returnSpeed;
        }
      });
    };

    // Animation
    const animate = () => {
      // clear using CSS-pixel dimensions
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      updateBackgroundStars();
      updateParticles();
      drawParticles();
      drawLines();
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize to keep canvas matching the parent (header)
    const handleResize = () => {
      const oldW = canvas.width / dpr;
      const oldH = canvas.height / dpr;
      setSize();
      const newW = canvas.width / dpr;
      const newH = canvas.height / dpr;
      // clamp particle positions/origins to new bounds
      particles.forEach((p) => {
        p.x = Math.min(p.x, newW);
        p.y = Math.min(p.y, newH);
        p.originX = Math.min(p.originX, newW);
        p.originY = Math.min(p.originY, newH);
      });
      backgroundParticles.forEach((p) => {
        p.x = Math.min(p.x, newW);
        p.y = Math.min(p.y, newH);
      });
    };

    // observe parent element size changes if supported
    let resizeObserver;
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(parent);
    } else {
      window.addEventListener('resize', handleResize);
    }

    // Nettoyer l'event listener / observer
    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
}

export default ParticlesBackground;