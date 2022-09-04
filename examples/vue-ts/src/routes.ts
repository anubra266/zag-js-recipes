import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/index";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home,
    },
    { path: "/lottie", component: () => import("./pages/lottie") },
  ],
});
