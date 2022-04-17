import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';



export const DisplayAnAuction = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [amountBidded, setAmountBidded] = useState(0);
    const [title, setTitle] = useState("");
    const [auctioneer, setAuctioneer] = useState("");
    const [maximumBid, setMaximumBid] = useState(0);
    const [picture, setPicture] = useState("");
    const [tags, setTags] = useState("");
    const [description, setDescription] = useState("");
    const [aucComp, setAucComp] = useState(0);
    const [aucCanc, setAucCanc] = useState(0);
    const [aucUsername, setAucUsername] = useState("");
    const [image , setImage] = useState();

    let display = {};


    const changeAmountBidded = (amountBidded) => {
        setAmountBidded(amountBidded.target.value);
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();

        const userID = location.state.userID;
        
        const bid = {
            bidder : location.state.id,
            amountBidded : amountBidded,
            associatedAuction : location.state.auctionid,
            
            currentBid : location.state.highestBidValue,
            BidID : location.state.highestBid
        }
        
        if (amountBidded > location.state.highestBidValue)
        {  
            let s = await axios.post('https://my-app-6zap7.ondigitalocean.app/postabid/', bid);
            console.log("S: ", s)
            if (s.data.status !== "error")
            {
                console.log("INSIDE THE ONSUBMIT BUTTON")
                navigate("/Homepage", {state: {id: location.state.id, userID: userID}});
            }
            else
            {
                alert("Bid Not Placed")
            }
        }
        else
        {
            alert("Bid lesser than minimum Bid")
        }
        
    }

    useEffect(async () =>
    {
        const auction = { auctionid: location.state.auctionid};
        var auctionQuery = await axios.post('https://my-app-6zap7.ondigitalocean.app/getauction', auction);
        //console.log("AuctionQuery: ", auctionQuery.data)
        var returnAuction = auctionQuery.data.value;
        //console.log(returnAuction.itemBeingAuctioned.Image);
        
        const item = { itemid : returnAuction.itemBeingAuctioned}
        var itemQuery = await axios.post('https://my-app-6zap7.ondigitalocean.app/getitem', item);
        var returnItem = itemQuery.data.value;

        setMaximumBid(location.state.highestBidValue)
        setTitle(returnItem.itemTitle);
        setAucUsername(returnAuction.auctioner.username);
        setAucCanc(returnAuction.auctioner.cancelledAuctions);
        
        
        //console.log("return:", image_buffer);
        var image_buffer = "data:image/jpg;base64," + btoa(returnItem.Image.data);
        //console.log("buffer:", image_buffer);
        setImage(image_buffer);

        const hmmm = returnAuction.auctioner.completedAuctions;
        let i = 0;
        for (i = 0; i < hmmm.length; i++);
        setAucComp(i);
        

        // setMaximumBid(location.state.maximumBid);
        setPicture(returnItem.pictures[0]);
        setTags(returnItem.tags);
        setDescription(returnItem.description);

        // console.log("maximum bid IN displayAnAuction: ", maximumBid)


/*         display["itemTitle"] = returnItem.itemTitle;
        display["Auctioneer"] = returnAuction.auctioner;
        display["Current Highest Bid"] = location.state.maximumBid;
        display["picture"] = returnItem.picture;
        display["tags"] = returnItem.tags; */
        
    },[location.state.userID, location.state.auctionid])

    // getData();

return (
    // <div>
    // Title: {title}<br></br>
    // Description: {description}<br></br>
    // Auctioner: {aucUsername}<br></br>
    // Auctioner's Completed auctions: {aucComp}<br></br>
    // Auctioner's Cancelled auctions: {aucCanc}<br></br>
    // Current Highest Bid: {maximumBid}<br></br>
    // Picture: {picture}<br></br>
    // tags: {tags}<br></br>

    // <form onSubmit={onSubmit}>

    //     <div className="form-group">
    //     <label>Enter your bid:</label>
    //     <input  type="number"
    //     required
    //     className="form-control"
    //     // value={this.state.UserName}
    //     onChange={changeAmountBidded}
    //     />
    //     <input type="submit" value="Post a bid" className="btn btn-primary" />
    //     <div className="right"></div>
    //     </div>
    // </form>
    // </div>

<html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
      </head>

      <body>
      <div className = "top-dash-user">
    <div className="back-btn"><button className="back" onClick={() => navigate("/Homepage", {state:{userID: location.state.userID}})}>&#8249;</button> </div>
    Display Auction
    </div>
        <div className="main_auction">
          <div className="left_half col-md-4 ml-5">
            <div className="an_auction">
              <div className="item2">
                <div className="text-desc">
                    {description}
                </div>
              </div>
            </div>
          </div>

          <div className="right_half col-md-3">
            <p className="display-para">
              Title: {title}

              <br></br>
              Auctioner: {aucUsername}
              <br></br>
              Auctioner's Completed auctions: {aucComp}
              <br></br>
              Auctioner's Cancelled auctions: {aucCanc}
              <br></br>
              Current Highest Bid: {maximumBid}
              <br></br>
              Location: {picture}
              <br></br>
              tags: {tags}
              <br></br>
            </p>

            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>Enter your bid:</label>
                <input
                  type="number"
                  required
                  className="form-control w-50"
                  // value={this.state.UserName}
                  onChange={changeAmountBidded}
                />
                <input
                  type="submit"
                  value="Post a bid"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </body>
    </html>

/////

)
}