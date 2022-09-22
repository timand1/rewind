import './App.scss';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Leaderboard from './views/Leaderboard';
import UserPage from './views/UserPage';
import SignUp from './views/SignUp';
import AddGame from './views/AddGame';
import GamesList from './views/GamesList';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/user/:username" element={<UserPage />} />
        <Route path="/games" element={<GamesList />} />
        <Route path="/addgame" element={<AddGame />} />
      </Routes>
    </div>
  )
}

export default App
