import { socket } from '@/socket';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.config.globalProperties.$api_url = `${process.env.VUE_APP_API_DOMAIN}/api`;
app.config.globalProperties.$socket = socket;

app.mount('#app');
