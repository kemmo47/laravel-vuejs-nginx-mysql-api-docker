import {createRouter, createWebHistory} from 'vue-router';

import CompHome from '../components/CompHome.vue';
import CompTodos from '../components/CompTodos.vue';
import CompError from '../components/CompError.vue';

const routes = [
    {path: '/', component: CompHome},
    {path: '/todos', component: CompTodos},
    {path: '/:pathMatch(.*)*', component: CompError}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
