// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import ShowDs from '../views/ShowDs.vue';
import UpdateCpp from '../views/UpdateCpp.vue';
import highlightTest from '../views/highlightTest.vue';

const routes = [
  {
    path: '/',
    name: 'ShowDs',
    component: ShowDs,
  },
  // Add your other routes here
  {
    path: '/main',
    name: 'UpdateCpp',
    component: UpdateCpp,
  },
  {
    path: '/test',
    name: 'Test',
    component: highlightTest,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;