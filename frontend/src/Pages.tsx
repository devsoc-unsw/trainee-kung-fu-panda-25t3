import { Routes, Route } from 'react-router-dom';

import './App.css';
import StartMenu from './components/StartMenu';
import SongSelect from './components/SongSelect';
import MapLoader from './components/MapLoader';

const Pages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartMenu />} />
        <Route path="/select" element={<SongSelect />} />
        <Route path="/game" element={<MapLoader />} />
      </Routes>
    </>
  )
}

export default Pages
