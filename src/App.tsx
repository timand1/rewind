import './App.scss';
import { Routes, Route } from 'react-router-dom';

import Nav from './components/Nav';

function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        {/* <Route path='/' element={ <Home /> } />
        <Route path='/About' element={ <About /> } />
        <Route path='/Confirmed' element={ <Confirmed /> } /> */}
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
