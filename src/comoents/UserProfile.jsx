import React, { useState, useEffect } from 'react';
import FileBase64 from 'react-file-base64';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UserProfile = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    Fullname: '',
    username: '',
    email: '',
    password: '',
    userImage: ''
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_ADMIN_BACKEND_URL}/user-profile/${id}`)
      .then(response => setProfile(response.data))
      .catch(error => console.error('Error fetching profile:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file) => {
    setProfile((prev) => ({ ...prev, userImage: file.base64 }));
  };

  const handleSave = () => {
    axios.put(`${process.env.REACT_APP_ADMIN_BACKEND_URL}/user-profile/${id}`, profile)
      .then(() => {
        setIsEditing(false);
        toast.success('Profile updated successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile.', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="profile-card w-[350px] rounded-2xl shadow-2xl overflow-hidden bg-white flex flex-col items-center p-6 gap-4 relative">
        <div className="avatar w-full flex items-center justify-center flex-col gap-2">
          <img 
            src={profile.userImage || "https://via.placeholder.com/150"} 
            alt="Profile Avatar" 
            className="w-32 h-32 border-4 border-white rounded-full object-cover" 
          />
          {isEditing && (
            <FileBase64 
              multiple={false} 
              onDone={handleImageUpload} 
            />
          )}
        </div>

        {!isEditing ? (
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">
              {profile.Fullname}
            </p>
            <p className="text-sm font-medium text-gray-500">
              {profile.username}
            </p>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>Email: {profile.email}</li>
            </ul>

            <button 
              onClick={() => setIsEditing(true)} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="w-full">
            <input 
              type="text" 
              name="Fullname" 
              value={profile.Fullname} 
              onChange={handleChange} 
              className="w-full mb-2 p-2 border rounded" 
              placeholder="Full Name" 
            />
            <input 
              type="text" 
              name="username" 
              value={profile.username} 
              onChange={handleChange} 
              className="w-full mb-2 p-2 border rounded" 
              placeholder="Username" 
            />
            <input 
              type="email" 
              name="email" 
              value={profile.email} 
              onChange={handleChange} 
              className="w-full mb-2 p-2 border rounded" 
              placeholder="Email" 
            />
            <input 
              type="password" 
              name="password" 
              value={profile.password} 
              onChange={handleChange} 
              className="w-full mb-4 p-2 border rounded" 
              placeholder="Password" 
            />

            <button 
              onClick={handleSave} 
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};
