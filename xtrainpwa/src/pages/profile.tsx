import React, { useState, useEffect } from 'react';
import ProfileDetails from '../components/profile/ProfileDetails';
import EditProfile from '../components/profile/EditProfile';
import Footer from "../components/Navigation/Footer";
import { getUserInfo } from '../services/User';
import { UserProfile } from '../types/user';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const data = await getUserInfo(token);
          data.picture = process.env.REACT_APP_API_BASE_URL + data.picture;
          setUserData(data);
          localStorage.setItem('UserDetails', JSON.stringify(data));
        } else {
        }
      } catch (error) {
        console.error('There was a problem fetching user data:', error);
        // Implement error handling logic here
      }
    };

    fetchUserData();
  }, []);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const updateUserData = (newData: UserProfile) => {
    setUserData(newData);
    toggleEdit();
  };



  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page-container">


      {!isEditing ? (
        <ProfileDetails userData={userData} onEdit={toggleEdit} />
      ) : (
        <EditProfile userData={userData} onUpdate={updateUserData} onCancel={toggleEdit} />
      )}
      <Footer />
    </div>
  );
};

export default ProfilePage;
