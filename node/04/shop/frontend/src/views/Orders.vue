<template>
    <div>
      <div v-for="item in orders"  :key="item.id">
          <h6>{{item.id}}</h6>
           <el-table :data="item.products" border style="width: 100%">
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
            <p>{{ scope.row.orderItem.quantity }}</p>
          </template>
        </el-table-column>
      </el-table>
      </div>
        
    </div>
</template>

<script>
    export default {
        data(){
          return{
            orders:[],
            products:[]
          }
        },
        async created(){
            const {status,data:{orders}} = await this.$axios.get('api/orders')
            if(status === 200){
              this.orders = orders
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>