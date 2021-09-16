<template>
  <section class="playbar" :class="{ playing: playing }">
    <img
      @click="$emit('toggle-show-play-page', true)"
      class="song-picture"
      :src="`${
        currentSong.song
          ? currentSong.picUrl
          : currentSong.al
          ? currentSong.al.picUrl
          : currentSong.album.artist.img1v1Url
      }?imageView=1&type=webp&thumbnail=80x0`"
      alt=""
    />
    <h3 @click="$emit('toggle-show-play-page', true)">
      {{ currentSong.name }}
      <span>
        -
        {{
          currentSong.song
            ? currentSong.song.artists[0].name
            : currentSong.al
            ? currentSong.ar[0].name
            : currentSong.artists[0].name
        }}</span
      >
    </h3>

    <div class="progress" @click="$emit('toggle-playing-state')">
      <canvas width="40px" height="40px" ref="canvas"></canvas>
      <img
        class="song-play"
        :class="[playing ? 'fa fa-pause' : 'fa fa-play']"
        src=""
        alt=""
      />
    </div>

    <div whidth="30px" @click="$emit('toggle-show-play-list', true)">
      <svg
        t="1631522594458"
        class="icon"
        viewBox="0 0 1331 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="15499"
        width="19"
        height="19"
      >
        <path
          d="M0 0m46.029795 0l92.059591 0q46.029795 0 46.029795 46.029795l0 92.059591q0 46.029795-46.029795 46.029795l-92.059591 0q-46.029795 0-46.029795-46.029795l0-92.059591q0-46.029795 46.029795-46.029795Z"
          fill="#2c2c2c"
          p-id="15500"
        ></path>
        <path
          d="M276.178772 0m46.029795 0l828.536316 0q46.029795 0 46.029795 46.029795l0 92.059591q0 46.029795-46.029795 46.029795l-828.536316 0q-46.029795 0-46.029795-46.029795l0-92.059591q0-46.029795 46.029795-46.029795Z"
          fill="#2c2c2c"
          p-id="15501"
        ></path>
        <path
          d="M0 368.238362m46.029795 0l92.059591 0q46.029795 0 46.029795 46.029796l0 92.05959q0 46.029795-46.029795 46.029796l-92.059591 0q-46.029795 0-46.029795-46.029796l0-92.05959q0-46.029795 46.029795-46.029796Z"
          fill="#2c2c2c"
          p-id="15502"
        ></path>
        <path
          d="M276.178772 368.238362m46.029795 0l828.536316 0q46.029795 0 46.029795 46.029796l0 92.05959q0 46.029795-46.029795 46.029796l-828.536316 0q-46.029795 0-46.029795-46.029796l0-92.05959q0-46.029795 46.029795-46.029796Z"
          fill="#2c2c2c"
          p-id="15503"
        ></path>
        <path
          d="M0 736.476725m46.029795 0l92.059591 0q46.029795 0 46.029795 46.029795l0 92.059591q0 46.029795-46.029795 46.029795l-92.059591 0q-46.029795 0-46.029795-46.029795l0-92.059591q0-46.029795 46.029795-46.029795Z"
          fill="#2c2c2c"
          p-id="15504"
        ></path>
        <path
          d="M276.178772 736.476725m46.029795 0l828.536316 0q46.029795 0 46.029795 46.029795l0 92.059591q0 46.029795-46.029795 46.029795l-828.536316 0q-46.029795 0-46.029795-46.029795l0-92.059591q0-46.029795 46.029795-46.029795Z"
          fill="#2c2c2c"
          p-id="15505"
        ></path>
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      // picUrl: null,
    };
  },
  props: {
    currentSong: Object,
    playing: Boolean,
    duration: Number,
    currentTime: Number,
    currentPlayList: Array,
  },

  created: function () {
    //检查是否有canvas
    // console.log(this.$refs.canvas);
    // console.log(this.currentTime, this.duration);
    // if (this.currentSong.song) {
    //   this.picUrl = this.currentSong.picUrl;
    // } else if (this.currentSong.al) {
    //   this.picUrl = this.currentSong.al.picUrl;
    // }
    //  else {
    //   this.picUrl = this.currentSong.artists[0].img1v1Url;
    // }
    // console.log(this.currentSong.artists[0].img1v1Url);
  },

  computed: {
    percentage: function () {
      return this.currentTime / this.duration;
    },
  },
  watch: {
    percentage: function (n) {
      var context = this.$refs.canvas.getContext("2d");
      context.clearRect(0, 0, 40, 40);
      context.beginPath();
      context.arc(
        20,
        20,
        18,
        (Math.PI / 180) * (360 * n - 90),
        (Math.PI / 180) * (360 - 90)
      );
      context.strokeStyle = "lightgray";
      context.lineWidth = 1;
      context.stroke();

      context.beginPath();
      context.arc(
        20,
        20,
        18,
        (Math.PI / 180) * (0 - 90),
        (Math.PI / 180) * (360 * n - 90)
      );
      context.strokeStyle = "#d43c33";
      context.lineWidth = 1;

      context.stroke();
    },
  },
};
</script>

<style lang="less" scoped>
.playbar {
  width: 100%;
  height: 50px;
  background: #fff;
  padding-bottom: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 12px;

  // box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
  img.song-picture {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    animation: rotate 8s linear infinite;
    animation-play-state: paused;
  }

  &.playing {
    img {
      animation-play-state: running;
    }
  }
  h3 {
    padding: 0 10px;
    flex: 1;
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    span {
      color: rgb(151, 151, 151);
      font-size: 10px;
    }
  }

  .progress {
    width: 30px;
    height: 30px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    canvas {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0px;
    }
    img {
      color: black;
      font-size: 12px;
    }
  }
}
</style>