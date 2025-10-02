import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Code symbols and snippets
    const codeSymbols = [
      '{ }', '< >', '( )', '[ ]', '/>', '::',
      'const', 'let', 'function', 'class', 'import',
      'useState', 'useEffect', 'render', 'async',
      '=> {}', 'return', 'new', 'this', 'props',
      '0x', '0b', 'null', 'void', 'async',
      '&&', '||', '===', '!==', '...', 
      'Unity', 'React', 'CSS', 'HTML', 'JS',
      'UI', 'UX', 'API', 'SQL', 'PHP'
    ];

    // Matrix-style code rain
    class CodeRain {
      x: number;
      y: number;
      speed: number;
      symbols: string[];
      length: number;
      hue: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.speed = Math.random() * 2 + 1;
        this.symbols = [];
        this.length = Math.floor(Math.random() * 15) + 5;
        this.hue = Math.random() * 60 + 260;
        
        for (let i = 0; i < this.length; i++) {
          this.symbols.push(codeSymbols[Math.floor(Math.random() * codeSymbols.length)]);
        }
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height + 100) {
          this.y = -100;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.font = '12px "Courier New", monospace';
        
        this.symbols.forEach((symbol, index) => {
          const opacity = (1 - index / this.length) * 0.4;
          ctx.fillStyle = `hsla(${this.hue}, 70%, 50%, ${opacity})`;
          ctx.fillText(symbol, this.x, this.y - index * 20);
        });
      }
    }

    // Floating code blocks
    class CodeBlock {
      x: number;
      y: number;
      text: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      hue: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.text = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.hue = Math.random() * 60 + 260;
        this.size = Math.random() * 8 + 10;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x > canvas.width + 50) this.x = -50;
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.y > canvas.height + 50) this.y = -50;
        if (this.y < -50) this.y = canvas.height + 50;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = `${this.size}px "Courier New", monospace`;
        ctx.fillStyle = `hsla(${this.hue}, 70%, 50%, 0.3)`;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
      }
    }

    // Binary streams
    class BinaryStream {
      x: number;
      y: number;
      speed: number;
      binary: string;
      hue: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 0.5 + 0.3;
        this.binary = Math.random() > 0.5 ? '1' : '0';
        this.hue = Math.random() * 60 + 260;
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = 0;
          this.x = Math.random() * canvas.width;
          this.binary = Math.random() > 0.5 ? '1' : '0';
        }
      }

      draw() {
        if (!ctx) return;
        ctx.font = '10px "Courier New", monospace';
        ctx.fillStyle = `hsla(${this.hue}, 70%, 50%, 0.2)`;
        ctx.fillText(this.binary, this.x, this.y);
      }
    }

    // Create elements
    const codeRains: CodeRain[] = [];
    const codeBlocks: CodeBlock[] = [];
    const binaryStreams: BinaryStream[] = [];
    
    for (let i = 0; i < 8; i++) {
      codeRains.push(new CodeRain());
    }
    
    for (let i = 0; i < 30; i++) {
      codeBlocks.push(new CodeBlock());
    }

    for (let i = 0; i < 50; i++) {
      binaryStreams.push(new BinaryStream());
    }

    // Grid lines
    const drawGrid = () => {
      if (!ctx) return;
      ctx.strokeStyle = 'hsla(263, 70%, 50%, 0.03)';
      ctx.lineWidth = 1;

      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.fillStyle = 'hsl(240, 10%, 3.9%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();

      // Draw binary streams first (background layer)
      binaryStreams.forEach(stream => {
        stream.update();
        stream.draw();
      });

      // Draw connections between code blocks
      for (let i = 0; i < codeBlocks.length; i++) {
        for (let j = i + 1; j < codeBlocks.length; j++) {
          const dx = codeBlocks[i].x - codeBlocks[j].x;
          const dy = codeBlocks[i].y - codeBlocks[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            ctx.strokeStyle = `hsla(263, 70%, 50%, ${0.08 * (1 - distance / 200)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(codeBlocks[i].x, codeBlocks[i].y);
            ctx.lineTo(codeBlocks[j].x, codeBlocks[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw code blocks
      codeBlocks.forEach(block => {
        block.update();
        block.draw();
      });

      // Draw code rain (foreground layer)
      codeRains.forEach(rain => {
        rain.update();
        rain.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      
      {/* Radial gradient spots */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
    </>
  );
};

export default AnimatedBackground;
