import React from "react";
import landing from "../../images/landing.png"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import "./landing.css"
const  Landing=()=>{
    return(
    <>  
        <div className="landing">
            <img src={landing} alt="landing page"/>
            <div className="enter">
                <h2>10x Team 04</h2>
                <Link to="/signin"><button> Enter </button></Link> 
            </div>
        </div>
       
    </>
    )
}
export default Landing