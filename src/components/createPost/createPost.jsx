import React from 'react'
import { useEffect,useState } from 'react'
import "./createPost.css"
import { useNavigate } from 'react-router-dom'
import M from "materialize-css"
const CreatePost = () => {
  const [title,setTitle]=useState("")
  const [body,setBody]=useState("")
  const [location,setLocation]=useState("")
  const [image,setImage]=useState("")
  const [url,setUrl]=useState("")
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(url){
      fetch("/posts",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body: JSON.stringify({
            title,body,location,
            pic:url
        })
    }).then(res=>res.json())
    .then(data=>{
       if(data.error){
        M.toast({html: data.error,classes:"toast-error"})
        // navigate("/signin")
       }
       else{
        M.toast({html:data.status,classes:"toast-success"})
        navigate("/postview");
       }
    })
    }
  },[url])


  const postDetails = ()=>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","instaclone")
    data.append("cloud_name","dlji1mozy")
    fetch("https://api.cloudinary.com/v1_1/dlji1mozy/image/upload",{
      method:"POST",
      body:data,
    }).then(res=>res.json())
    .then( data=>setUrl(data.secure_url))
    .catch(err=>console.log(err))
  }

  return (
    <>
        <div className='createpost'>
          <span>Upload Image:</span>
        <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} accept="image/png, image/jpeg, image/jpg"  /><br/>
        <input type="text"  value={location} onChange={(e)=>{setLocation(e.target.value)}} placeholder="Location"/><br/>
        <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} size={50} placeholder="Title"/><br/>
        <input type="text" value={body} onChange={(e)=>{setBody(e.target.value)}} size={50} placeholder="Description"/><br/>
        <button onClick={()=>{postDetails()}}>Post</button> 
        </div>

    </>
  )
}

export default CreatePost