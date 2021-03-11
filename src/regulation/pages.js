export default [
    {
        name: 'index',
        link: { router: '/' },
        component: () => import(/* webpackChunkName: "Index" */ '../pages/Index.vue'),
    },
    {
        name: '404',
        link: { router: '/404' },
        component: () => import(/* webpackChunkName: "404" */ '../pages/404.vue'),
    },
    {
        name: 'modules',
        link: { router: '/modules' },
        component: () => import(/* webpackChunkName: "modules" */ '../pages/Modules.vue'),
    },
];

