import axios from 'axios';
import {LoginResponse} from '../types/user';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;


export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${apiBaseUrl}api/v1/User/login/`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: 'An unknown error occurred' };
    }
    throw new Error('An unknown error occurred');
  }
};
