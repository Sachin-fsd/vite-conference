import React from 'react'
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/AuthContext'
import { formatText } from '../../lib/utils';
import { likePost, savePost } from '../../lib/api/api';
import { PostOptions, SharePostDropdown } from './PostOptions';

const PostCard = ({ post,setPosts }) => {
  const { UserDetails } = useUserContext();

  return (
    <>
      <div className="head">
        <Link to={`/${post.UserDetails.UserID}`}>
          <div className="user">
            <div className="profile-photo">
              <img
                src={post.UserDetails.UserDp}
                //   onerror={
                //     (this.src =
                //       "https://cdn.pixabay.com/photo/2022/02/26/18/16/peace-7036144_640.png")
                //   }
                alt=""
              />
            </div>
            <div className="info">
              <h3>{post.UserDetails.UserName}</h3>
              <small>{post.CreatedAt}</small>
            </div>
          </div>
        </Link>

        <PostOptions
          post={post}
          setPosts={setPosts}
        />

      </div>
      <Link to={`/comment/${post._id}`}>
        <div className="photo">
          <p className="post-text">{formatText(post.text)}</p>
          {post.photo && (
            <img
              alt=""
              src={post.photo}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          {post.video && (
            <video
              width=""
              height=""
              controls
              src={post.video}
              onError={(e) => {
                e.target.style.display = "none";
              }}
              className="preview-video"
            ></video>
          )}
          {post.pdf && (
            <div
              id="pdf-loader"
              style={{
                width: "100%",
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>Loading PDF...</p>
            </div>
          )}
          {post.pdf && (
            <iframe
              title="id"
              id="pdf-preview"
              src={`http://docs.google.com/gview?url=${post.pdf}&embedded=true`}
              style={{ width: "100%", height: 400, display: "none" }}
              onLoad={(e) => {
                document.getElementById("pdf-loader").style.display =
                  "none";
                e.target.style.display = "block";
              }}
            ></iframe>
          )}
          {post.pdf && (
            <a href={post.pdf} download>
              Download PDF
            </a>
          )}

        </div>
      </Link>

      <div className="action-buttons">
        <div className="interaction-buttons">
          <span
            className="like-post"
            onClick={(event) =>
              likePost(event, post._id, post.UserDetails.UserID)
            }
          >
            {post.liked === 1 ? (
              <i className="bx bxs-like" style={{ color: "#f54a6c" }}></i>
            ) : (
              <i className="bx bx-like" style={{ color: "#f54a6c" }}></i>
            )}
          </span>
          <span>
            <Link to={`/comment/${post._id}`}>
              <i
                className="uil uil-comment-dots"
                style={{ color: "rgb(51, 100, 51)" }}
              ></i>
            </Link>
          </span>
          <SharePostDropdown post={post} />
        </div>
        <div className="bookmark">
          <span>
            {(post.saved == 1) ?
              (<i className='bx bxs-bookmark' onClick={(e) => { savePost(e, post._id, post.authorID) }} style={{ color: "#6a3bec" }}></i>)
              : (<i className='bx bx-bookmark' style={{ color: "#6a3bec" }} onClick={(e) => { savePost(e, post._id, post.authorID) }}></i>)}
          </span>
        </div>
      </div>

      <div className="caption">
        <p>
          <b>{post.UserDetails.UserSchool}</b> | {post.UserDetails.UserCourse} |<b> Section </b> {post.UserDetails.UserSection} |<b> Roll No. </b>
          {post.UserDetails.UserRollno}
        </p>

      </div>
      <Link to={`/comment/${post._id}`}>
        <div className="comments text-muted">View all comments</div>
      </Link>
    </>

  )
}

export default PostCard