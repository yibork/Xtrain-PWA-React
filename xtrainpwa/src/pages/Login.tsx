import React, { useState, FormEvent } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom'; // If you're using react-router
import { login } from '../services/Login';
import {LoginResponse} from '../types/user';

// Define a type for the form state
type FormState = {
  username: string;
  password: string;
};

// Define a type for the meta information
type MetaProps = {
  title: string;
  description: string;
};

const LoginPage = () => {
  const [formState, setFormState] = useState<FormState>({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(''); // Reset previous errors
    try {
      const data : LoginResponse = await login(formState.username, formState.password);
      console.log(data);
      localStorage.setItem('authToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      navigate('/profile'); // Adjust the route as needed
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const meta: MetaProps = {
    title: "Fixi | Sign In",
    description: "Sign in to access your account.",
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
      </HelmetProvider>
      <section className="overflow-hidden py-12">
        <div className="container px-4 mx-auto">
          <h3 className="font-heading text-gray-900 font-semibold mb-4 text-xl text-center">
            Sign in to your account
          </h3>
                    <div className="space-y-4 mb-6">
            <a
              className="inline-flex w-full items-center justify-center border border-gray-200 transition duration-100 hover:text-blue-500 hover:border-blue-500 rounded-xl text-sm py-2 px-4 gap-x-2 text-gray-400 font-medium rounded-full"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="#0866ff"
                className="bi bi-facebook w-4 h-4"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
              <span className="">Login with Facebook</span>
            </a>
            <a
              className="inline-flex w-full items-center justify-center border border-gray-200 transition duration-100 hover:text-blue-500 hover:border-blue-500 rounded-xl text-sm py-2 px-4 gap-x-2 text-gray-400 font-medium rounded-full"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height={24}
                viewBox="0 0 24 24"
                width={24}
                className="bi bi-facebook w-4 h-4"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              <span className="">Login with Google</span>
            </a>

          </div>

          <div className="flex mb-6 items-center">
            <div className="w-full h-px bg-gray-300" />
            <span className="mx-4 text-sm font-semibold text-gray-500">Or</span>
            <div className="w-full h-px bg-gray-300" />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-y-6">
            <div className="">
              <label
                className="block mb-1.5 text-sm text-gray-900 font-semibold"
                htmlFor="username"
              >
                Email
              </label>
              <input
                id="username"
                name="username"
                className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                type="text"
                placeholder="name@email.com"
                value={formState.username}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <div className="flex mb-1.5 items-center justify-between">
                <label
                  className="block text-sm text-gray-900 font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  className="inline-block text-xs font-semibold text-blue-500 hover:text-blue-600"
                  href="#"
                >
                  Forget password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                  type="password"
                  placeholder="********"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block hover:scale-110 transition duration-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 text-gray-400 hover:text-blue-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <button
              className="relative group block w-full py-3 px-5 text-center text-sm font-semibold overflow-hidden bg-blue-500 hover:bg-blue-600 rounded-xl text-white"
              type="submit"
            >
              <span className="relative">Login</span>
            </button>
            <span className="text-xs font-semibold text-gray-900 text-center">
              <span>Don’t have an account?</span>
              <a
                className="ml-1 inline-block text-blue-500 hover:text-blue-600"
                href="/signup"
              >
                Sign up
              </a>
            </span>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
