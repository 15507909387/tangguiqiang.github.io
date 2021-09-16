<template>
  <li :class="{completed: todo.completed}">
    <!-- @change：input变化时触发changeHandler -->
    <input type="checkbox"
        :checked="todo.completed"
        @change="changeHandler($event)"
        >
    <p class="">{{todo.text}}</p>
    <span>X</span>
  </li>
</template>

<script>
export default {
  props:["todo"],
  methods: {
    changeHandler: function(event) {
      console.log(event)
      this.$emit("toggle-todo"),{
        id: todo.id,
        completed: event.target.checked,
      }
    }
  }
}
</script>

<style scoped>

 ul li p {
   margin: 0 10px;
 }

 ul li span {
  color:rgb(255, 94, 0);
  
}

ul li.completed p{
  text-decoration: line-through;
}
</style>
