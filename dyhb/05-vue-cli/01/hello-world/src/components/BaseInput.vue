<template>
    <label>
        <span><slot></slot></span>
        <input type="text" v-model="value" ref="ddd"/>
    </label>
</template>

<script>
   
 export default {
    data: function() {
        return {
            value: "hello"
        }
        
    }
}       
    

</script>

