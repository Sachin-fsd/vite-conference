// Import required libraries
import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../context/AuthContext'; // Access user details for posts
import PostCard from '../../components/shared/PostCard'; // Map posts to PostCard components
import { getPosts, postText } from '../../lib/api/api'; // Fetch posts and submit new posts
import { autoResize } from '../../lib/utils'; // Auto-resize textarea on input
import BeatLoader from "react-spinners/BeatLoader"; // Loader component

const Home = () => {

  // State variables
  const { UserDetails } = useUserContext(); // User details from context
  const [posts, setPosts] = useState([]); // Array to store fetched posts
  const [height, setHeight] = useState("auto"); // Input textarea height
  const [text, setText] = useState(undefined); // Text for new post
  const [file, setFile] = useState(undefined); // Selected file for upload
  const [previewDisplay, setPreviewDisplay] = useState("none"); // Control preview visibility
  const [previewPhotoDisplay, setPreviewPhotoDisplay] = useState("none"); // Control photo preview visibility
  const [fileNameDisplay, setFileNameDisplay] = useState("none"); // Control file name visibility
  const [videoDisplay, setVideoDisplay] = useState("none"); // Control video preview visibility
  const [fileName, setFileName] = useState(undefined); // File name for display
  const [previewPhoto, setPreviewPhoto] = useState(undefined); // Data URL for preview image
  const [fileCross, setFileCross] = useState(false); // Flag for file cross icon display

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPostsData = async () => {
      const data = await getPosts();
      setPosts(data);
      console.log("Fetched posts:", data); // Log fetched posts for debugging
    };

    fetchPostsData().then(() => {
      document.getElementById("PreLoaderBar").classList.remove("show");
      document.getElementById("PreLoaderBar").classList.add("hide"); // Hide preloader after fetching
    });
  }, []);

  // Handle file cross click (remove selected file)
  const handleFileCross = () => {
    setFile(undefined);
    setFileName(undefined);
    setPreviewDisplay("none");
    setPreviewPhotoDisplay("none");
    setFileNameDisplay("none");
    setPreviewPhoto(undefined);
    setFileCross(false);
  };

  // Handle post submission
  const handlePostSubmit = async () => {
    if (text === null || text.trim() === "") return; // Prevent empty posts

    document.getElementById("PreLoaderBar").classList.remove("hide");
    document.getElementById("PreLoaderBar").classList.add("show"); // Show preloader on submission

    const response = await postText(text, file, UserDetails.UserID); // Submit post data

    setText(""); // Clear text after submission
    setFile(null);
    setPreviewDisplay("none");

    if (response === true) {
      fetchPosts().then((res) => { // Update posts after successful submission
        document.getElementById("PreLoaderBar").classList.remove("show");
        document.getElementById("PreLoaderBar").classList.add("hide");
      });
    } else {
      alert("Error posting your message"); // Handle submission errors
    }
  };

  // Handle file selection
  const handleFile = (e) => {
    const file = e.target.files[0]; // Select the first selected file

    setFile(file); // Set the selected file in state
    setFileCross(true); // Enable the file cross button for removal

    console.log(file.name); // Log the file name for debugging

    const fileSize = file.size / 1024 / 1024; // Calculate file size in MB

    if (fileSize > 10) {
      alert("File size exceeds 10MB. Please select a smaller file."); // Prevent large files
      return;
    }

    const reader = new FileReader(); // Initiate a FileReader to show preview

    if (file.type.startsWith("image/")) {
      reader.onload = function (e) {
        setPreviewDisplay("flex"); // Show the preview section
        setPreviewPhotoDisplay("block"); // Show the image preview
        setPreviewPhoto(e.target.result); // Set the image data URL for preview
      };

      // Handle file selection (continued)
      reader.onload = function (e) {
        setPreviewDisplay("flex"); // Show the preview section
        setPreviewPhotoDisplay("block"); // Show the image preview
        setPreviewPhoto(e.target.result); // Set the image data URL for preview
      };
      reader.readAsDataURL(file); // Read the selected file as data URL

    } else if (file.type.startsWith("video/")) {
      reader.onload = function (e) {
        var video = document.getElementById("preview-video");
        setVideoDisplay("block"); // Show the video preview
        video.src = e.target.result; // Set the video source URL
        video.controls = true; // Enable video controls
        setPreviewDisplay("flex"); // Show the preview section
        setPreviewPhotoDisplay("none"); // Hide the image preview (if any)
      };
      reader.readAsDataURL(file); // Read the selected file as data URL

    } else {
      console.log(file.name); // Log the file name for debugging (non-image/video files)
      setVideoDisplay("none"); // Hide the video preview (if any)
      setFileName(file.name); // Set the file name for display
      setPreviewDisplay("flex"); // Show the preview section
      setFileNameDisplay("block"); // Show the file name
      setPreviewPhotoDisplay("none"); // Hide the image preview (if any)
    }

  }
  // Conditional rendering based on posts availability
  if (posts.length === 0) {
    return (<div className="middle" id="middle">
      <div className='Loader-react'>
        <BeatLoader
          color='#0056b3'
        />
      </div>
    </div>)
  } else {
    return (
      <div className="middle" id="middle">
        <div className="preview" id="preview" style={{ display: `${previewDisplay}` }}>
          <img id="preview-photo" style={{ display: `${previewPhotoDisplay}` }} className="preview-photo" src={previewPhoto} />
          <video id="preview-video" style={{ display: `${videoDisplay}` }} className="preview-video"></video>
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

          <label style={{ padding: "10px" }} htmlFor="fileinput" className="btn"> <big>
            <i className='bx bx-paperclip bx-rotate-90'></i>

          </big>

          </label>
          <span style={{ margin: "0 10px" }}>

            {fileCross && <i onClick={handleFileCross} class='bx bx-x'></i>}
          </span>
          <input type="submit" onClick={handlePostSubmit} id="post-submit-btn" value="Post" className="btn btn-primary" />
        </form>

        {/* <!-- FEEDS --> */}
        <div className="feeds" id="feeds">
          {console.log("just before render", posts)}
          {posts.map((post, index) => {
            return (
              <div className="feed" key={index}>
                <PostCard post={post} setPosts={setPosts} />
              </div>
            );
          })}
          <div>
            <BeatLoader
              cssOverride={{ marginLeft: "47%" }}
              color='#0056b3'
            />
          </div>

        </div>
      </div>
    )
  }
}
export default Home