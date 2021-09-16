<template>
  <div>
    <input type="checkbox">
    <!-- trim 剪切 -->
    <input type="text" v-model="value" />
    <button @click="$emit('add-todo',value);
         value=''; "
         
    >APP</button>
  </div>
</template>

<script>
export default {
    data: function(){
      return {
        value: "",
      }
    }
}
</script>