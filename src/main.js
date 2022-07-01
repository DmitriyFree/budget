import Vue from 'vue'
import App from './App.vue'
import store from './store'
import components from '@/components'

Vue.config.productionTip = false

components.forEach(element => {
  Vue.component(element.name, element)
});

 new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
