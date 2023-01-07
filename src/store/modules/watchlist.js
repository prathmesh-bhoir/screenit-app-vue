import { getWatchlist } from "@/services/watchlist";

const KEY_WATCHLIST = 'watchlist'

const watchlist = {
    state: {
        watchlist: localStorage.getItem( KEY_WATCHLIST ) || []
    },
    getters:{
        watchlist: (state) => state.watchlist
    },
    mutations: {
        setWatchlist(state, watchlist){
            state.watchlist = watchlist
        }
    },
    actions: {
        async getWatchlist({commit}){ 
            const data = await getWatchlist()
            
            const watchlist  = data.data;

            localStorage.setItem(KEY_WATCHLIST, watchlist)

            commit('setWatchlist', watchlist);

            return watchlist
        }
    }
}

export default watchlist;