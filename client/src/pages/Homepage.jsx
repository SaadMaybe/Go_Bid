import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router';

export const Homepage = () => {
    const { UserID } = useParams();
    console.log("UserID at homePage: ", UserID)
    return (
        <div>
            {UserID}
            Homepage
        </div>
    )
}
