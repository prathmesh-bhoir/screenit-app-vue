import Router from 'vue-router';
import LoginPage from '@/components/pages/LoginPage'
import SignupPage from '@/components/pages/SignupPage'
import HomePage from '@/components/pages/HomePage'


const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'login',
            path: '/login',
            component: LoginPage
        },
        {
            name: 'signup',
            path: '/signup',
            component: SignupPage,
        },
        {
            name: 'home',
            path: '/',
            component: HomePage
        }
    ]
})

export default router;