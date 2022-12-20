import Router from 'vue-router';
import LoginPage from '@/components/pages/LoginPage'
import SignupPage from '@/components/pages/SignupPage'
import HomePage from '@/components/pages/HomePage'
import ScreenPage from '@/components/pages/ScreenPage'


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
        },
        {
            name: 'screen',
            path: '/screen/:name',
            component: ScreenPage
        }
    ]
})

export default router;