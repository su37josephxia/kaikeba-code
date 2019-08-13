<template>
  <div>
    <div>
      <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加商品</el-button>
    </div>
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

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteProduct(scope.row)">删除</el-button>
            <el-button size="mini" @click="addCart(scope.row)">添加购物车</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- dialog弹框 -->
      <el-dialog
        title="收货地址"
        width="20%"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
      >
        <el-input v-model="title" placeholder="请输入名称"></el-input>
        <br />
        <el-input v-model="imageUrl" placeholder="请输入图片地址"></el-input>
        <br />
        <el-input v-model="price" placeholder="请输入价格"></el-input>
        <br />
        <el-input v-model="description" placeholder="请输入说明"></el-input>
        <br />
        <el-button type="primary" @click="addProduct">添加</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import qs from "querystring";
export default {
  data() {
    return {
      title: "",
      imageUrl: "",
      price: "",
      description: "",
      activeName: "second",
      products: [], //产品
      dialogFormVisible: false
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      const res = await this.$axios.get("api/admin/products");
      this.products = res.data.prods;
    },
    // 添加商品
    async addProduct() {
      if (this.title && this.imageUrl && this.price && this.description) {
        const params = {
          title: this.title,
          imageUrl: this.imageUrl,
          price: this.price,
          description: this.description
        };

        const res = await this.$axios.post("api/admin/product", params);

        if (res.data.success) {
          this.dialogFormVisible = false;
          await this.getProducts();
          this.title = "";
          this.imageUrl = "";
          this.price = "";
          this.description = "";
        }
      } else {
        alert("不得有空余项！");
      }
    },
    // 删除产品
    async deleteProduct(row) {
      const res = await this.$axios.delete("api/admin/product/" + row.id);
      await this.getProducts();
    },
    // 添加购物车
    async addCart(row) {
      const params = { id: row.id };
      const res = await this.$axios.post("api/cart", params);
      if (res.data.success) {
        this.$router.push("/cart");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-input {
  margin-bottom: 20px;
}
</style>