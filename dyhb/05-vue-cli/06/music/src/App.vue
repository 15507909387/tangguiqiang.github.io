
<template>
  <div id="app">
    <div style="background:rgb(212,60,51) ">
      <img width="100%" src="./QQ图片20210914115228.png" alt="">
    </div>
  
    <ul id="nav" v-if="$route.meta.showNavBar">
      <li>
        <router-link to="/">推荐音乐</router-link>
      </li>
      <li>
        <router-link to="/hot">热歌榜</router-link>
      </li>
      <li>
        <router-link to="/search">搜索</router-link>
      </li>
    </ul>
    <section class="routes">
      <transition
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__slideInRight"
        leave-active-class="animate__animated animate__slideOutLeft"
      >
        <router-view
          @change-current-song="changeCurrentSong"
          @change-current-play-list="changeCurrentPlayList"
          :currentSongId="currentSong ? currentSong.id : null"
          :playing="playing"
          style="position: absolute; top:0; left:0; width:100%;height:100%; overflow-y: auto;"

        />
      </transition>
    </section>
    <!-- pause() 方法停止（暂停）当前播放的音频或视频。 -->
    <audio
      ref="audio"
      :src="currentSongUrl"
      controls
      pause
      autoplay
      @playing="playing = true"
      @pause="playing = false"
      @timeupdate="timeupdate"
      @durationchange="durationchange"
    ></audio>
    <Play
      v-if="currentSong"
      :currentSong="currentSong"
      @toggle-playing-state="togglePlayingState"
      :playing="playing"
      :currentTime="currentTime"
      :duration="duration"
      :currentPlayList="currentPlayList"
      @change-current-song="changeCurrentSong"
      @page-top="pageTop"
      @page-bottom="pageBottom"
      @current-time-change="$refs.audio.currentTime = $event"
      
    ></Play>
  </div>
</template>

<script>
import Play from "@/components/Play.vue";

export default {
  components: {
    Play,
  },
  data: function () {
    return {
      currentSong: null,
      currentPlayList: [],
      playing: false,
      currentTime: 0,
      duration: 0,
    };
  },
  computed: {
    currentSongUrl: function () {
      if (this.currentSong) {
        return `https://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`;
      } else {
        return null;
      }
    },
  },
  methods: {
    changeCurrentSong: function (song) {
      console.log(song);
      this.currentSong = song;
    },
    changeCurrentPlayList: function (list) {
      // console.log(list);
      this.currentPlayList = list;
    },
    togglePlayingState: function () {
      // console.log(this.$refs);
      if (this.playing) {
        // 暂停音乐
        this.$refs.audio.pause();
      } else {
        // 播放音乐
        this.$refs.audio.play();
      }
    },
    timeupdate: function (event) {
      // console.log(event.target.currentTime);
      //获取音频播放的当前位置
      this.currentTime = event.target.currentTime;
    },
    durationchange: function (event) {
      //duration 属性返回当前视频的长度，以秒计。
      // console.log(event.target.duration);
      this.duration = event.target.duration;
    },
    pageTop:function(){
      //findIndex() 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
      //findIndex() 方法为数组中的每个元素都调用一次函数执行：
      var index = this.currentPlayList.findIndex((item) => {
        return item.id === this.currentSong.id;
      });
      index--;
      index = index < 0 ? this.currentPlayList.length - 1 : index
      console.log(index);
      this.changeCurrentSong(this.currentPlayList[index]);
      
    },
    pageBottom:function(){
     
       var index = this.currentPlayList.findIndex((item) => {
        return item.id === this.currentSong.id;
      });
      index++;
      index = index > this.currentPlayList.length - 1 ? 0 : index
      console.log(index);
      this.changeCurrentSong(this.currentPlayList[index]);
    },
   
  },
};
</script>


<style lang="less">
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate__animated {
  animation-duration: 0.3s;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}



audio {
  height: 40px;
  position: fixed;
  // bottom: 50px;
  left: 10px;
}

#nav {
  list-style: none;
  display: flex;
  //阴影 属性：X轴 Y轴
  box-shadow: 0 -2px 3px 0px rgb(231, 231, 231) inset;
  li {
    flex: 1;
    text-align: center;

    a {
      color: #2c3e50;
      line-height: 40px;
      display: inline-block;
      text-decoration: none;
      font-size: 15px;
      padding: 0 5px;

      &.router-link-exact-active {
        color: #d43c33;
        border-bottom: 2px solid #d43c33;
      }
    }
  }
}

.routes{
  position: relative;
  top: 0;
  left: 0;
  height: calc(100vh - 42px);
  overflow: hidden;
}
</style>
