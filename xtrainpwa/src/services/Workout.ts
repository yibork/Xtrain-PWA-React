import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const getWorkoutData = async (token:String) => {
    try {
        const response = await axios.get(`${apiBaseUrl}api/v1/Workout/Discipline/`, {
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
}