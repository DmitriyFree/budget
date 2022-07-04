import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import store from './store'
import components from '@/components'

Vue.config.productionTip = false

Vue.use(Vuelidate)

components.forEach(element => {
  Vue.component(element.name, element)
});

 new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
