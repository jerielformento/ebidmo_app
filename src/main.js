

import { createApp } from 'vue';
import router from './router'
import App from './App.vue'
import './assets/style.css'
import store from './store'
import CKEditor from '@ckeditor/ckeditor5-vue';
import vue3GoogleLogin from 'vue3-google-login';
const CLIENT_ID = "505332094923-gadsrivrtqccg50s1snhpce5sso3og2t.apps.googleusercontent.com";

createApp(App)
    .use(vue3GoogleLogin, {
        clientId: CLIENT_ID,
    })
    .use(CKEditor)
    .use(router)
    .use(store)
    .mount('#ebm-app') 