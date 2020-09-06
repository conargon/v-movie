import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        srcImagePreview: String,
        currentPage: Number
    },
    mutations: {
        setSrcImagePreview(state, src) {
            state.srcImagePreview = src;
        },
        clearSrcImagePreview(state) {
            state.srcImagePreview = "";
        },
        setCurrentPage(state, page) {
            state.currentPage = page;
        }
    },
    actions: {},
    modules: {}
})