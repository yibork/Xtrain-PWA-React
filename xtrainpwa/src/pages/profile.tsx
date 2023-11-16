// ProfilePage.jsx
import React, { useState } from 'react';
import ProfileDetails from '../components/profile/ProfileDetails';
import EditProfile from '../components/profile/EditProfile';
import {UserProfile} from '../types/user';
import Footer from "../components/Navigation/Footer";
const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'yassine ibork',
    email: 'denialrozar@gmail.com',
    profilePicture: 'http://91.234.194.146/media/users/Yassine6_M6bbi7J.jpg',
    school: 'The Lawrenceville School',
    nickname: 'r.denial',
    emergencyContact: 'Jessica Curl',
    emergencyNumber: '+1-987654321',
  });

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const updateUserData = (newData:UserProfile) => {
    setUserData(newData);
  };

  return (
      <div>
    <div className="profile-page-container">
      {!isEditing ? (
        <ProfileDetails userData={userData} onEdit={toggleEdit} />
      ) : (
        <EditProfile userData={userData} onUpdate={updateUserData} onCancel={toggleEdit} />
      )}
    </div>
      <Footer/>
        </div>
  );
};

export default ProfilePage;

