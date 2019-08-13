<template>
  <div>
    <el-button type="primary" size="mini" @click="createOrder()">添加订单</el-button>
    <div>
      <el-table :data="products" border style="width: 100%">
        <el-table-column label="ID" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.id }}</p>
          </template>
        </el-table-column>

        <el-table-column label="名称" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.title }}</p>
          </template>
        </el-table-column>

        <el-table-column label="价格" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.price }}</p>
          </template>
        </el-table-column>

        <el-table-column label="数量" width="180">
          <template slot-scope="scope">
            <p>{{ scope.row.cartItem.quantity }}</p>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="cartDeleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    };
  },
  created() {
    this.getCart();
  },
  methods: {
    // 获取购物车
    async getCart() {
      const res = await this.$axios.get("api/cart");
      if (res.status === 200) {
        this.products = res.data.products;
      }
    },

    // 删除购物车项
    async cartDeleteItem(row) {
      const res = await this.$axios.delete("api/cartItem/" + row.id);
      if (res.data.success) {
        await this.getCart();
      }
    },
    // 添加订单
    async createOrder() {
      const res = await this.$axios.post("api/orders");
      if (res.status === 200) {
        this.$router.push("/orders");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>