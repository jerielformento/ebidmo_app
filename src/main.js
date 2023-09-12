

import { createApp } from 'vue';
import router from './router'
import App from './App.vue'
import './assets/style.css'
import store from './store'
import CKEditor from '@ckeditor/ckeditor5-vue';
import vue3GoogleLogin from 'vue3-google-login';
const CLIENT_ID = "505332094923-gadsrivrtqccg50s1snhpce5sso3og2t.apps.googleusercontent.com";
import VueSocialSharing from 'vue-social-sharing'
import { createHead } from "@vueuse/head"

const head = createHead()

// Vuetify
/* import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
}) */

createApp(App)
    .use(vue3GoogleLogin, {
        clientId: CLIENT_ID,
    })
    .use(CKEditor)
    .use(router)
    .use(store)
    .use(head)
    .use(VueSocialSharing)
    .mount('#ebm-app') 