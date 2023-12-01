// Function to get user info using the token
import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const getUserInfo = async (token:String) => {
  try {
    const response = await axios.get(`${apiBaseUrl}api/v1/User/info/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Handle errors as appropriate for your application
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: 'An unknown error occurred' };
    }
    throw new Error('An unknown error occurred');
  }
};

export const getCalorieIntakeData = async (token:String) => {
  try {
    const response = await axios.get(`${apiBaseUrl}api/v1/User/day-macros/`, {
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

export const getDayWeights = async (token:String) => {
  try {
    const response = await axios.get(`${apiBaseUrl}api/v1/User/day-weights/`, {
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
