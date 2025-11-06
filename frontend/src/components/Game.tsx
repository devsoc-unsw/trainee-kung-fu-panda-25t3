import { useState, useEffect, useRef } from 'react';

type SongInfo = Record<string, string | number>;

type UserData = {
  Keybinds: Record<string, string[]>;
  ManiaWidth: Record<string, string>;
  ManiaHeight: Record<string, string>;
};

type GameProps = {
  songInfo: SongInfo;
  userData: UserData;
  mapPath: string;
};

const Game = ({ songInfo, userData, mapPath }: GameProps) => {  
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const musicTime = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const rectangleX = useRef<number>(0); // tmp just for testing

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPressedKeys(prev => new Set(prev).add(event.key));
      console.log(`Key DOWN: ${event.key} at ${musicTime.current ? musicTime.current.currentTime * 1000 : 0}ms`);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setPressedKeys(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(event.key);
        console.log(`Key UP: ${event.key} at ${musicTime.current ? musicTime.current.currentTime * 1000 : 0}ms`);
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const circleSize = songInfo['CircleSize'];
    const maniaWidthKey = String(circleSize);
    const maniaWidth = userData.ManiaWidth[maniaWidthKey];
    
    canvas.width = parseInt(maniaWidth) * parseInt(String(circleSize));
    canvas.height = window.innerHeight;

    const rectangleWidth = 50;
    const rectangleHeight = 50;
    const speed = 10;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (musicTime.current) {
        setCurrentTime(musicTime.current.currentTime * 1000);
      }

      rectangleX.current += speed;

      if (rectangleX.current > canvas.width) {
        rectangleX.current = -rectangleWidth;
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(rectangleX.current, canvas.height / 2 - rectangleHeight / 2, rectangleWidth, rectangleHeight);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [songInfo, userData]);

/*
  const getColumn = (xValue) => {
    return Math.floor(xValue * songInfo['CircleSize'] / 512) // clamped between 0 and columnCount - 1
  }
*/

  return (
    <>
      <audio
        ref={musicTime}
        src={mapPath + songInfo['AudioFilename']}
        autoPlay
        controls
      />

      <h1>hi</h1>

      <div>
        Current Time: {currentTime}ms
      </div>

      <div>
        <p>Currently pressed keys: {Array.from(pressedKeys).join(', ') || 'None'}</p>
        <p>Number of keys pressed: {pressedKeys.size}</p>
      </div>



      <main className="flex justify-center items-center w-screen h-screen text-[#FFFFFF]">
        <canvas
          ref={canvasRef}
          className="bg-black"
        />
      </main>
    </>
  )
}

export default Game
