import './App.css';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

import Signin from './pages/Signin';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import contactUs from './pages/contactUs';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Signin/>} />
          <Route path='/Homepage' element={<Homepage/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/contactUs' element={<contactUs/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
