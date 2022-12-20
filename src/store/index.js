import Vuex from 'vuex';
import stockSymbols from './modules/stockSymbols';
import theme from './modules/theme';

const store = new Vuex.Store({
    modules: {
        theme,
        stockSymbols
    }
})

export default store;