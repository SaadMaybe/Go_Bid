import React, { useState, Component, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";
// import { multer } from 'multer'

export const PostAnAuction = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [itemTitle, setItemTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Electronics");
    const [minimumBid, setminimumBid] = useState("");
    const [pictures, setPictures] = useState("");
    const [tags, setTags] = useState("");
    const [endingTime, setEndingTime] = useState(0);

    const [img, setImg] = useState();

    const changeImg = (title) => {
        setImg(title.target.files);
    }

    const changeItemTitle = (title) => {
        setItemTitle(title.target.value);
    }
    
    const changeDescription = (description) => {
        setDescription(description.target.value);
    }

    const changeCategory = (category) => {
        setCategory(category.target.value);
    }

    const changeminimumBid = (minimumBid) => {
        setminimumBid(minimumBid.target.value);
    }

    const changePictures = (pictures) => {
        setPictures(pictures.target.value);
    }

    const changeTags = (tags) => {
        setTags(tags.target.value);
    }

    const changeEndingTime = (endingTime) => {
        setEndingTime(endingTime.target.value);
    }

    const onSubmit = async (ev) =>{
        ev.preventDefault();

        // const auction = {
        //     userID: location.state.userID,
        //     auctioner: location.state.id,
        //     itemTitle: itemTitle,
        //     highestBid: null,
        //     highestBidValue: 0,
        //     description: description,
        //     category: category,
        //     minimumBid: minimumBid,
        //     pictures: pictures,
        //     tags: tags,
        //     endingTime: endingTime
        // }

        const auction = new FormData()
        auction.append("userID", location.state.userID)
        auction.append("auctioner", location.state.id)
        auction.append("itemTitle", itemTitle)
        auction.append("highestBid", null)
        auction.append("highestBidValue", 0)
        auction.append("description", description)
        auction.append("category", category)
        auction.append("minimumBid", minimumBid)
        auction.append("pictures", pictures)
        auction.append("tags", tags)
        auction.append("endingTime", endingTime)
        auction.append("image", img)
        // console.log("id: ", location.state.id);

        console.log("Before sending form data", auction.values())
        let s = await axios.post('https://my-app-6zap7.ondigitalocean.app/postanauction/', auction,{ headers :{ 'Content-Type' : 'multipart/form-data' }} ).then();
        console.log("After sending form data")
        // console.log("Status s: ",s.data.message)
        if (s.data.status == "ok")
        {
            // console.log("INSIDE THE ONSUBMIT BUTTON in post an auction")
            navigate("/Homepage", {state: {userID: location.state.userID, id: location.state.id}});
        }
        else
        {
            console.log("ErrorMSG: ", s.data.message)
        }
      }


return (
<html>
    <head>
        <title>W3.CSS Template</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        
    </head>

    <body>
    <div>
        <div className = "top-dash-user">
            <div className="back-btn">
			<button 
			className="back" 
			onClick=
				{
					() => {navigate('/Homepage', {state:{userID: location.state.userID, id: location.state.id}})}
				}>&#8249;</button>
			</div>    
			Post an Auction
			</div>
        <br></br><br></br>
        {/* <h3>Post An Auction</h3> */}
            
            <form onSubmit={onSubmit}>
                <div >

                <div className="t-and-d">
                    <label className="don2">Title:</label>
                    <input className="in-user"  type="search"
                        required
                        // value={this.state.UserName}
                        onChange={changeItemTitle}
                        />
                    <br></br><br></br>

                    <label className="don2">Description:</label>
                    <input className="in-user-desc"  type="search"
                        required

                        // value={this.state.UserName}
                        onChange={changeDescription}
                        />
                </div>
                <br></br>

                <label className="t-and-d" htmlFor="categories">Category:</label>
                <select className="category" onChange={changeCategory}>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                </select>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div className="two-col">
                    <div className="bid-time">
                        <label className="don2" >minimumBid:</label>
                        <input className="in-user"  type="number"
                            required

                            // value={this.state.UserName}
                            onChange={changeminimumBid}
                            />
                        <br></br>
                        <br></br>

                        <label className="don2">Duration:</label>
                        <input className="in-user"  type="number"
                            required

                            // value={this.state.UserName}
                            onChange={changeEndingTime}
                            />
                        <br></br>

                        <br></br><br></br>
                        <label className="don2">Location:</label>
                        <input className="in-user"  type="search"
                            required

                            // value={this.state.UserName}
                            onChange={changePictures}
                        />
                        <br></br>
                        <label className="don2">Upload a picture:</label>
                        <input type="file" 
                            encType='multipart/form-data'
                            id="avatar"
                            name = "avatar"
                            accept="image/png, image/jpeg" 
                            onChange = {changeImg}/>

                    </div>

                    

                    <label>Tags:</label>
                    <input  type="search"
                        required

                        // value={this.state.UserName}
                        onChange={changeTags}
                        />
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    <br></br><br></br><br></br><br></br>


                    
                    {/* //-----------CODE FOR UPLOADING IMAGES------------------ */}
                    
                    
                </div>
                {/* <input className="post-auction" type="submit" value="Post an Auction" /> */}
                <button className="post-auction" type="submit" >Post an auction</button>
                {/* <div className="right"></div> */}
                </div>
            </form>
        </div>
    </body>
</html>
)

}
