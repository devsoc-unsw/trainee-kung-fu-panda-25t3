import React from "react";
import { useState, useEffect } from "react";
import "./Settings.css";
import { type UserData } from "./CommonGame";

type KeybindSetProps = {
  keysNum: number;
  keysIndex: number;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
};

const KeybindSet = ({
  keysNum,
  keysIndex,
  userData,
  setUserData,
}: KeybindSetProps) => {
  const key = userData?.Keybinds[String(keysNum)]?.[keysIndex] ?? null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newKey = e.key;

    setUserData((prev) => {
      if (!prev) return prev;

      const keyNum = String(keysNum);
      const updatedKeybinds = [...prev.Keybinds[keyNum]];
      updatedKeybinds[keysIndex] = newKey;

      return {
        ...prev,
        Keybinds: {
          ...prev.Keybinds,
          [keyNum]: updatedKeybinds,
        },
      };
    });
  };

  return (
    <div className="keyBox" tabIndex={0} onKeyDown={handleKeyDown}>
      {key}
    </div>
  );
};

export default KeybindSet;
