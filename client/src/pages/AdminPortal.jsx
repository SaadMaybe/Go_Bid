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
    const [id, setId] = useState("");


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
            
            axios.post('http://localhost:9000/adminPortal/searchPhoneNumber', {username: inpUsername, phoneNumber: phoneNumber}).then(res =>
            {
                if(res.data.status === 'ok')
                    navigate('/AdminPortal/User', {state:{username: username, userID: userID, info: res.data.userArr, id: id}});
                else
                {
                    alert("No user found with that username and phone number");
                    navigate('/AdminPortal', {state:{userID: userID, id: id}});
                    
                }
                //something
            }).catch(err => {return <div>{err}</div>});
        }
        else if(inpUsername !== '')
        {
            axios.post('http://localhost:9000/adminPortal/searchUsername', {username: inpUsername}).then(res =>
            {
                if(res.data.status === 'ok')
                    navigate('/AdminPortal/User', {state:{username: username, userID: userID, info: res.data.userArr, id: id}});
                else
                {
                    alert("No user found with that username and phone number");
                    navigate('/AdminPortal', {state:{userID: userID, id: id}});
                }
                //something
            }).catch(err => {return <div>{err}</div>});
        }
        else if(phoneNumber !== '')
        {
            console.log("I mean- death isn't that bad when you think about it");
            axios.post('http://localhost:9000/adminPortal/searchPhoneNumber', {phoneNumber: phoneNumber}).then(res =>
            {
                if(res.data.status === 'ok')
                    navigate('/AdminPortal/User', {state:{username: username, userID: userID, info: res.data.userArr, id: id}});
                else
                {
                    console.log("I hope I die and burn all the pain away ")
                    alert("No user found with that username and phone number");
                    navigate('/AdminPortal', {state:{userID: userID, id: id}});
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
            axios.post('http://localhost:9000/adminPortal/searchAuctioner', {auctioner: auctioner}).then(res =>
            {
                if(res.data.status === 'ok')
                    navigate('/AdminPortal/Auction', {state:{username: username, userID: userID, info: res.data.auctions, id: id}});
                else
                {
                    alert("No auctions found");
                    navigate('/AdminPortal', {state:{username: username, userID: userID, id: id}});
                }
                //something
            }).catch(err => {return <div>{err}</div>});
        }
        else if(itemName !== '')
        {
            
            axios.post('http://localhost:9000/adminPortal/searchItemName', {itemName: itemName}).then(res =>
            {
                
                if(res.data.status === 'ok')
                    navigate('/AdminPortal/Auction', {state:{username: username, userID: userID, info: res.data.auctions, id: id}});
                else
                {
                    alert("No auctions found");
                    navigate('/AdminPortal', {state:{username: username, userID: userID, id: id}});
                }
                //something
            }).catch(err => {return <div>{err}</div>});
        }
        else if(auctioner !== '')
        {
            axios.post('http://localhost:9000/adminPortal/searchAuctioner', {auctioner: auctioner}).then(res =>
            {
                if(res.data.status === 'ok')
                    navigate('/AdminPortal/Auction', {state:{username: username, userID: userID, info: res.data.auctions, id: id}});
                else
                {
                    alert("No auctions found");
                    navigate('/AdminPortal', {state:{username: username, userID: userID, id: id}});
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
        setId(location.state.id);

        axios.post('http://localhost:9000/adminPortal/', {userID: hmmm}).then(res => 
        {
            if(res.data.status === 'ok')
                setUsername(res.data.username);   
            else
            {
                alert("Error: User not found");
                navigate("/Homepage", {state: {userID: hmmm, id: id}});
            }    

        });
    }, [])


    return (
        <div>
            <div className = "top-dash-user">
            <div className="back-btn"><button className="back" onClick={() => navigate('/Homepage', {state:{userID: location.state.userID, id: id}})}>&#8249;</button></div>
            Admin Portal
            </div>
            
                <br></br><br></br>
                <div className="portal">
                    Admin Portal for {username}:<br></br>
                    <br></br>
                    
                    <form className="by-user">
                        <h2>Search by User</h2>
                        <label>Search by Username</label>
                        <input className = "in-user" type="text" onChange={changeInpUsername} />
                        <label>Search by phone Number</label>
                        <input className = "in-user" type="text" onChange={changePhoneNumber} />
                        <button className="search-portal" onClick={userOnSubmit}>Search</button>
                    </form>
                    <br></br><br></br>
                    <form className="by-user">
                        <h2>Search by Auction</h2>
                        <label>Search by Item Name</label>
                        <input className="in-user" type="text" onChange={changeItemName} />
                        <label>Search by Auctioner</label>
                        <input className = "in-user" type="text" onChange={changeAuctioner} />
                        <button className="search-portal" onClick={auctionOnSubmit}>Search</button>
                    </form>

                </div>

            
        </div>
    )
}