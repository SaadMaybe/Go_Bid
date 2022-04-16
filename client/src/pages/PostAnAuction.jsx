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
        setImg(title.target.files.files[0]);
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
        let s = await axios.post('http://localhost:9000/postanauction/', auction,{ headers :{ 'Content-Type' : 'multipart/form-data' }} ).then();
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

        <div className="left">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <h3>Post An Auction</h3>
                
                <label>Title:</label>
                <input  type="text"
                    required
                    className="form-control"
                    // value={this.state.UserName}
                    onChange={changeItemTitle}
                    />
                <br></br>

                <label>Description:</label>
                <input  type="text"
                    required
                    className="form-control"
                    // value={this.state.UserName}
                    onChange={changeDescription}
                    />
                <br></br>

                <label htmlFor="categories">Category:</label>
                <select id="category" name = "category" onChange={changeCategory}>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Books">Books</option>
                    <option value="Sports">Sports</option>
                    <option value="Other">Other</option>
                </select>
                <br></br>
                <br></br>

                <label>minimumBid:</label>
                <input  type="number"
                    required
                    className="form-control"
                    // value={this.state.UserName}
                    onChange={changeminimumBid}
                    />
                <br></br>
                <br></br>

                <label>Picture:</label>
                <input  type="text"
                    required
                    className="form-control"
                    // value={this.state.UserName}
                    onChange={changePictures}
                    />
                <br></br>

                <label>Tags:</label>
                <input  type="text"
                    required
                    className="form-control"
                    // value={this.state.UserName}
                    onChange={changeTags}
                    />
                <br></br>


                <label>Duration:</label>
                <input  type="number"
                    required
                    className="form-control"
                    // value={this.state.UserName}
                    onChange={changeEndingTime}
                    />
                <br></br>
                {/* //-----------CODE FOR UPLOADING IMAGES------------------ */}
                <label>Upload a picture:</label>
                <input type="file" 
                    enctype='multipart/form-data'
                    id="avatar"
                    accept="image/png, image/jpeg" 
                    onChange = {changeImg}/>
                <input type="submit" value="Post an Auction" className="btn btn-primary" />
                <div className="right"></div>
                </div>
            </form>
        </div>

)

}
