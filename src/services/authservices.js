import axios from 'axios';
const BASE_URL = 'https://linked-posts.routemisr.com';

export async function registerApi(formData) {
    try {
        const { data } = await axios.post(BASE_URL + "/users/signup", formData);
        return data;
    }
    catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            throw new Error(error.response.data.message || 'Registration failed');
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('No response from server. Please try again later.');
        } else {
            // Something else happened while setting up the request
            throw new Error('An unexpected error occurred. Please try again.');
        }
    }
}