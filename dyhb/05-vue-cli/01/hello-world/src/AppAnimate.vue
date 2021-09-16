<template>
  <div id="app">
    <!-- <div class="box boxa"></div>
    <div class="box boxb"></div>
    <h1>An animated element</h1> -->

    <hr />
    <button @click="bool = !bool">点击</button>

    <transition name="fade">
      <div class="box" v-if="bool">aaa</div>
    </transition>
    <transition name="bounce">
      <div class="box" v-if="bool">bbb</div>
    </transition>

    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__rubberBand"
      leave-active-class="animate__animated animate__tada"
    >
      <div class="box" v-if="bool">ccc</div>
    </transition>

    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__bounceInRight"
      leave-active-class="animate__animated animate__bounceOutLeft"
    >
      <div class="box boxe" v-if="bool">eee</div>
    </transition>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      bool: false,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter /* .fade-leave-active below version 2.1.8 */ {
  /* 透明度 */
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
  animation: rotate 1s linear infinite;
}

.bounce-enter-active {
  animation: bounce 1s linear 0s;
}
.bounce-leave-active {
  animation: bounce 1s linear 0s reverse;
}

@keyframes bounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

#app {
  text-align: center;
}
.box {
  width: 100px;
  height: 100px;
  margin: 20px auto;
  background-color: red;
  /* transition: all 2s;  */
}

.boxa:hover {
  /* 移动 */
  transform: translateX(200px);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.boxb {
  animation: rotate 3s linear infinite;
}
</style>