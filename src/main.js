import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// materializeCss
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import 'material-design-icons/iconfont/material-icons.css'

// swiper (carousel)
import 'swiper/css/swiper.min.css'

// custom
import './css/estilos.css';

Vue.config.productionTip = false

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')