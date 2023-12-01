import axios from 'axios';
import {MealRecord} from '../types/Diet';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
export const getMealsForDiet = async (token:String, dietId:String) => {
  try {
    const response = await axios.get(`${apiBaseUrl}api/v1/Diet/Meal/${dietId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: 'An unknown error occurred' };
    }
    throw new Error('An unknown error occurred');
  }
};

export const getMeals = async (token:String) => {

  try {
    const response = await axios.get(`${apiBaseUrl}api/v1/Diet/Meal/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: 'An unknown error occurred' };
    }
    throw new Error('An unknown error occurred');
  }
};

export const getDialyMeals = async (token:String) => {
  try {
    const response = await axios.get(`${apiBaseUrl}api/v1/Diet/DailyMeal/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: 'An unknown error occurred' };
    }
    throw new Error('An unknown error occurred');
  }
};

export const addDailyMeal = async (token:String, mealData:MealRecord) => {
  try {
    const response = await axios.post(`${apiBaseUrl}api/v1/Diet/DailyMeal/`, mealData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: 'An unknown error occurred' };
    }
    throw new Error('An unknown error occurred');
  }
};
