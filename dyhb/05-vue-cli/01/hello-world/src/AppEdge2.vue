<template>
  <div id="app">
    <p>a: {{ a }}</p>
    <p @click="b = Date.now()">b: {{ b }}</p>
    <div v-for="item in c" :key="item">
        {{item}}
    </div>
    <button @click="btnClick">btn</button>

    <hr />
    <p @click="created">{{obj.name}}-{{obj.age}}</p>
    
  </div>
</template>

<script>
// import Vue from "vue";
export default {
  name: "App",
  components: {},
  data: function() {
    return {
      a: 10,
     
      c: [11,22,33],
      obj:{
          name:"nick"
      }
      
    };
  },
  methods: {
    btnClick: function() {
    //   this.c.push(55);
      this.c[1] = 55;
      // this.$forceUpdate();

      // this.$set(this.c, 1, 55);
    //   this.c.splice(1, 1, 55);
    },
    objAssign: function() {
      this.obj.job = "xxx";
      this.$forceUpdate();

    }
    },
    created: function(){
        // this.b=20
        // this.$set(this.obj,"age",22)
    }
    
};
</script>

<style></style>