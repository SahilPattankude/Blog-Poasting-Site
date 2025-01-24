import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from "../images/blog/IMG-20241203-WA0005[1].jpg"
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";



function UserProfile() {
    const [avatar, setAvatar] = useState(Avatar);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('')
    const [currentPassword,setCurrentPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
  
    return (
      <section className="user-profile">
        <div className="profile-container">
          <Link to={`/myposts/sx`} className="posts-link">My posts</Link>
          <div className="profile-info">
            <div className="avatar-section">
              <div className="avatar-container">
                <img src={Avatar} alt="User Avatar" className="avatar-image" />
              </div>
              <form className="avatar-form">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  onChange={e => setAvatar(e.target.files[0])}
                  accept='jpg , png '
                  className="file-input"
                />
                <label htmlFor="avatar" className="edit-icon">
                  <FaEdit />
                </label>
              </form>
              {/* <button className="save-button">
                <FaCheck /> */}
              {/* </button> */}
            </div>
            <h1 className="user-name">Sahil Pattankude</h1>

            <form >
                {/* <p>This is an error message</p> */}
                <input type="text"placeholder='Full Name' value={name} onChange={e=> setName(e.target.value)} />
                <input type="email"placeholder='Email' value={email} onChange={e=> setEmail(e.target.value)} />
                <input type="password"placeholder='Current Password' value={currentPassword} onChange={e=> setCurrentPassword(e.target.value)} />
                <input type="password"placeholder='New Password ' value={newPassword} onChange={e=> setNewPassword(e.target.value)} />
                <input type="password"placeholder='Confirm Password' value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)} />
            </form>
            <button type='submit'>Update details</button>
          </div>
        </div>
      </section>
    );
  }
  

export default UserProfile
