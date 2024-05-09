import React from 'react'
import { useUserContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
const LeftSidebar = ({setIsThemeOpen}) => {
  const {UserDetails} = useUserContext()
  return (
    <div className="left">
      <Link to={`/${UserDetails.UserID}`} className="profile">
        <div className="profile-photo">
          <img src={UserDetails.UserDp}
            // onerror="this.src='https://cdn.pixabay.com/photo/2022/02/26/18/16/peace-7036144_640.png'" 
            />
        </div>
        <div className="handle">
          <h4>{ UserDetails.UserName }</h4>
          <p className="text-muted">@{ UserDetails.UserHandle }</p>
        </div>
      </Link>
      <div className="sidebar">
        <Link to={"/"} className="menu-item active"><span><i className="uil uil-home"></i></span>
          <h3>Home</h3>
          <p className="text-muted">Home</p>
        </Link>
        <Link to={"/search"} className="menu-item"><span><i className="uil uil-compass"></i></span>
          <h3>Search</h3>
          <p className="text-muted">Search</p>
        </Link>
        {/* <!-- <a href="/notification" className="menu-item" id="notifications"><span><i
              className="uil uil-bell"
            > <small className="notification-count"></small></i></span>
          <h3>Notifications</h3>

        </a> --> */}
        <Link to={"/notification"} className="menu-item" id="notifications"><span><i className="uil uil-bell"></i></span>
          <h3>Notifications</h3>
          <p className="text-muted">Notify</p>
        </Link>
        <Link to={"/message"} className="menu-item" id="messages-notification"><span><i
          className="uil uil-envelope-alt"></i></span>
          <h3>Messages</h3>
          <p className="text-muted">Chats</p>
        </Link>
        <Link to={"/save"} className="menu-item"><span><i className="uil uil-bookmark"></i></span>
          <h3>Bookmarks</h3>
          <p className="text-muted">Saves</p>
        </Link>

        <Link onClick={(e)=>setIsThemeOpen(true)} className="menu-item" id="theme"><span><i className="uil uil-palette" ></i></span>
          <h3>Theme</h3>
          <p className="text-muted">Theme</p>
        </Link>
        <Link to={"/settings"} className="menu-item" ><span><i
          className="uil uil-setting"></i></span>
          <h3>Settings</h3>
          <p className="text-muted">Settings</p>
        </Link>
      </div>
    </div>
  )
}

export default LeftSidebar