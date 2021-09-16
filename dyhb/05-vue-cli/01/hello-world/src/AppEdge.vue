<template>
  <div id="app">
    <button :class="{ active: true }" @click="clickHandler">{{ msg }}</button>
    <video :src="src"
     controls
      ref="myVideo"></video>

    <hr />
    <BaseInput>BaseInput</BaseInput>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";

export default {
  name: "App",
  components: { BaseInput },
  data: function () {
    return {
      msg: "一切反动派都是纸老虎",
      src: "https://www.runoob.com/try/demo_source/movie.mp4",
    };
  },
  methods: {
    clickHandler: function () {
      console.log("123");
    },
    timeupdate:function(e){
        console.log(e.target.current)
    }

  },
    // $refs 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 $refs

  created: function () {
    // 可以访问this 但是访问不到 dom
    console.log("created", this, this.$refs, this.$refs.myVideo);
  },
  mounted: function () {
    console.log("mounted", this, this.$refs, this.$refs.myVideo);
  },
};
</script>

<style></style>
