import { RouteDefinition } from "solid-app-router";
import { lazy } from "solid-js";

import Home from "./pages/home";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: Home,
  },

  { path: "/lottie", component: () => lazy(() => import("./pages/lottie")) },
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
