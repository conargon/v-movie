import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // configuración
        baseUrl: "https://api.themoviedb.org/3",
        apiKey: "[PUT YOUR API KEY HERE]",
        imagesConfig: {
            base_url: "",
            secure_base_url: "",
            backdrop_sizes: [],
            logo_sizes: [],
            poster_sizes: [],
            profile_sizes: [],
            still_sizes: [],
        },
        // guarda indice de página del grid de búsqueda
        currentPage: Number,
        // flags de búsqueda
        searchMovies: Boolean,
        searchPeople: Boolean,
        searchTv: Boolean,        
    },
    mutations: {
        setImagesConfig(state, imagesConfig) {
            state.imagesConfig = imagesConfig;
        },        
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
    actions: {
        loadConfig: function(context) {
            const requestImagesConfig = axios.get(this.state.baseUrl + "/configuration?api_key=" + this.state.apiKey);
            axios.all([requestImagesConfig]).then(axios.spread((...responses) => {
                const responseImagesConfig = responses[0];
                let items = responseImagesConfig.data;
                context.commit("setImagesConfig", items.images);
            }))
            .catch(e => {
                console.log("==================> loadConfig: " + e)
                //this._vm.$emit('alert-event', { text: 'Error al solicitar datos al servidor:'+e, type: 'error' });
            })
        }
    },
    modules: {}
})