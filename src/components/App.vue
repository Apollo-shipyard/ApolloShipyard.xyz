<template>
  <div id="app">
    <vue-progress-bar />
    <router-view />
    <go-top />
  </div>
</template>

<script>
import i18n from '@Utils/Vue/i18n.js';
import GoTop from './GoTop.vue';

export default {
    name: 'App',
    components: { GoTop },
    i18n,
    metaInfo() {
        return {
            htmlAttrs: {
                lang: this.$i18n.locale,
            },
        };
    },
    created() {
        // статус-бар
        this.$Progress.start();
        this.$router.beforeEach((to, from, next) => {
            if (to.meta.progress !== undefined) {
                const meta = to.meta.progress;
                this.$Progress.parseMeta(meta);
            }
            this.$Progress.start();
            next();
        });
        this.$router.afterEach(() => {
            this.$Progress.finish();
        });
    },
};
</script>


