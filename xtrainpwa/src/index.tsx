import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import DietsPage from "./pages/Diet";
import ProfilePage  from "./pages/profile";
import WorkoutPage from "./pages/workout";
import MealSuggestionPage from './components/nutrition/MealSuggestionPage';
import LoginPage from './pages/Login'; // Import the LoginPage component
import SetObjectivesPage from './components/Objectives/SetObjectivesPage';
import SignUp from './pages/Sign-up'; // Import the Signup component
import  MealDetail from './components/nutrition/MealDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// A function that checks if the user is authenticated
const isAuthenticated = () => {
  const token =  localStorage.getItem('authToken');
  return token !== null;
};

// @ts-ignore
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return children;
};
const hasSetObjectives = () => {
  const userObjectives = localStorage.getItem('userObjectives');
  return userObjectives !== null;
};
// @ts-ignore
const ObjectivesProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (!hasSetObjectives()) {
    return <Navigate to="/set-objectives" />;
  }

  return children;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/diet" element={<ObjectivesProtectedRoute><ProtectedRoute><DietsPage /></ProtectedRoute></ObjectivesProtectedRoute>} />
            <Route path="/meal-detail/:mealId" element={<MealDetail />} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/workout" element={<ProtectedRoute><WorkoutPage /></ProtectedRoute>} />
            <Route path="/meal-suggestions/:mealType" element={<ProtectedRoute><MealSuggestionPage /></ProtectedRoute>} />
            <Route path="/set-objectives" element={<ProtectedRoute><SetObjectivesPage /></ProtectedRoute>} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
reportWebVitals();
