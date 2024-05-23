import React, { useEffect, useState } from 'react'
import { getContacts } from '../../lib/api/api'
import { useUserContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import UserCard from './UserCard'
import ClipLoader from "react-spinners/ClipLoader";

const RightSidebar = () => {
  const { UserDetails } = useUserContext()
  const [contacts, setContacts] = useState({ messages: null, users: null });

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getContacts();
      setContacts(data);
    };

    fetchContacts();
  }, []);
  const { messages, users } = contacts
  if (!messages && !users) {
    return 

  } else {
    return (
      <div className="right">
        {/* <!-- MESSAGES --> */}
        <div className="messages">
          <div className="heading">
            <h4>Messages</h4>
            <i className="uil uil-edit"></i>
          </div>
          {/* <!-- SEARCH BAR --> */}
          <div className="search-bar">
            <i className="uil uil-search"></i>
            <input type="search" id="message-search" placeholder="Search messages" />
          </div>

          {/* <!-- MESSAGE --> */}
          {messages.map((message, index) => {
            const dp = (message.sender.UserID == UserDetails.UserID) ? message.receiver.UserDp : message.sender.UserDp;
            const id = (message.sender.UserID == UserDetails.UserID) ? message.receiver.UserID : message.sender.UserID;
            const name = (message.sender.UserID == UserDetails.UserID) ? message.receiver.UserName : message.sender.UserName
            const user = { id, dp, name }
            return (
              <div className="message" key={index}>
                <UserCard user={user} />
              </div>)
          }
          )}
          
          <p className="text-muted">New Users</p>
          {users.map((user, index) => (
            <div className="message" key={index}>
              <UserCard user={user}/>
            </div>
          ))}
        </div>

        <div className="friend-requests">
          <h4>Requests</h4>
          <p className="text-muted">No requests at the moment</p>
        </div>
      </div>
    )
  }
}

export default RightSidebar