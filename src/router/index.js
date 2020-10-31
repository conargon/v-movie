import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('../views/Home.vue')
    },
    {
        path: '/search/:searchText/:searchKey',
        name: 'Search',
        component: () =>
            import ('../views/SearchView.vue')
    },
    {
        path: '/movie/:idMovie',
        name: 'MovieDetail',
        component: () =>
            import ('../views/MovieDetailView.vue')
    },
    {
        path: '/tv/:idSerieTv',
        name: 'TvDetail',
        component: () =>
            import ('../views/TvDetailView.vue')
    },
    {
        path: '/people/:type/:idPeople',
        name: 'PeopleDetail',
        component: () =>
            import ('../views/PeopleDetailView.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router