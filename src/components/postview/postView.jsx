import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Card from '../../card';
import { Link,useNavigate } from 'react-router-dom'
import M from "materialize-css"
import "./postview.css"

export default function Postview() {
  const [posts, setposts] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/posts",{
      method:"GET",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then((res) => res.json())
      .then((data) => {
        // console.log(data)
        console.log(localStorage.getItem("jwt"))
        if (data.error) {
          console.log("err is postview", localStorage.getItem("jwt"))
          M.toast({ html: data.error, classes: "toast-error" })
          navigate("/signin")
        }
        else {
          setposts(data)
          M.toast({ html: "Posts fetched succesfully", classes: "toast-success" })
          // navigate("/");
        }
      })
    // console.log(posts)
  }, [])
  return (
    <>
     
      <div className="post-container">
      
        {posts.map((post, i) => {
          return (
            <>
            <Card post={post} key={i} />
            </>
          )
        })}
      </div>
    </>
  )
}
