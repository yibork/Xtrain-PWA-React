import React, { useEffect, useState } from 'react';

interface UserProfile {
  name: string;
  profilePicture: string;
  progress: number;
}

const ProfileSection: React.FC<{ progress: number }> = ({ progress }) => {
    const [userData, setUserData] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUserData = () => {
            const data = localStorage.getItem('UserDetails');
            if (data) {
                const user = JSON.parse(data);
                const formattedUserData: UserProfile = {
                    name: `${user.first_name} ${user.last_name}`,
                    profilePicture: user.picture,
                    progress: progress
                };
                setUserData(formattedUserData);
            }
        };

        fetchUserData();
    }, [progress]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-between p-4">
            <img src={userData.profilePicture} alt="profile" className="rounded-full h-16 w-16" />
            <div>
                <h2>Welcome back 👋</h2>
                <h1>{userData.name}</h1>
            </div>
            <div className="rounded-full bg-green-200 text-center">
                {userData.progress}%
            </div>
        </div>
    );
};

export default ProfileSection;
