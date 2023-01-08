import axios from "axios"

// const BASE_URL = process.env.BASE_URL_API
// const token = process.env.API_TOKEN

const token = "bv1uf4v48v6o5ed6h88g"
const BASE_URL = "https://finnhub.io/api/v1/"

export const getStock = async (stock) => {
    const response = await axios.get(`${BASE_URL}quote?symbol=${stock}&token=${token}`);

    return response.data;
}

export const getProfile = async ( stock ) => {
    const response = await axios.get(`${BASE_URL}stock/profile2?symbol=${stock}&token=${token}`);

    return response.data;
}