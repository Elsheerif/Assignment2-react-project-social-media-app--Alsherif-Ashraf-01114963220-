import axios from 'axios';
const BASE_URL = 'https://linked-posts.routemisr.com';

export async function registerApi(formData) {
    try {
        const { data } = await axios.post(BASE_URL + "/users/signup", formData);
        return data;
    }
    catch (error) {
        return error.response.data;
    }
}

export async function LoginApi(formData) {
    try {
        const { data } = await axios.post(BASE_URL + "/users/signin", formData);
        return data;
    }
    catch (error) {
        return error.response.data;
    }
}