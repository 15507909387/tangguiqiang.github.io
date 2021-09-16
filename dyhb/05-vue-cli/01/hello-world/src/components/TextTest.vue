<template>
  <div class="blue">
    <p>{{xxx }}<button @click="xxx = Date.now()">but</button></p>

    <p>{{ person.name }}</p>
    <p>{{ person.age }}<button @click="person.age++">but</button></p>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    person: Object,
  },
  data: function () {
    return {
      xxx: this.msg,
    };
  
   
  },
};
</script>

<style scoped>
.blue {
  background-color: rgb(139, 139, 190);
}

button {
  margin-left: 20px;
}
</style>