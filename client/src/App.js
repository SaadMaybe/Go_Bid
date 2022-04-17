import './App.css';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";

import { SignIn } from './pages/Signin';
import { Homepage } from './pages/Homepage';
import { Signup } from './pages/Signup';
import { useNavigate } from "react-router-dom";
import { ContactUs } from './pages/ContactUs';
import { UserProfile } from './pages/UserProfile';
import { PostAnAuction } from './pages/PostAnAuction';
import { ViewMyAuctions } from './pages/ViewMyAuctions';
import { DisplayAnAuction } from './pages/DisplayAnAuction';
import { ViewMyInbox } from './pages/ViewMyInbox'
import { AdminPortal } from './pages/AdminPortal'
import { AdminDisplayUsers } from './pages/AdminDisplayUsers'
import { AdminDisplayAuctions } from './pages/AdminDisplayAuctions'
import { SearchResults } from './pages/SearchResults'
import { ViewMyPastAuctions } from './pages/ViewMyPastAuctions';
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
          <Route path='/ViewMyAuctions' element={<ViewMyAuctions/>} />
          <Route path='/DisplayAnAuction' element={<DisplayAnAuction/>} />
          <Route path='/ViewMyInbox' element={<ViewMyInbox/>} />
          <Route path='/AdminPortal' element={<AdminPortal/>} />
          <Route path='/AdminPortal/User' element={<AdminDisplayUsers/>}/>
          <Route path='/AdminPortal/Auction' element={<AdminDisplayAuctions/>}/>
          <Route path='/SearchResults' element={<SearchResults/>}/>
          <Route path='/ViewMyPastAuctions' element={<ViewMyPastAuctions/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
