'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedRaysProps {
  className?: string;
  rayCount?: number;
  color?: string; // hex or rgb
  secondaryColor?: string;
  speed?: number;
  opacity?: number;
}

export default function AnimatedRays({
  className,
  rayCount = 14,
  color = 'rgba(109, 31, 162, 0.45)', // BITnWIT Purple
  secondaryColor = 'rgba(255, 121, 14, 0.35)', // BITnWIT Orange / Amber
  speed = 0.0015,
  opacity = 0.85
}: AnimatedRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Ray configuration
    const rays = Array.from({ length: rayCount }, (_, i) => ({
      angle: (i / rayCount) * Math.PI * 0.8 + Math.PI * 0.1, // fan spread
      baseWidth: Math.random() * 0.08 + 0.04,
      length: Math.random() * 0.4 + 0.9,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
      isSecondary: i % 3 === 0
    }));

    let time = 0;

    const render = () => {
      time += speed;
      ctx.clearRect(0, 0, width, height);

      const originX = width * 0.5;
      const originY = -50;
      const maxRadius = Math.sqrt(width * width + height * height);

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      rays.forEach((ray) => {
        ray.phase += ray.phaseSpeed;
        const currentAngle = ray.angle + Math.sin(ray.phase * 0.5) * 0.08;
        const currentOpacity = (Math.sin(ray.phase) * 0.35 + 0.65) * opacity;

        const leftAngle = currentAngle - ray.baseWidth * 0.5;
        const rightAngle = currentAngle + ray.baseWidth * 0.5;

        const grad = ctx.createRadialGradient(
          originX,
          originY,
          0,
          originX,
          originY,
          maxRadius * ray.length
        );

        const rayColor = ray.isSecondary ? secondaryColor : color;
        grad.addColorStop(0, rayColor.replace(/[\d\.]+\)$/, `${currentOpacity})`));
        grad.addColorStop(0.3, rayColor.replace(/[\d\.]+\)$/, `${currentOpacity * 0.6})`));
        grad.addColorStop(0.7, rayColor.replace(/[\d\.]+\)$/, `${currentOpacity * 0.2})`));
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(
          originX + Math.cos(leftAngle) * maxRadius,
          originY + Math.sin(leftAngle) * maxRadius
        );
        ctx.lineTo(
          originX + Math.cos(rightAngle) * maxRadius,
          originY + Math.sin(rightAngle) * maxRadius
        );
        ctx.closePath();
        ctx.fill();
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [rayCount, color, secondaryColor, speed, opacity]);

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden select-none',
        className
      )}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-80 mix-blend-screen filter blur-[2px]"
      />
    </div>
  );
}
