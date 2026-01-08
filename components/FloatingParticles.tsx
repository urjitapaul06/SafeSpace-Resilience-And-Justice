
import React, { useEffect, useState } from 'react';

const FloatingParticles: React.FC = () => {
  const [particles, setParticles] = useState<{ id: number; left: number; duration: number; type: string; size: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: Date.now(),
        left: Math.random() * 100,
        duration: 5 + Math.random() * 10,
        type: Math.random() > 0.5 ? '❤️' : '🍃',
        size: 15 + Math.random() * 20
      };
      setParticles(prev => [...prev.slice(-15), newParticle]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          className="falling-particle"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`
          }}
        >
          {p.type}
        </div>
      ))}
    </>
  );
};

export default FloatingParticles;
