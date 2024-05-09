import React from 'react';

const Popup = ({ isOpen, title, onCancel, onConfirm }) => {
    return (
        <div className={`popup ${isOpen ? 'show' : ''}`}>
            <div className="popup-content">
                <label htmlFor="" className="text-bold">
                    {title}
                </label>
                <button className="formal-button" onClick={onCancel} id='noButton'>
                    No
                </button>
                <button className="formal-button" onClick={onConfirm} id='yesButton'>
                    Yes
                </button>
            </div>
        </div>
    );
};

export default Popup;
