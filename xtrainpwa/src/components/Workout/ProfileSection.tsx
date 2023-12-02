// components/ProfileSection.tsx
import React from 'react';

interface UserProfile {
  name: string;
  profilePicture: string;
  progress: number;
}

const ProfileSection: React.FC<UserProfile> = ({ name, profilePicture, progress }) => {
  return (
    <div className="flex items-center justify-between p-4">
      <img src={profilePicture} alt="profile" className="rounded-full h-16 w-16" />
      <div>
        <h2>Welcome back 👋</h2>
        <h1>{name}</h1>
      </div>
      <div className="rounded-full bg-green-200 text-center">
        {progress}%
      </div>
    </div>
  );
};

export default ProfileSection;
