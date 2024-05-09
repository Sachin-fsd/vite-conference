import React from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({user}) => {
    return (
        <>
            <div className="profile-photo">
                <img
                    src={user.dp} />
            </div>
            <div className="message-body">
                <Link to={`/chat/${user.id}`}
                    className="profile users-profile">
                    <h5>{user.name}</h5>
                    <p className="text-muted">in your chats</p>
                </Link>
            </div>
        </>
    )
}

export default UserCard