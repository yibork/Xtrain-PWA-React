// EditProfile.tsx
import React, { useState } from 'react';
import { UserProfile } from '../../types/user';

interface EditProfileProps {
  userData: UserProfile;
  onUpdate: (newData: UserProfile) => void;
  onCancel: () => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ userData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState<UserProfile>(userData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onUpdate(formData);
    onCancel(); // Close edit form
  };


  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
        />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePicture">
            Profile Picture
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="profilePicture"
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
        />
        </div>
      {/* Repeat the above block for each field */}
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Update Profile
        </button>
        <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );

};

export default EditProfile;
