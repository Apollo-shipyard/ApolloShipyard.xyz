<template>
  <div id="app">
    <vue-progress-bar />
    <!--    <the-header/>-->
    <router-view />

    <a
      v-show="showBtnTop"
      id="btn-top"
      href="#"
    />
  </div>
</template>

<script>
import i18n from '@Utils/Vue/i18n.js';
// import TheHeader from './TheHeader';

export default {
    i18n,
    name: 'App',
    // components: {TheHeader},
    data() {
        return {
            showBtnTop: false,
        };
    },
    metaInfo() {
        return {
            htmlAttrs: {
                lang: this.$i18n.locale,
            },
        };
    },
    created() {
        window.addEventListener('scroll', this.scroll); // кнопка наверх

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
    methods: {
        scroll() { // колбек кнопки наверх
            this.showBtnTop = (window.pageYOffset > 300);
        },
    },
};
</script>


