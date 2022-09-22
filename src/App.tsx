import './App.scss';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Leaderboard from './views/Leaderboard';
import UserPage from './views/UserPage';
import SignUp from './views/SignUp';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/user/:userId" element={<UserPage />} />
      </Routes>
    </div>
  )
}

export default App
