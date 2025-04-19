
import './bootstrap';

import axios from '@/plugins/axios'; 

import { createInertiaApp, router } from '@inertiajs/vue3';
import { useAppStore } from '@/stores/app';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { createPinia } from 'pinia'; 
import piniaPersist from 'pinia-plugin-persistedstate';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import vuetify from './plugins/vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
//import 'vue3-dropzone/dist/vue3Dropzone.min.css';
import App from './App.vue';
import '../css/app.css';

dayjs.extend(relativeTime);

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./modules/${name}.vue`,
            import.meta.glob('./modules/\*\*/pages/\*.vue'),
        ),
    setup({ el, App: InertiaApp, props, plugin }) {
        axios.init();
        let app = createApp({ render: () => h(App, { InertiaApp, props }) });
        //app.config.devtools = true;
        const pinia = createPinia()
            .use(piniaPersist);
        app = app.use(plugin)
            .use(ZiggyVue)
            .use(pinia)
            .use(vuetify)
        router.on('before', () => {
            let appStore = useAppStore();
            tabStore.breadcrumbs = [];
        });
        return app.mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
