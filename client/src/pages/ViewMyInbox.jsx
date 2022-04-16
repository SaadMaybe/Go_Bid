import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate, useLocation} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

export const ViewMyInbox = () => 
{
    const navigate = useNavigate();
    const location = useLocation();

    const [userID, setUserID] = useState(0);
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(async () =>
    {
        const hmmm = location.state.userID;
        setUserID(location.state.userID);
    
        await axios.post('http://localhost:9000/viewMyInbox/', {userID: hmmm}).then(res =>
        {
            setMessages(res.data.messages);
            setUsername(res.data.username);
        });
    }, [location.state.userID]);


    return (

        <div>

        <div className = "top-dash-user">
        <div className="back-btn"><button className="back" onClick={() => navigate('/Homepage', {state:{userID: location.state.userID, id: location.state.id}})}>&#8249;</button> </div>
        My Inbox
        
        </div>
        <div classname='inbox-list'>
            {/* <div className='top-dash'>My Inbox</div> */}
            <div> The messages for {username} are:</div>
            <div class="unread">
                {/* <span class="subject">The messages for {username} are:</span> */}
                {/* <input class="checkbox" type="checkbox" /> */}
                
                <header>
                    
                <div class="sender-info">
                    
                    <span class="from">
                        {messages.map(message => 
                        <ul>
                            <b>Timestamp</b>: {message.timeStamp}
                            <br></br>
                            <b>Message</b>: {message.contents}
                        </ul>
                        )}
                    </span>
                </div>
                {/* <span class="time">2 days ago</span> */}
                </header>
            </div>
        </div>
        </div>
    )
}



{/* <div className='inbox-container'>
            <div className='msg'>
                The messages for {username} are:
            </div>
                
            <div className='in-msg'>
                {messages.map(message => 
                <ul>
                    <b>Timestamp</b>: {message.timeStamp}
                    <br></br>
                    <b>Message</b>: {message.contents}
                </ul>
                )}
            </div>
                    
        </div> */}





        