import axios from "axios"


export const getStock = async (stock) => {
    const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=bv1uf4v48v6o5ed6h88g`)

    return response.data;
}