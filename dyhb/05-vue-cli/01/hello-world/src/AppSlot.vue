<template>
  <div di="app">
    <MyTest> </MyTest>
    <MyTest> ddddd </MyTest>
    <hr />
    <MyTest>
      <p>插槽内容:{{ msg }}</p>
      <HelloWorld :name="name" :msg="msg" />
    </MyTest>
    <MyTest>
       <template v-slot:default="slotProps">
          直接写在template上{{slotProps.user.name}}
       </template>
    </MyTest>
    <MyTest v-slot:default="slotProps">      
          直接写在组件上{{slotProps.user.name}}
    </MyTest>
    

    <BaseLAayout>
      <template>
        <p>Here might be a page default</p>
      </template>
      <template v-slot:header>
        <h1>Here might be a page header</h1>
      </template>


      <template v-slot:footer>
        <p>Here might be a page footer</p>
      </template>
    
    </BaseLAayout>
  </div>
</template>

<script>
import MyTest from "./components/MyTest.vue";
import HelloWorld from "./components/HelloWorld.vue";
import BaseLAayout from './components/BaseLAayout.vue';

export default {
  name: "App",
  components: { MyTest, HelloWorld, BaseLAayout },
  data: function () {
    return {
      msg: "一切反动派都是纸老虎",
    };
  },
};
</script>