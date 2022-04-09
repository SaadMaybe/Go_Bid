import './App.css';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

import { SignIn } from './pages/Signin';
import { Homepage } from './pages/Homepage';
import { Signup } from './pages/Signup';
import { useNavigate } from "react-router-dom";
import { ContactUs } from './pages/ContactUs';
import { UserProfile } from './pages/UserProfile';
import { Postanauction } from './pages/Postanauction';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Signin/>} />
          <Route path='/Homepage' element={<Homepage/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/ContactUs' element={<ContactUs/>} />
          <Route path='/UserProfile' element={<UserProfile/>} />
          <Route path='/Postanauction' element={<Postanauction/>} />
          {/* <Route path='/contactUs' element={<contactUs/>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
