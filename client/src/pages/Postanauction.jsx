import React, { useState, Component, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";

export const Postanauction = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [auctioner, setAuctioner] = useState("");
    const [itemTitle, setItemTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [minimumBid, setminimumBid] = useState("");
    const [pictures, setPictures] = useState("");
    const [tags, setTags] = useState("");

    const changeItemTitle = (title) => {
        setItemTitle(title.target.value);
    }
    
    const changeAuctioner = (auctioner) => {
        setAuctioner(auctioner.target.value);
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

    const changePictures = (picture) => {
        setPictures(picture.target.value);
    }

    const changeTags = (tags) => {
        setTags(tags.target.value);
    }

    const onSubmit = async (ev) =>{
        ev.preventDefault();
    

        console.log(location.state.userID);


        const auction = {
            auctioner: auctioner,
            itemTitle: itemTitle,
            description: description,
            category: category,
            minimumBid: minimumBid,
            pictures: pictures,
            tags: tags
        }
        
        console.log(auction);

        let s = await axios.post('http://localhost:9000/postanauction/', auction);
        
        if (s.data.status !== "error")
        {
            console.log("INSIDE THE ONSUBMIT BUTTON")
            navigate("/Homepage");
        }
      }


return (
/*     <input  type="file"
    // Style this input in CSS.
        required id="picture" name="picturename"
        className="form-control" multiple
        onChange={changePictures}
        />
    <br></br> */
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
                <select id="category" name = "category">
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


                <input type="submit" value="Post an Auction" className="btn btn-primary" />
                <div className="right"></div>
                </div>
            </form>
        </div>
)

}
