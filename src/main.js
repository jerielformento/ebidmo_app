

import { createApp } from 'vue';
import router from './router'
import App from './App.vue'
import './assets/style.css'
import store from './store'
import CKEditor from '@ckeditor/ckeditor5-vue';

createApp(App)
    .use(CKEditor)
    .use(router)
    .use(store)
    .mount('#ebm-app') 