<template>
  <div id="app">
    <TodoAdd />
    <TodoList />
    <TodoFilter />
  </div>
</template>

<script>
import TodoAdd from './components/TodoApp.vue'
import TodoList from './components/TodoList.vue'
import TodoFilter from './components/TodoFilter.vue'

export default {
  name: 'App',
  components: {
   TodoFilter,
   TodoList,
   TodoAdd,

  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
