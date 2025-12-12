import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";
import Settings from "./Settings";
import useSound from "use-sound";
import buttonHover1 from "../../public/sounds/button_hover_1.wav";
import buttonClick1 from "../../public/sounds/button_click_1.wav";

const StartMenu = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => setOpenSettings(true);
  const [playHoverSound] = useSound(buttonHover1);
  const [playClickSound] = useSound(buttonClick1);
  return (
    <>
      <main className="flex flex-col justify-center items-center w-screen h-screen gap-3 text-[#FFFFFF]">
        <span className="text-4xl">Not Osu!</span>
        <Button
          variant="contained"
          onMouseEnter={() => {
            playHoverSound();
          }}
          onMouseDown={() => {
            playClickSound();
          }}
        >
          <Link to="/select">Start!</Link>
        </Button>
        <Button
          onClick={handleOpenSettings}
          onMouseEnter={() => {
            playHoverSound();
          }}
          onMouseDown={() => {
            playClickSound();
          }}
        >
          Settings
        </Button>
        {/* all the settings are in playerloader.tsx but it could be split into more components */}
        <Settings
          open={openSettings}
          onClose={() => setOpenSettings(false)}
        ></Settings>
      </main>
    </>
  );
};

export default StartMenu;
