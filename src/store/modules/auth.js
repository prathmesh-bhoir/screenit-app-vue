import { login } from "@/services/auth";

const KEY_NAME = 'name'
const KEY_EMAIL = 'email'
const KEY_TOKEN = 'token'

const auth = {
        state: {
            token: localStorage.getItem( KEY_TOKEN ) || '',
            email: localStorage.getItem( KEY_EMAIL ) || '',
            name: localStorage.getItem( KEY_NAME ) || '',
        },
        getters: {
            userEmail: (state) => state.email,
        },
        mutations: {
            setToken(state, token){
                state.token = token
            },
            setEmail(state, email){
                state.email = email
            },
            setName(state, name){
                state.name = name
            }
        },
        actions: {
            async login({commit}, userDetails){
                const data = await login(userDetails);

                const { token, email, name} = data;

                localStorage.setItem(KEY_TOKEN, token);
                localStorage.setItem(KEY_EMAIL, email);
                localStorage.setItem(KEY_NAME, name)

                commit('setToken', token);
                commit('setEmail', email);
                commit('setName', name);

            }
        }
}


export default auth;