import './App.css';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

import { SignIn } from './pages/Signin';
import { Homepage } from './pages/Homepage';
import { Signup } from './pages/Signup';
import { ContactUs } from './pages/ContactUs'
import { useNavigate } from "react-router-dom";
// import contactUs from './pages/contactUs';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SignIn/>} />
          <Route path='/Homepage' element={<Homepage/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/ContactUs' element={<ContactUs/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
