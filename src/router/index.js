import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import BoardView from "../views/BoardView.vue";
import BoardPostView from "../views/BoardFormView.vue";
import BoardDetailView from "../views/BoardDetailView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/board",
    name: "board",
    component: BoardView,
  },
  {
    path: "/board/post",
    name: "boardPost",
    component: BoardPostView,
  },
  {
    path: "/board/post/:id",
    name: "boardPost",
    component: BoardPostView,
  },
  {
    path: "/board/:id",
    name: "boardDetail",
    component: BoardDetailView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
