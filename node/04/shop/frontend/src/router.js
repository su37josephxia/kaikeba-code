import Vue from "vue";
import Router from "vue-router";
import Shop from "./views/Shop.vue";
import Cart from "./views/Cart.vue";
import Orders from "./views/Orders.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "shop",
      component: Shop
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart
    },
    {
      path: "/orders",
      name: "orders",
      component: Orders
    }
  ]
});
