
import './bootstrap';

import axios from '@/plugins/axios'; 

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { createPinia } from 'pinia'; 
import piniaPersist from 'pinia-plugin-persistedstate';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import vuetify from './plugins/vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue';
import '../css/app.css';

dayjs.extend(relativeTime);

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App: InertiaApp, props, plugin }) {
        axios.init();
        const app = createApp({ render: () => h(App, { InertiaApp, props }) });
        const pinia = createPinia()
            .use(piniaPersist);
        return app
            .use(plugin)
            .use(ZiggyVue)
            .use(pinia)
            .use(vuetify)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
