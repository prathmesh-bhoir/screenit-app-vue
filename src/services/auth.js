import axios from "axios";
import { BASE_URL } from "./utils/config";

export const register = async (userData) => {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData)

    return response.data
}

export const login = async (userData) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, userData)

    return response.data
}