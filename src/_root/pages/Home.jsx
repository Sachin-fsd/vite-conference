import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../context/AuthContext'
import PostCard from '../../components/shared/PostCard'
import { getPosts, postText } from '../../lib/api/api';

const Home = () => {
  const { UserDetails } = useUserContext();
  const [posts, setPosts] = useState([])
  const [height, setHeight] = useState("auto")
  const [text, setText] = useState(undefined)
  const [file, setFile] = useState(undefined)
  const [previewDisplay, setPreviewDisplay] = useState("none")
  const [previewPhotoDisplay, setPreviewPhotoDisplay] = useState("none")
  const [fileNameDisplay, setFileNameDisplay] = useState("none")
  const [fileName, setFileName] = useState(undefined)
  const [previewPhoto, setPreviewPhoto] = useState(undefined)
  function autoResize(e) {
    // console.log(e)
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  }
  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
    console.log(data)

  };
  useEffect(() => {

    fetchPosts().then((res) => {

      document.getElementById("PreLoaderBar").classList.remove("show");
      document.getElementById("PreLoaderBar").classList.add("hide");
    });

  }, []);

  const handlePostSubmit = async () => {
    if (text === null || text.trim() === "") return;
    document.getElementById("PreLoaderBar").classList.remove("hode");
    document.getElementById("PreLoaderBar").classList.add("show");
    let res = await postText(text, file, UserDetails.UserID);

    setText("");
    setFile(null);
    setPreviewDisplay("none")
    // alert(`Your post has been submitted successfully!`);
    if (res === true) {
      fetchPosts().then(res => {
        document.getElementById("PreLoaderBar").classList.remove("show");
        document.getElementById("PreLoaderBar").classList.add("hide");
      });
    }
    else alert("Error posting your message");
  }

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFile(file)
    console.log(file.name)

    const fileSize = file.size / 1024 / 1024; // in MB
    if (fileSize > 10) {
      alert("File size exceeds 10MB. Please select a smaller file.");
      return;
    }

    const reader = new FileReader();

    if (file.type.startsWith("image/")) {
      reader.onload = function (e) {
        setPreviewDisplay("flex")
        setPreviewPhotoDisplay("block")
        setPreviewPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith("video/")) {
      reader.onload = function (e) {
        var video = document.getElementById("preview-video");
        video.style.display = "block";
        video.src = e.target.result;
        video.controls = true;
        setPreviewDisplay("flex");
        setPreviewPhotoDisplay("none");
      };
      reader.readAsDataURL(file);
    } else {
      console.log(file.name)
      var video = document.getElementById("preview-video");
      video.style.display = "none";
      // For non-image and non-video files, just display the file name
      setFileName(file.name);
      setPreviewDisplay("flex");
      setFileNameDisplay("block");
      setPreviewPhotoDisplay("none");
    }

  }

  if (posts.length === 0) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="middle" id="middle">
        <div className="preview" id="preview" style={{ display: `${previewDisplay}` }}>
          <img id="preview-photo" style={{ display: `${previewPhotoDisplay}` }} className="preview-photo" src={previewPhoto} />
          <video id="preview-video" style={{ display: "none" }} className="preview-video"></video>
          <p id="file-name" style={{ display: `${fileNameDisplay}` }} className="pdf-name" >{fileName}</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="create-post" id="post_form" encType="multipart/form-data">
          <div className="profile-photo">
            <img src={UserDetails.UserDp}
            // onerror="this.src='https://cdn.pixabay.com/photo/2022/02/26/18/16/peace-7036144_640.png'" 
            />
          </div>

          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value) }}
            onInput={(e) => autoResize(e)}
            id="create-post"
            style={{ height: height }}
            placeholder={`What's on your mind, ${UserDetails.UserName}?`}
            required>

          </textarea>

          <input onChange={(e) => handleFile(e)} type="file" id="fileinput" name="fileinput" accept="image/*,application/pdf,video/*"
            style={{ display: "none" }} />

          <label htmlFor="fileinput" className="btn"> <big><i className='bx bx-paperclip bx-rotate-90'></i></big>

          </label>

          <input type="submit" onClick={handlePostSubmit} id="post-submit-btn" value="Post" className="btn btn-primary" />
        </form>

        {/* <!-- FEEDS --> */}
        <div className="feeds" id="feeds">
          {posts.map((post, index) => {
            return (
              <div className="feed" key={index}>
                <PostCard post={post} setPosts={setPosts}/>
              </div>
            );
          })}
          {/* <div className="loader" id="loader"></div> */}

        </div>
      </div>
    )
  }
}
export default Home