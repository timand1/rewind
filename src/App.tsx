import './App.scss';
import { Routes, Route } from 'react-router-dom';

import Nav from './components/Nav';
import LandingPage from './views/LandingPage';
import Leaderboard from './views/Leaderboard';
import UserPage from './views/UserPage';

function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path='/signup' element={<SignUp />}> */}
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/user/:userId" element={<UserPage />} />
      </Routes>
    </div>
  )
}

export default App
