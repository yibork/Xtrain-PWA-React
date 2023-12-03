import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface FormData {
  username: string;
  email: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  role: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    role: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    if (e.target.type === 'file') {
      if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== 'confirmPassword') {
        formPayload.append(key, (formData as any)[key]);
      }
    });
    if (file) {
      formPayload.append('picture', file);
    }

    try {
      const response = await fetch('http://10.126.113.181:8000/api/v1/User/register/', {
        method: 'POST',
        body: formPayload, // formData is sent as FormData, not JSON
      });

      if (response.ok) {
        setSuccessMessage('Account successfully created!');
        toast.success('Account successfully created!', {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/login');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'An error occurred during registration.');
      }
    } catch (error) {
      setErrorMessage('An error occurred during registration.');
    }
  };

  const meta = {
    title: 'Sign up',
    // ... other meta configurations
  };

  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet {...meta} />
      </HelmetProvider>
      <div className="container mx-auto p-4">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-800">Sign up</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <div className="">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                type="text"
                name="username"
                id="username"
                placeholder="Enter your unique username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="first_name"
              >
                First Name
              </label>
              <input
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                type="text"
                name="first_name"
                id="first_name"
                placeholder="Enter your first name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="last_name"
              >
                Last Name
              </label>
              <input
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Enter your last name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="picture"
              >
                Picture
              </label>
              <input
                type="file"
                name="picture"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
            <div className="">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                type="email"
                name="email"
                id="email"
                placeholder="name@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="phone_number"
              >
                Phone Number
              </label>
              <input
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                type="tel"
                name="phone_number"
                id="phone_number"
                placeholder="06XXXXXXXX"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                type="password"
                name="password"
                id="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            {errorMessage && (
              <div className="text-red-500">{JSON.stringify(errorMessage)}</div>
            )}
            {successMessage && (
              <div className="text-green-500">{successMessage}</div>
            )}
            <button
              className="relative group block w-full py-3 px-5 text-center text-sm font-semibold overflow-hidden bg-blue-500 hover:bg-blue-600 rounded-xl text-white"
              type="submit"
            >
              <span className="relative">Sign up</span>
            </button>
            <span className="text-xs font-semibold text-gray-900 text-center">
              <span>Already have an account?</span>
              <a
                className="ml-1 inline-block text-blue-500 hover:text-blue-600"
                href="/login"
              >
                Log in
              </a>
            </span>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
