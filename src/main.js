import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components/index'
// import Vuelidate from 'vuelidate'

const app = createApp(App)
app.use(store)
app.use(router)
// app.use(Vuelidate)

components.forEach(component => {
  app.component(component.name, component)
})

app.mount('#app')


