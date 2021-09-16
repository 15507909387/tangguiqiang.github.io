<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="一切发动" />
    <MyTest></MyTest> -->
    <TodoAdd @add-todo="addTodo" />
    <TodoList :todos="todos" />
    <TodoFilter />
  </div>
</template>

<script>
// 注册组件
import TodoAdd from "./components/TodoAdd.vue";
import TodoList from "./components/TodoList.vue";
import TodoFilter from "./components/TodoFilter.vue";

export default {
  name: "App",
  // 组件
  components: {
   
    TodoAdd,
    TodoList,
    TodoFilter,
  },
  data: function() {
    return {
      todos: [
        { text: "学习 JavaScript", completed: true, id: 1 },
        { text: "学习 Vue", completed: false, id: 2 },
        { text: "整个牛项目", completed: true, id: 3 },
      ],
    };
  },
  methods: {
    addTodo: function(text) {
      this.todos.push({
        text,completed:false,id:Date.now()
      })
    }
  }
  
};


</script>

<style scoped>
 ul {
   list-style: none;
   padding: 0;
   margin: 0;
 }
</style>

