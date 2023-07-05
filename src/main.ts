import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCodeHighlight from 'vue-code-highlight';
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueCodeHighlight)

app.mount('#app')
