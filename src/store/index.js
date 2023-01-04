import Vuex from 'vuex';
import auth from './modules/auth';
import stockSymbols from './modules/stockSymbols';
import theme from './modules/theme';

const store = new Vuex.Store({
    modules: {
        auth,
        theme,
        stockSymbols
    }
})

export default store;