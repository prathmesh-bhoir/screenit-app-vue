import Router from 'vue-router';
import LoginPage from '@/components/pages/LoginPage'
import SignupPage from '@/components/pages/SignupPage'
import HomePage from '@/components/pages/HomePage'
import ScreenPage from '@/components/pages/ScreenPage'
import WatchlistPage from '@/components/pages/WatchlistPage'
import PageNotFound from '@/components/PageNotFound'


const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'login',
            path: '/login',
            component: LoginPage,
            meta: { title: 'Login - Screenit-App' }
        },
        {
            name: 'signup',
            path: '/signup',
            component: SignupPage,
            meta: { title: 'Signup - Screenit-App' }
        },
        {
            name: 'home',
            path: '/',
            component: HomePage,
            meta: { title: 'Home - Screenit-App' }
        },
        {
            name: 'screen',
            path: '/screen/:name',
            component: ScreenPage,
        },
        {
            name: 'watchlist',
            path: '/watchlist',
            component: WatchlistPage,
            meta: { title: 'Watchlist - Screenit-App' }
        },
        {
            name: 'page-not-found',
            path: '*',
            component: PageNotFound,
            meta: { title: 'Screenit-App' }
        }
    ]
})

export default router;