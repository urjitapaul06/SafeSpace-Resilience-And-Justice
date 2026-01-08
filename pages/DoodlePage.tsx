
import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Paintbrush, Download, Trash2, Info } from 'lucide-react';

const DoodlePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#4f46e5');
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 400;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const downloadDrawing = () => {
    const link = document.createElement('a');
    link.download = 'safe-space-sketch.png';
    link.href = canvasRef.current?.toDataURL() || '';
    link.click();
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">Doodle & Identification</h2>
        <p className="text-gray-500">Draw for peace or to identify characteristics of suspects.</p>
      </header>

      <div className="bg-white dark:bg-indigo-900/50 p-4 rounded-3xl shadow-xl border dark:border-indigo-800">
        <div className="flex flex-wrap gap-4 mb-4 justify-between items-center p-2 bg-gray-50 dark:bg-indigo-950 rounded-2xl">
          <div className="flex gap-2 items-center">
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 border-none rounded-lg cursor-pointer" />
            <div className="flex gap-1">
              {[5, 10, 15].map(s => (
                <button 
                  key={s} 
                  onClick={() => setBrushSize(s)}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all ${brushSize === s ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setColor('#ffffff')} className="p-2 bg-white dark:bg-indigo-900 border rounded-xl hover:bg-gray-100 dark:hover:bg-indigo-800"><Eraser size={20} /></button>
            <button onClick={clearCanvas} className="p-2 bg-white dark:bg-indigo-900 border rounded-xl hover:bg-red-50 text-red-500"><Trash2 size={20} /></button>
            <button onClick={downloadDrawing} className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-md"><Download size={20} /></button>
          </div>
        </div>

        <div className="relative touch-none">
          <canvas 
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="w-full bg-white rounded-2xl border dark:border-indigo-700 cursor-crosshair shadow-inner"
          />
        </div>
      </div>

      <div className="p-6 bg-indigo-50 dark:bg-indigo-950/50 rounded-3xl border border-indigo-100 dark:border-indigo-800 flex gap-4">
        <Info className="text-indigo-500 shrink-0" size={24} />
        <div className="text-xs space-y-2">
          <p className="font-bold text-indigo-700 dark:text-indigo-400 uppercase">Identification Guide</p>
          <p className="text-gray-600 dark:text-gray-400">Try to sketch distinguishing marks like tattoos, scars, or facial structures. You can save these sketches to share with the police during identification parades.</p>
        </div>
      </div>
    </div>
  );
};

export default DoodlePage;
