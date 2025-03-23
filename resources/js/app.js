import '../css/app.css';
import './bootstrap';

import axios from '@/boot/axios'; 

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { createPinia } from 'pinia'; // ✅ Import Pinia
import piniaPersist from 'pinia-plugin-persistedstate';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        axios.init();
        const app = createApp({ render: () => h(App, props) });
        const pinia = createPinia()
            .use(piniaPersist);
        return app
            .use(plugin)
            .use(ZiggyVue)
            .use(pinia) // ✅ Use Pinia
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
