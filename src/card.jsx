import React from "react";
import { useState,useEffect } from "react";
import "./card.css"
import like from "./images/like.png"
import unlike from "./images/unlike.png"
import comment from "./images/comment.png"


const Card = ({ post }) => {
    const [likepost, setLikepost] = useState(false)
    const [totalLikes,setTotalLikes]= useState(0)
    const [showcomment, setshowcomment]=useState(false)
    const [allComments, setAllComments]=useState([])
    useEffect(()=>{

        if(post.likes.includes(JSON.parse(localStorage.getItem("user"))._id)){
            setLikepost(true)
        }
        setTotalLikes(post.likes.length)
        setAllComments(post.comments)
    },[])
   
    function likefunc(id) {
        setTotalLikes(totalLikes+1)
        fetch("/like",{
            method: "put",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
        .then((result) => {
            console.log(result)
            setLikepost(!likepost)
        })
       
    }
    function unlikefunc(id) {
        setTotalLikes(totalLikes-1)
        fetch("/unlike",{
            method: "put",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
        .then((result) => {
            console.log(result)
            setLikepost(!likepost)
        }) 
    }
    function commentfunc(text,id){
        fetch("/comments",{
            method: "put",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id,
                text
            })
        }).then(res => res.json())
        .then((result) => {
            // console.log(result,result.comments)
            setAllComments(result.comments)

        }) 
    }
    return (
        <>
            <div className="card">
                <div className="card-head">
                    <div className="intro">
                        <span className="name"> {post.owner}</span>
                        <br />
                        <span className="place"> {post.location}</span>

                    </div>
                    <div className="ellipse">

                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                </div>
                <div className="img">
                    <img src={post.image} alt="img" />
                </div>
                <div className="foot">
                    <span className="icons">
                        {(likepost) ? <img src={like} onClick={() => unlikefunc(post._id)} alt="img" /> : <img src={unlike} onClick={() => likefunc(post._id)} alt="img" />}
                        {/* <i className="fa-solid fa-paper-plane" style={{marginTop:"0px"}}></i> */}
                        <img src={comment} class="comment-icon" onClick={() =>  setshowcomment(!showcomment)}/>
                    </span>
                    <span className="date">
                        {post.date.substring(0, 10)}
                    </span>
                </div>
                <p className="likes">{totalLikes} likes</p>
                <p className="likes">{allComments.length} Comments</p>
                <div className="title">
                    {post.title}
                </div>

                <div className="description">
                    {post.body}
                </div>
                {/* <div className="comments"> */}
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        commentfunc(e.target[0].value,post._id)
                        e.target[0].value=""
                    }} >

                    {showcomment?<input className="comments" type="text" placeholder="add a comment here and hit enter" />:""}
                    </form>
                    {(showcomment && allComments.length!=0)?allComments.map(record=>{
                        return(
                            <>
                            <h6 style={{textAlign:"start", marginLeft:"15px"}}>
                            <span style={{
                                fontWeight:"bold",
                                fontSize:"15px"
                            }}>{record.postedBy}: </span>
                            <span style={{
                                fontWeight:"lighter",
                                fontSize:"15px"
                            }}>{record.text}</span>
                            </h6>
                            </>
                        )
                    }):""}
                {/* </div> */}

            </div>

        </>
    )
}

export default Card