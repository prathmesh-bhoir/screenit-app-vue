import axios from "axios";
// import { NseIndia } from  "stock-nse-india";
// const  nseIndia = new  NseIndia();

const stockSymbols = {
    state: {
        symbols: ''
    },
    mutations: {
        setSymbols(state, symbols){
            state.symbols = symbols
        }
    },
    actions: {
        async getSymbols({commit}){
            const data = await axios.get('https://www.nseindia.com/');

            commit('setSymbols', data.symbols);
        }
    }
}

export default stockSymbols;