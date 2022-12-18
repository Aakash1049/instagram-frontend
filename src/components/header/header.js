import React, { useContext } from "react";
import { UserContext } from "../../App";
import "./header.css"
import {
    Link,useNavigate
} from 'react-router-dom';
import logo from "../../images/logo.png"
const Header = () => {
    const navigate= useNavigate()
    const { state, dispatch } = useContext(UserContext)
    const renderlist = () => {
        if (state) {
            return [
                 <div className="home">
                 <Link to="/postview" style={{ textDecoration: 'none' }}>
                     <h3>Home</h3>
                 </Link>
                </div>,
                <div className="myposts" >
                    <Link to="/myposts" style={{ textDecoration: 'none' }}>
                        <h3>My Profile</h3>
                    </Link>
                </div>,
                 <div className="create">
                 <Link to="/createPost" style={{ textDecoration: 'none' }}>
                     <h3>create post</h3>
                 </Link>
             </div>,
                <div className="logout">
                
                <button onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    navigate("/signin")
                }}
                >Log Out</button>

                </div>
               
            ]
        }
        else {
            return[
                 <div className="new">
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <h3>Sign Up</h3>
                    </Link>
                </div>,
                <div className="login">
                    <Link to="/signin" style={{ textDecoration: 'none' }}>
                        <h3>Sign In</h3>
                    </Link>
                </div>
            ]
        }
    }
    return (
        <div className="Navbar">
            <div className="logo">
                <Link to={state?"/postview":"/signin"}>
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="header">
                
                {renderlist()}
                <div className="camera-icon">
                  
                        <i className="fa-solid fa-camera"></i>
                  
                </div>

            </div>
        </div>
    )
}
export default Header