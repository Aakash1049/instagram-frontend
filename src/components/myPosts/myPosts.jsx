import React from 'react';
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import MyCard from './mycards';
import M from "materialize-css"
import "./myPosts.css"
import { UserContext } from '../../App';

export default function MyPosts() {
  const [posts, setposts] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const [image, setImage] = useState("")
  useEffect(() => {
    console.log(state)
    fetch("/myposts", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if (data.error) {
          M.toast({ html: data.error, classes: "toast-error" })
        }
        else {
          setposts(data)
        }
      })
  }, [])


  useEffect(() => {
    if (image) {
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "instaclone")
      data.append("cloud_name", "dlji1mozy")
      fetch("https://api.cloudinary.com/v1_1/dlji1mozy/image/upload", {
        method: "POST",
        body: data,
      }).then(res => res.json())
        .then(data => {
          fetch("/updateProfilePic", {
            method: "put",
            headers: {
              "Content-type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              profilePic: data.secure_url
            })
          }).then(res => res.json())
            .then(result => {
              console.log(result.profilePic)
              localStorage.setItem("user", JSON.stringify({ ...state, profilePic: result.profilePic }))
              dispatch({ type: "updateProfilePic", payload: result.profilePic })
              M.toast({ html: "Profile pic updated successfully", classes: "toast-success" })

            })
        })
        .catch(err => console.log(err))
    }
  }, [image])
  function updatepic(file) {
    // console.log(image)
    setImage(file)
    console.log(state)

  }
  return (

    <div style={{ margin: "0px auto" }}>
      <div style={{
        margin: "18px auto",
        borderBottom: "1px solid grey",
        maxWidth: "550px",
      }}>


        <div style={{
          display: "flex",
          justifyContent: "space-around",


        }}>
          <div className='profilepic'>
            <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={state ? state.profilePic : "loading" }
              alt="image"
            />

          </div>
          <div className='profile' style={{ fontSize: "22px" }}>
            <h4>{state ? state.name : "loading"}</h4>
            <h5>{state ? state.email : "loading"}</h5>
            <div>
              <h6>{posts.length} posts</h6>
              {/* <h6>{45} followers</h6>
              <h6>{45} following</h6> */}
            </div>

          </div>
        </div>

        <div style={{ margin: "10px" }}>
            <label for="upload-photo">Update profile picture</label>
              <input type="file" onChange={(e) => updatepic(e.target.files[0])} name="photo" id="upload-photo" />
        
        </div>
      </div>

      <div className="post-container" style={{
        margin: "10px 30px",
        display: "grid",
        gridTemplateColumns: ` auto auto auto`,
        maxWidth: "100vw"
      }}
      >
        {posts.map((post) => {
          return (
            <MyCard post={post} key={post._id} />
          )
        })}
      </div>
    </div>
  )
}
