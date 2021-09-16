<template>
  <div class="my-test">
    <h1>xxx</h1>
    <slot :user="user">slog里的内容</slot>
    
    <p>yyy</p>
  </div>
</template>
<script>
export default {
  data: function(){
    return {
      msg: "haha",
      user: {
        name: "nick",
        age: 25,
      }
    }
  }
};
</script>
<style></style>
