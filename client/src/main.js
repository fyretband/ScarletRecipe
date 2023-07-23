import './assets/main.css'

import { createApp,markRaw } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
// import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
}) 
app.use(pinia)
app.use(router)
// app.use(vue3GoogleLogin, {
//   clientId: '321060230869-hglvjdlb5elgu63l67psodnkpbh57og2.apps.googleusercontent.com'
// })

app.mount('#app')


