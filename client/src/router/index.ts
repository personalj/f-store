import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
import Cart from "../views/Cart.vue";
import Orders from "../views/Orders.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "main" },
    component: Home,
  },
  {
    path: "/product/:id",
    name: "Product",
    meta: { layout: "main" },
    component: Product,
  },
  {
    path: "/cart",
    name: "Cart",
    meta: { layout: "main" },
    component: Cart,
  },
  {
    path: "/orders",
    name: "Orders",
    meta: { layout: "main" },
    component: Orders,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
