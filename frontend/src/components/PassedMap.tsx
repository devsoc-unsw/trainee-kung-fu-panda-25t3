import { Link, useLocation } from "react-router-dom";

const PassedMap = () => {
  const location = useLocation();
  const { score = 0, accuracy = 0, highestCombo = 0 } = location.state || {};
  return (
    <main className="flex flex-col justify-center items-center w-screen h-screen text-[#FFFFFF]">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-8">
        <div className="text-[8vw] font-bold">You Passed!</div>
      </div>
      
      <div className="flex flex-col gap-4 items-center mb-8">
        <div className="text-[2vw] font-bold">
          <span>Final Score: </span>
          <span>{score.toLocaleString()}</span>
        </div>
        <div className="text-[2vw] font-bold">
          <span>Accuracy: </span>
          <span>{accuracy.toFixed(2)}%</span>
        </div>
        <div className="text-[2vw] font-bold">
          <span>Highest Combo: </span>
          <span>{highestCombo}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Link 
          to="/select" 
          className="px-6 py-3 rounded-lg transition-colors cursor-pointer text-[#FFFFFF] text-center"
          style={{ backgroundColor: '#11111B', fontSize: '2vw', fontWeight: 'bold' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a1a2e'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#11111B'}
        >
          Play Another
        </Link>
      </div>
    </main>
  );
};

export default PassedMap;

