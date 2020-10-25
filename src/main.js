/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.prototype.$http = Axios;

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
