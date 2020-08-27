import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../views/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/search/:searchText',
        name: 'MovieSearch',
        component: () =>
            import ( /* webpackChunkName: "movieSearch" */ '../views/MovieSearchView.vue')
    },
    {
        path: '/movie/:idMovie',
        name: 'MovieDetail',
        component: () =>
            import ( /* webpackChunkName: "movieDetail" */ '../views/MovieDetailView.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router