import Vuex from 'vuex';
import auth from './modules/auth';
import stockSymbols from './modules/stockSymbols';
import theme from './modules/theme';
import watchlist from './modules/watchlist';

const store = new Vuex.Store({
    modules: {
        auth,
        theme,
        stockSymbols,
        watchlist
    }
})

export default store;