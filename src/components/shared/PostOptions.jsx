import React, { useState } from 'react';
import { useUserContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Popup from './Popup'; // Assuming Popup component handles confirmation
import { deletePost, getPosts, sharePost } from '../../lib/api/api';

export const PostOptions = ({ post,setPosts }) => {
    const { UserDetails } = useUserContext();
    const [isOpen, setIsOpen] = useState(false);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null); // Store post ID for deletion
    const [postToDelete, setPostToDelete] = useState(null)

    const handleOpenPopup = (id, e) => {
        setIsPopupOpen(true);
        setPostIdToDelete(id); // Capture ID of the post to be deleted
        setPostToDelete(e)
    };

    const handleConfirm = () => {
        if (postIdToDelete) {
            document.getElementById("PreLoaderBar").classList.remove("hide");
            document.getElementById("PreLoaderBar").classList.add("show");
            deletePost(postIdToDelete, postToDelete).then(async(res) => {
                const data = await getPosts()
                console.log(data)
                setPosts(data)
                setIsOpen(false)
                document.getElementById("PreLoaderBar").classList.remove("show");
                document.getElementById("PreLoaderBar").classList.add("hide");
            })
            setIsPopupOpen(false);
            setPostIdToDelete(null);

        } else {
            console.error('No post ID found for deletion'); // Handle potential errors
        }
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
        setPostIdToDelete(null); // Clear state if canceled
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <span className="dropdown edit">
            <i onClick={toggleDropdown} className="dropbtn uil uil-ellipsis-h"></i>
            {isOpen && (
                <div id={`myDropdown-${post._id}`} className="dropdown-content">
                    {post.UserDetails.UserID === UserDetails.UserID && (
                        <Link onClick={(e) => handleOpenPopup(post._id, e)}>Delete</Link>
                    )}
                    <Link href={`/comment/${post._id}`}>Comment</Link>
                    <Link href={`/${UserDetails.UserID}`}>Profile</Link>
                </div>
            )}
            <Popup
                isOpen={isPopupOpen}
                title="Delete Post Permanently?"
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </span>
    );
};

export const SharePostDropdown = ({ post }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <span className="dropdown edit">
            <i onClick={toggleDropdown} className="dropbtn uil uil-share-alt"
                style={{ color: "rgb(104, 49, 192)" }}></i>
            {
                isOpen && (
                    <div id="shareDropdown-{{this._id}}" className="dropdown-content-share">
                        <a onClick={(e) => sharePost(post._id, 'linkedin')} target="_blank"><i className='bx bxl-linkedin-square'
                            style={{ borderRadius: "50%" }}></i></a>
                        <a onClick={(e) => sharePost(post._id, 'twitter')} target="_blank"><i className='bx bxl-twitter'
                            style={{ borderRadius: "50%" }}></i></a>
                        <a onClick={(e) => sharePost(post._id, 'whatsapp')} target="_blank"><i className='bx bxl-whatsapp-square'
                            style={{ borderRadius: "50%" }}></i></a>
                        <a onClick={(e) => sharePost(post._id, 'facebook')} target="_blank"><i
                            className='bx bxl-facebook-circle'></i></a>
                        <a onClick={(e) => sharePost(post._id, 'instagram')} target="_blank"><i className='bx bxl-instagram-alt'
                            style={{ borderRadius: "50%" }}></i></a>
                    </div>
                )
            }

        </span>
    )
}