import { createRouter, createWebHistory } from "vue-router";

import { useCarStore } from "../stores/CarStore";
import { useUserStore } from "../stores/userStore";

const routes = [
  {
    name: "Home",
    path: "/",
    meta: { requiredAuth: true },
    component: () => import("@/views/Home.vue"),
  },
  {
    name: "Login",
    path: "/login",
    meta: { guest: true },
    component: () => import("@/views/Login.vue"),
  },
  {
    name: "Register",
    path: "/register",
    meta: { guest: true },
    component: () => import("@/views/Register.vue"),
  },
  {
    name: "Details",
    path: "/details/:id",
    meta: { requiredAuth: true },
    component: () => import("@/views/CarDetails.vue"),
  },
  {
    name: "NotFound",
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: "smooth" }));
      })
    );
  },
});

router.beforeEach((to, from, next) => {
  const carStore = useCarStore();
  const userStore = useUserStore();
  carStore.showNav = false;

  if (to.meta.requiredAuth && !userStore.isAuthenticated()) {
    next("/login");
  } else if (to.meta.guest && userStore.isAuthenticated()) {
    next("/");
  } else {
    next();
  }
});

export default router;
