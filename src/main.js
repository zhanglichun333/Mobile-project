import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router/index'
import touch from 'vue-directive-touch'
Vue.use(touch)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
