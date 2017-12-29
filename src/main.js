// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from  './store'
import router from './router'
import Vuetify from 'vuetify'

Vue.use(Vuetify);
Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  store,
  router,
   template: '<App/>',
  components: { App }
});

