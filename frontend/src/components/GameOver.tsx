import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";

type GameOverProps = {
  open: boolean;
  completionPercent: number;
};

const GameOver = ({ open, completionPercent }: GameOverProps) => {
  const navigate = useNavigate();

  const handleQuit = () => {
    navigate('/select');
  };

  return (
    <Modal open={open}>
      <div className="flex flex-col justify-center items-center w-screen h-screen gap-3 text-[#FFFFFF]">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8">
          <div className="text-[8vw] font-bold">Game Over</div>
        </div>
        
        <div className="flex flex-col gap-4 items-center mb-8">
          <div className="text-[2vw] font-bold">
            <span>Completion: </span>
            <span>{completionPercent.toFixed(2)}%</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleQuit}
            className="px-6 py-3 rounded-lg transition-colors cursor-pointer text-[#FFFFFF] text-center"
            style={{ backgroundColor: '#11111B', fontSize: '2vw', fontWeight: 'bold' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a2e'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#11111B'}
          >
            Rage Quit?
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GameOver;

