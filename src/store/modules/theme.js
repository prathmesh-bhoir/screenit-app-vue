

const theme = {
    state: {
        theme: 'light'
    },
    getters:{
        theme: (state) => state.theme
    },
    mutations: {
        setTheme(state, theme){
            state.theme = theme
        }
    },
    actions: {
        setTheme({commit}, theme){           
            commit('setTheme', theme);
        }
    }
}

export default theme;