<template>
  <div id="app">
      <h1>你好，世界</h1>
      <p >{{msg}}<button @click="msg= 'xxxxx'">but</button></p>
      
      <p >{{person.name}}</p>
      <p>{{person.age}}</p>
      <hr>
      <TextTest :msg="msg" :person="person" />
  </div>
</template>

<script>
import TextTest from "./components/TextTest.vue";

export default {
  name: "App",
  components: { TextTest },
  data: function () {
    return {
      msg: "一切反动派都是纸老虎",
      person: {
        name: "nick",
        age: 17,
      },
    };
  },
};
</script>

<style scoped>
button {
    margin-left: 20px;
}
</style>