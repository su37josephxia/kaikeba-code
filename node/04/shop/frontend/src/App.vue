<template>
  <div id="app">
    <el-menu :default-active="$route.path" router mode="horizontal">
      <el-menu-item index="/Shop">商品</el-menu-item>
      <el-menu-item index="/Cart">购物车</el-menu-item>
      <el-menu-item index="/Orders">订单</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
import Shop from "./views/Shop";
import Cart from "./views/Cart";
import Orders from "./views/Orders";
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  components: {
    Shop,
    Cart,
    Orders
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
