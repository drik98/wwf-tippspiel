import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/policy",
    name: "Policy",
    component: () =>
      import(/* webpackChunkName: "policy" */ "../views/Policy.vue"),
  },
  {
    path: "/post/:id",
    name: "Post",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Post.vue"),
    props: ({ params }) => ({
      postId: params.id,
    }),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
