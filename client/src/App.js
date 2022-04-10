import './App.css';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

import { SignIn } from './pages/Signin';
import { Homepage } from './pages/Homepage';
import { Signup } from './pages/Signup';
import { useNavigate } from "react-router-dom";
import { ContactUs } from './pages/ContactUs';
import { UserProfile } from './pages/UserProfile';
import { PostAnAuction } from './pages/PostAnAuction';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/' element={<SignIn/>} />
          <Route path='/Homepage' element={<Homepage/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/ContactUs' element={<ContactUs/>} />
          <Route path='/UserProfile' element={<UserProfile/>} />
          <Route path='/PostAnAuction' element={<PostAnAuction/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
