import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const loginUser = async (email, password) => {
    try {
        console.log("API_URL", API_URL);
        const { data } = await axios.post(`${API_URL}/login`, { email, password });
        console.log("resp", data);
        return data; // Success response
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
        return {
            status: 500,
            data: { message: "Network error or server is unreachable" },
        };
    }
};

export const registerUser = async (username, email, password) => {
    try {
        const { data } = await axios.post(`${API_URL}/register`, { username, email, password });
        return data;
        
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
        return {
            status: 500,
            data: { message: "Network error or server is unreachable" },
        };
        
    }
}