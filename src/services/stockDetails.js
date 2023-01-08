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

export const getNews = async (stock) => {
    const date = new Date()
    const fromDate = new Date(date);
    fromDate.setDate(fromDate.getDate() - 1)

    let day = date.getDate();
    let month = date.getMonth() + 1;
    if(day<10){
        day = `0${day}`
    }
    if(month<10){
        month = `0${month}`
    }
    let year = date.getFullYear();

    let fromDay = fromDate.getDate();
    let fromMonth = fromDate.getMonth() + 1;
    if(fromDay<10){
        fromDay = `0${fromDay}`
    }
    if(fromMonth<10){
        fromMonth = `0${fromMonth}`
    }
    let fromYear = fromDate.getFullYear();

    let today = `${year}-${month}-${day}`;
    let yesterday = `${fromYear}-${fromMonth}-${fromDay}`
    const response = await axios.get(`${BASE_URL}/company-news?symbol=${stock}&from=${yesterday}&to=${today}&token=${token}`);

    return response.data;
}