import './App.css';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

import { SignIn } from './pages/Signin';
import { Homepage } from './pages/Homepage';
import { Signup } from './pages/Signup';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router';

// import contactUs from './pages/contactUs';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SignIn/>}  />
          <Route path='/Homepage/:UserID' element={<Homepage/>} />
          <Route path='/Signup' element={<Signup/>} />
          {/* <Route path='/contactUs' element={<contactUs/>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
