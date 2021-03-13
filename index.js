import Vue from 'vue';

import VueProgressBar from 'vue-progressbar';
import VueGtag from 'vue-gtag';

import App from './src/components/App.vue';
import router from './src/js/Vue/router.js';

import './src/css/style.scss';

Vue.config.productionTip = false;

Vue.use(VueGtag,
    { config: { id: 'G-BCPM07DZH8' } },
    router,
);

Vue.use(VueProgressBar, {
    color: '#345b66',
    failedColor: '#874b4b',
    thickness: '3px',
    transition: {
        speed: '0.2s',
        opacity: '0.2s',
        termination: 300,
    },
    autoRevert: true,
    location: 'top',
    inverse: false,
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');

