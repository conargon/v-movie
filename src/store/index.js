import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentPage: Number,
        searchMovies: Boolean,
        searchPeople: Boolean,
        searchTv: Boolean,
    },
    mutations: {
        setCurrentPage(state, page) {
            state.currentPage = page;
        },
        setSearchMovies(state, searchMovies) {
            state.searchMovies = searchMovies;
        },
        setSearchPeople(state, searchPeople) {
            state.searchPeople = searchPeople;
        },
        setSearchTv(state, searchTv) {
            state.searchTv = searchTv;
        },
    },
    actions: {},
    modules: {}
})