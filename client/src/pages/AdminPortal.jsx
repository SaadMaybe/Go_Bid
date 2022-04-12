import React, { useState, Component, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";




export const AdminPortal = () => 
{
    const navigate = useNavigate();
    const location = useLocation();

    const [userID, setUserID] = useState(0);
    const [username, setUsername] = useState('');
    const [inpUsername, setInpUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [itemName, setItemName] = useState('');
    const [auctioner, setAuctioner] = useState('');


    // function handleClick(e) {
    //     e.preventDefault();
    //     navigate(-1, {state:{userID: location.state.userID}});
    // }

    function changeInpUsername(v)
    {
        setInpUsername(v.target.value);
    }
    function changePhoneNumber(v)
    {
        setPhoneNumber(v.target.value);
    }
    function changeItemName(v)
    {
        setItemName(v.target.value);
    }
    function changeAuctioner(v)
    {
        setAuctioner(v.target.value);
    }

    function userOnSubmit(e)
    {
        e.preventDefault();
        
        
        if(inpUsername !== "" && phoneNumber !== "")
        {
            
            axios.post('http://localhost:9000/adminportal/searchPhoneNumber', {username: inpUsername, phoneNumber: phoneNumber}).then(res =>
            {
                if(res.data.status === 'ok')
                    navigate('/AdminPortal/User', {state:{username: username, userID: userID, info: res.data.userArr}});
                else
                {
                    alert("No user found with that username and phone number");
                    navigate('/AdminPortal', {state:{userID: userID}});
                    
                }
                //something
            }).catch(err => {return <div>{err}</div>});
        }
        else if(inpUsername !== '')
        {
            axios.post('http://localhost:9000/adminportal/searchUsername', {username: inpUsername}).then(res =>
            {
                if(res.data.status === 'ok')
                    navigate('/AdminPortal/User', {state:{username: username, userID: userID, info: res.data.userArr}});
                else
                {
                    alert("No user found with that username and phone number");
                    navigate('/AdminPortal', {state:{userID: userID}});
                }
                //something
            }).catch(err => {return <div>{err}</div>});
        }
        else if(phoneNumber !== '')
        {
            axios.post('http://localhost:9000/adminportal/searchPhoneNumber', {phoneNumber: phoneNumber}).then(res =>
            {
                if(res.data.status === 'ok')
                    navigate('/AdminPortal/User', {state:{username: username, userID: userID, info: res.data.userArr}});
                else
                {
                    alert("No user found with that username and phone number");
                    navigate('/AdminPortal', {state:{userID: userID}});
                }
                //something
            }).catch(err => {return <div>{err}</div>});
        }
        else
        {
            return <div>bruh</div>;
        }
        
        
        
    }

    function auctionOnSubmit(e)
    {
        e.preventDefault();
        if(itemName !== '' && auctioner !== '')
        {
            axios.post('http://localhost:9000/adminportal/searchAuctioner', {auctioner: auctioner}).then(res =>
            {
                if(res.data.status === 'ok')
                    navigate('/AdminPortal/Auction', {state:{username: username, userID: userID, info: res.data.auctions}});
                else
                {
                    alert("No auctions found");
                    navigate('/AdminPortal', {state:{username: username, userID: userID}});
                }
                //something
            }).catch(err => {return <div>{err}</div>});
        }
        else if(itemName !== '')
        {
            
            axios.post('http://localhost:9000/adminportal/searchItemName', {itemName: itemName}).then(res =>
            {
                
                if(res.data.status === 'ok')
                    navigate('/AdminPortal/Auction', {state:{username: username, userID: userID, info: res.data.auctions}});
                else
                {
                    alert("No auctions found");
                    navigate('/AdminPortal', {state:{username: username, userID: userID}});
                }
                //something
            }).catch(err => {return <div>{err}</div>});
        }
        else if(auctioner !== '')
        {
            axios.post('http://localhost:9000/adminportal/searchAuctioner', {auctioner: auctioner}).then(res =>
            {
                if(res.data.status === 'ok')
                    navigate('/AdminPortal/Auction', {state:{username: username, userID: userID, info: res.data.auctions}});
                else
                {
                    alert("No auctions found");
                    navigate('/AdminPortal', {state:{username: username, userID: userID}});
                }
                //something
            }).catch(err => {return <div>{err}</div>});
        }
        else
        {
            return <div>bruh</div>;
        }

    }


    useEffect(async () => {
        
        const hmmm = location.state.userID;
        setUserID(hmmm);

        axios.post('http://localhost:9000/adminportal/', {userID: hmmm}).then(res => 
        {
            if(res.data.status === 'ok')
                setUsername(res.data.username);   
            else
            {
                alert("Error: User not found");
                navigate("/Homepage", {state: {userID: hmmm}});
            }    

        });
    }, [])


    return (
        <div>
                <div><button onClick={() => navigate('/Homepage', {state:{userID: location.state.userID}})}>Go back</button>
                <br></br><br></br>
                Admin Portal for {username}:<br></br>
                <br></br>
                
                <form>
                    <h2>Search by User</h2>
                    <label>Search by Username</label>
                    <input type="text" onChange={changeInpUsername} />
                    <label>Search by phone Number</label>
                    <input type="text" onChange={changePhoneNumber} />
                    <button onClick={userOnSubmit}>Search</button>
                </form>
                <br></br><br></br>
                <form>
                    <h2>Search by Auction</h2>
                    <label>Search by Item Name</label>
                    <input type="text" onChange={changeItemName} />
                    <label>Search by Auctioner</label>
                    <input type="text" onChange={changeAuctioner} />
                    <button onClick={auctionOnSubmit}>Search</button>
                </form>



        </div>
            
        </div>
    )
}