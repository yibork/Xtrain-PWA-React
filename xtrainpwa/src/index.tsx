import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import DietsPage from "./pages/Diet";
import ProfilePage  from "./pages/profile";
import WorkoutPage from "./pages/workout";
import MealSuggestionPage from './components/nutrition/MealSuggestionPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diet" element={<DietsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/workout" element={<WorkoutPage />} />
            <Route path="/meal-suggestions/:mealType" element={<MealSuggestionPage />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
