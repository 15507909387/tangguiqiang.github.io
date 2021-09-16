<template>
  <div class="hello">
    <h6>MyTest插入{{name}}:{{ msg }}</h6>
  </div>
</template>

<script>
export default {
  data:function(){
    return {
      name: "HelloWorld",
    }
  },
  
  // props: {
  //   msg: String,
  // },
  props: ["msg"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
