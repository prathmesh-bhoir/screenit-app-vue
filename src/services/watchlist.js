import axios from "axios";
import { BASE_URL, TOKEN } from "./utils/config";

export const getWatchlist = async () => {
    const response = await axios.get(`${BASE_URL}/watchlist`,
    { headers: 
        { 
        Authorization: TOKEN,
        } 
    }
    );

    return response.data;
}

export const addToList = async (stock) => {
    const req = {
        method: 'patch',
        url: `${BASE_URL}/watchlist/add?stock=${stock}`,
        headers: {
            Authorization: TOKEN,
        },
    };
    const response = await axios(req);
    // const response = await axios.patch(`${BASE_URL}/watchlist/add?stock=${stock}`,
    // { headers: 
    //     { 
    //         Authorization: TOKEN,
    //     }  
    // });

    return response.data;
}

export const delFromList = async (stock) => {
    const req = {
        method: 'patch',
        url: `${BASE_URL}/watchlist/del?stock=${stock}`,
        headers: {
            Authorization: TOKEN,
        },
    };
    const response = await axios(req);
    
    return response.data;
}