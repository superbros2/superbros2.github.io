import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import axios from 'axios';
import VueAxios from 'vue-axios'

//引入视频播放器
import 'video.js/dist/video-js.css'

const app = createApp(App);
app.use(VueAxios, axios)
app.use(router);
app.mount('#app');

