import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
// materializeCss
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.js'
import 'material-design-icons/iconfont/material-icons.css'

Vue.config.productionTip = false

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')