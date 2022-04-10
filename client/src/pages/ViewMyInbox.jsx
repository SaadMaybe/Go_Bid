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
            <div>
                The messages for {username} are:
            </div>
                
            <div>
                {messages.map(message => 
                <ul>
                    <b>Timestamp</b>: {message.timeStamp}
                    <br></br>
                    <b>Message</b>: {message.contents}
                </ul>
                )}
            </div>
            
        </div>
    )
}
