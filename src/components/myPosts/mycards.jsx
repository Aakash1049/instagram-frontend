import React from "react";
import "./myCard.css"
import M from "materialize-css"
import Swal from "sweetalert2";
import Popup from 'reactjs-popup';
import { useState,useEffect } from "react";
import like from "../../images/like.png"
import unlike from "../../images/unlike.png"
import comment from "../../images/comment.png"

//
const MyCard = ({ post }) => {
    const [showcomment, setshowcomment]=useState(false)
    const [allComments, setAllComments]=useState([])
    const [open, setOpen] = useState(false);
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [location,setLocation]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")
    const [likepost, setLikepost] = useState(false)
    const [totalLikes,setTotalLikes]= useState(0)
    useEffect(()=>{

        if(post.likes.includes(JSON.parse(localStorage.getItem("user"))._id)){
            setLikepost(true)
        }
        setTotalLikes(post.likes.length)
        setAllComments(post.comments)
    },[])
    //   const contentStyle = { background: '#000' };
    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
    const contentStyle = {
        textAlign:"center",
        borderRadius: "5px",
        margin: "auto",
        background: "rgb(255, 255, 255)",
        width: "50%",
        padding: "5px",
    }
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

    const updatedata=()=>{
        console.log("url in updatedata", url)

          fetch(`/posts/${post._id}`,{
            method:"put",
            headers:{
                "Content-type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title,body,location,
                image:url
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
            M.toast({html: data.error,classes:"toast-error"})
            // navigate("/signin")
           }
           else{
            // window.location.reload()
            M.toast({html:data.message,classes:"toast-success"})
            // navigate("myposts");
           }
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
    const closeModal = () => {
        if(image){
        console.log(image)
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","instaclone")
        data.append("cloud_name","dlji1mozy")
        fetch("https://api.cloudinary.com/v1_1/dlji1mozy/image/upload",{
          method:"POST",
          body:data,
        }).then(res=>res.json())
        .then( data=>{
            console.log(typeof( data.secure_url))
            // if(data.url)
            setUrl(data.url)
            // if(!url)
            // setUrl(data.secure_url)
            // console.log(url)
            // setUrl(data.url)
            console.log(url)
            updatedata() 
            // updatedata()
        })
        .catch(err=>console.log(err))
    }
        setOpen(false)
    };
    const deletePost = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "It will permanently deleted !",
            type: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.value) {
                fetch(`/posts/${id}`, {
                    method: "delete",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    }
                }).then(res => res.json())
                    .then(data => {
                        if (data.error) {
                            M.toast({ html: data.error, classes: "toast-error" })
                            // navigate("/signin")
                        }
                        else {
                            window.location.reload()
                            M.toast({ html: data.message, classes: "toast-success" })

                        }
                    })
                // window.location.reload();
            }
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
                        <i className="fa-regular fa-pen-to-square edit"  onClick={() => setOpen(o => !o)}></i>
                       
                           
                            <Popup open={open} closeOnDocumentClick onClose={closeModal}
                                {...{ contentStyle, overlayStyle }}
                            >
                                <div className="modal">
                                    <h3>Update Post </h3>
                                    <span>Upload Image:</span>
                                    <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} accept="image/png, image/jpeg, image/jpg" /><br />
                                    <input type="text" value={location} onChange={(e) => { setLocation(e.target.value) }} placeholder="Location" /><br />
                                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} size={50} placeholder="Title" /><br />
                                    <input type="text" value={body} onChange={(e) => { setBody(e.target.value) }} size={50} placeholder="Description" /><br />
                                    <button onClick={closeModal}>
                                        Update
                                    </button>
                                </div>
                            </Popup>
                    


                        <i className="fa-solid fa-trash delete" onClick={() => deletePost(post._id)}></i>
                        {/* <i className="fa-solid fa-ellipsis"></i> */}
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

                <form onSubmit={(e)=>{
                        e.preventDefault()
                        commentfunc(e.target[0].value,post._id)
                        e.target[0].value=""
                    }} >

                    {showcomment?<input className="comments" type="text" placeholder="add a comment here and hit enter" />:""}
                    </form>
                    {(showcomment && allComments.length!==0)?allComments.map(record=>{
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

            </div>

        </>
    )
}

export default MyCard