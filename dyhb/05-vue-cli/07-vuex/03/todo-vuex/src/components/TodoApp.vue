<template>
    <div class="todo-add">
        <input type="checkbox"          
             >
        <input type="text"
            v-model.trim="value"
        >
        <input type="button"
            value="add"
            
        >

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                value: "" 
            }
           
        }
    }
</script>

<style lang="less" scoped>

</style>