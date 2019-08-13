<template>
  <div class="hello">
     
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  created(){
    const data = {
      name:'haha',
      age:20
    }
    axios.post('/api/user', data).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
