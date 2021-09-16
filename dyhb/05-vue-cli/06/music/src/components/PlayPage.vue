<template>
  <section class="play-page">
    <div
      class="mask"
      :style="{
        backgroundImage: `url(${
         currentSong.song ? currentSong.picUrl : currentSong.al ?
       currentSong.al.picUrl : currentSong.album.artist.img1v1Url
        }?imageView=1&type=webp&thumbnail=246x0)`,
      }"
    ></div>
    <div margin="10px 10px" class="suojin" @click.stop="$emit('toggle-show-play-page', false)">
 <svg t="1631522190415" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14553" width="15" height="15"><path d="M766.862 1021.724c-10.24 0-20.594-3.64-28.444-10.922L228.693 538.396c-15.701-14.563-15.701-38.229 0-52.792L738.418 13.198c15.701-14.563 41.187-14.563 56.889 0 15.701 14.564 15.701 38.23 0 52.793L314.027 512l481.28 446.009c15.701 14.563 15.701 38.23 0 52.793-7.851 7.282-18.205 10.922-28.445 10.922z" p-id="14554" fill="#e6e6e6"></path></svg>
    </div>
    <section class="rotate" @click="showLyric = true" v-if="!showLyric">
      <img
        class="needle"
        :class="{ paused: !playing }"
        src="https://s3.music.126.net/mobile-new/img/needle-ab.png"
        alt=""
      />

      <section class="record" :class="{ playing: playing }">
        <img
          class="thumb"
          :src="currentSong.song ? currentSong.picUrl : currentSong.al ?
       currentSong.al.picUrl : currentSong.album.artist.img1v1Url"
          alt=""
        />
        <img
          class="diso"
          src="https://s3.music.126.net/mobile-new/img/disc.png"
          alt=""
        />
      </section>
      <section class="conter">
         <h3 @click="$emit('toggle-show-play-page', true)">
           歌名：
      {{ currentSong.name }}
     
    </h3>
     <span>
        歌手：
        {{
          currentSong.song
            ? currentSong.song.artists[0].name : currentSong.al ? currentSong.ar[0].name
            : currentSong.artists[0].name
        }}</span
      >
      </section>
    </section>
    <section class="lyric" v-else @click="showLyric = false" ref="lyric">
      <ul class="content" ref="lyricContent" v-if="parsedLyric.length">
        <li v-for="(l, i) in parsedLyric" :key="i">
          <span
            :class="{
              active:  currentLyricIndex === i,
              
            }"
            >{{ l.text }}</span
          >
        </li>
      </ul>
    </section>
    <!-- duration 总时长  setp 步进-->
    <section class="progress">
      <input
        type="range"
        :max="duration"
        step="0.5"
        v-model="value"
        @change="progressChange"
        @input="progressInput"
      />
      <span
        class="bar"
        :style="{ width: (value / duration) * 100 + '%' }"
      ></span>
      <span
        class="circle"
        :style="{ left: (value / duration) * 100 + '%' }"
      ></span>
    </section>
    <section class="controls">
      <p><svg t="1631521286211" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10562" width="30" height="30"><path d="M698.181818 768a116.363636 116.363636 0 1 1 0 232.727273 116.363636 116.363636 0 0 1 0-232.727273z m-162.117818 93.090909a23.272727 23.272727 0 0 1 4.189091 46.173091l-4.189091 0.372364H93.090909a23.272727 23.272727 0 0 1-4.189091-46.173091L93.090909 861.090909h442.973091z m394.845091 0a23.272727 23.272727 0 0 1 4.189091 46.173091L930.909091 907.636364h-69.399273a23.272727 23.272727 0 0 1-4.189091-46.173091l4.189091-0.372364H930.909091zM325.818182 395.636364a116.363636 116.363636 0 1 1 0 232.727272 116.363636 116.363636 0 0 1 0-232.727272z m-162.443637 93.090909a23.272727 23.272727 0 0 1 4.189091 46.173091l-4.189091 0.372363H93.090909a23.272727 23.272727 0 0 1-4.189091-46.173091L93.090909 488.727273h70.283636z m767.534546 0a23.272727 23.272727 0 0 1 4.189091 46.173091L930.909091 535.272727H489.425455a23.272727 23.272727 0 0 1-4.189091-46.173091l4.189091-0.372363H930.909091z m-232.727273-465.454546a116.363636 116.363636 0 1 1 0 232.727273 116.363636 116.363636 0 0 1 0-232.727273z m-162.769454 93.090909a23.272727 23.272727 0 0 1 4.189091 46.173091l-4.189091 0.372364H93.090909a23.272727 23.272727 0 0 1-4.189091-46.173091L93.090909 116.363636h442.321455zM930.909091 116.363636a23.272727 23.272727 0 0 1 4.189091 46.173091L930.909091 162.909091h-69.585455a23.272727 23.272727 0 0 1-4.189091-46.173091l4.189091-0.372364H930.909091z" p-id="10563" fill="#ffffff"></path></svg></p>
      <p @click="$emit('page-top')"><svg t="1631520734372" class="icon" viewBox="0 0 1061 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4719" width="30" height="30"><path d="M284.253025 603.783387a113.777061 113.777061 0 0 1 0-187.504598L860.647618 20.03121A113.777061 113.777061 0 0 1 1038.898348 113.783509v792.495158a113.777061 113.777061 0 0 1-178.25073 93.752299L284.253025 603.783387zM75.851374 35.959999a75.851374 75.851374 0 0 1 75.851375 75.851374v796.43943a75.851374 75.851374 0 1 1-151.702749 0v-796.43943a75.851374 75.851374 0 0 1 75.851374-75.851374z" p-id="4720" fill="#ffffff"></path></svg></p>
      <p @click="$emit('toggle-playing-state')"> 
        <svg v-if="playing" t="1631521029074" class="icon zhant" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6724" width="30" height="30"><path d="M735.744 49.664c-51.2 0-96.256 44.544-96.256 95.744v733.184c0 51.2 45.056 95.744 96.256 95.744s96.256-44.544 96.256-95.744V145.408c0-51.2-45.056-95.744-96.256-95.744z m-447.488 0c-51.2 0-96.256 44.544-96.256 95.744v733.184c0 51.2 45.056 95.744 96.256 95.744S384 929.792 384 878.592V145.408c0-51.2-44.544-95.744-95.744-95.744z" fill="#ffffff" p-id="6725"></path></svg>
        <svg v-else t="1631521839759" class="icon zhant" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11400" width="200" height="200"><path d="M139.970229 916.828121v-829.387472a87.290472 87.290472 0 0 1 139.68182-69.968902l552.924981 414.779064a87.290472 87.290472 0 0 1 0 139.68182l-552.924981 414.693736a87.290472 87.290472 0 0 1-139.68182-69.798246z" p-id="11401" fill="#ffffff"></path></svg>
      </p>
      <p @click="$emit('page-bottom')"><svg t="1631520925637" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5017" width="30" height="30"><path d="M768.348761 453.789321a63.494712 63.494712 0 0 1 18.653401 18.287647 70.261142 70.261142 0 0 1-18.653401 98.387544L112.041666 1011.562571A73.15059 73.15059 0 0 1 71.58939 1023.998171a71.541277 71.541277 0 0 1-72.089907-70.956072l0-882.561871a67.335118 67.335118 0 0 1 12.655052-39.501319 72.492235 72.492235 0 0 1 99.887131-18.6534zM1023.827198 898.179156a57.715816 57.715816 0 0 1-63.970191 61.812249 59.54458 59.54458 0 0 1-64.006767-64.00676699l-1e-8-768.08119701a59.398279 59.398279 0 0 1 64.00676701-64.006766A53.582807 53.582807 0 0 1 1023.827198 119.491123L1023.827198 898.179156z" p-id="5018" fill="#ffffff"></path></svg></p>
      <p @click="$emit('toggle-show-play-list', true)"><svg t="1631521113020" class="icon" viewBox="0 0 1331 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7632" width="30" height="30"><path d="M0 0m46.029795 0l92.059591 0q46.029795 0 46.029795 46.029795l0 92.059591q0 46.029795-46.029795 46.029795l-92.059591 0q-46.029795 0-46.029795-46.029795l0-92.059591q0-46.029795 46.029795-46.029795Z" fill="#ffffff" p-id="7633"></path><path d="M276.178772 0m46.029795 0l828.536316 0q46.029795 0 46.029795 46.029795l0 92.059591q0 46.029795-46.029795 46.029795l-828.536316 0q-46.029795 0-46.029795-46.029795l0-92.059591q0-46.029795 46.029795-46.029795Z" fill="#ffffff" p-id="7634"></path><path d="M0 368.238362m46.029795 0l92.059591 0q46.029795 0 46.029795 46.029796l0 92.05959q0 46.029795-46.029795 46.029796l-92.059591 0q-46.029795 0-46.029795-46.029796l0-92.05959q0-46.029795 46.029795-46.029796Z" fill="#ffffff" p-id="7635"></path><path d="M276.178772 368.238362m46.029795 0l828.536316 0q46.029795 0 46.029795 46.029796l0 92.05959q0 46.029795-46.029795 46.029796l-828.536316 0q-46.029795 0-46.029795-46.029796l0-92.05959q0-46.029795 46.029795-46.029796Z" fill="#ffffff" p-id="7636"></path><path d="M0 736.476725m46.029795 0l92.059591 0q46.029795 0 46.029795 46.029795l0 92.059591q0 46.029795-46.029795 46.029795l-92.059591 0q-46.029795 0-46.029795-46.029795l0-92.059591q0-46.029795 46.029795-46.029795Z" fill="#ffffff" p-id="7637"></path><path d="M276.178772 736.476725m46.029795 0l828.536316 0q46.029795 0 46.029795 46.029795l0 92.059591q0 46.029795-46.029795 46.029795l-828.536316 0q-46.029795 0-46.029795-46.029795l0-92.059591q0-46.029795 46.029795-46.029795Z" fill="#ffffff" p-id="7638"></path></svg></p>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    currentSong: Object,
    playing: Boolean,
    duration: Number,
    currentTime: Number,
  },

  data: function () {
    return {
      value: this.currentTime,
      inputing: false,
      showLyric: false,
      lyric: null,
      lisH: [],
    };
  },

  watch: {
    currentTime: function (n) {
      if (!this.inputing) {
        this.value = n;
      }
    },

    "currentSong.id": function (id) {
      // console.log(id);
      this.getLyric(id);
    },

    currentLyricIndex: function () {
      var lis = this.$refs.lyricContent
        ? this.$refs.lyricContent.querySelectorAll("li")
        : null;
      // console.log(index, lis);
      if (lis != null) {
        this.lisH = [...lis].map((item) => item.offsetHeight);
      }
      console.log(this.lisH);
      // console.log("aaa");
    },

    parsedLyric: function () {
      // console.log("parsedLyric改变", this.$refs.lyricContent);
      // this.$nextTick(() => {
      //   console.log("nextTick", this.$refs);
      //   var lis = this.$refs.lyricContent.querySelectorAll("li");
      //   this.lisH = [...lis].map((item) => item.offsetHeight);
      //   console.log(this.lisH);
      // });
      //  当前歌词前面所有歌词高度
      // var h = this.lisH.slice(0, index).reduce(function(total, item) {
      //   return total + item;
      // }, 0);
      // console.log(h);
      // var lis = this.$refs.lyricContent
      //   ? this.$refs.lyricContent.querySelectorAll("li")
      //   : null;
      // console.log(lis);
      // if (lis != null) {
      //   this.lisH = [...lis].map((item) => item.offsetHeight);
      // }
      // console.log(this.lisH);
      console.log("111");
    },
  },
  created: function () {
    this.getLyric(this.currentSong.id);
    // console.log(this.$refs.lyricContent);
  },

  methods: {
    progressChange: function (event) {
      this.inputing = false;
      this.$emit("current-time-change", event.target.value);
    },
    progressInput: function () {
      this.inputing = true;
    },

    getLyric: function (id) {
      this.axios
        .get("/lyric", {
          params: { id },
        })
        .then((res) => (this.lyric = res.data.lrc.lyric));
    },
  },

  computed: {
    parsedLyric: function () {
      if (this.lyric) {
        return this.lyric
          .split("\n")
          .filter((s) => s)
          .map((s) => {
            var text = s.replace(/^\[\d{2}:\d{2}\.\d{2,3}\]/i, "");
            var timeStr = s.replace(text, "").replace(/(^\[|\]$)/g, "");
            var timeArr = timeStr.split(":").map((item) => Number(item));
            var time = timeArr[0] * 60 + timeArr[1];
            return { text, time };
          });
      } else {
        return [];
      }
    },
    currentLyricIndex: function () {
      var i = this.parsedLyric.findIndex(
        (item) => item.time > this.currentTime
      );
      var currentLyricIndex = i !== -1 ? i - 1 : this.parsedLyric.length - 1;
      return currentLyricIndex;
    },
  },
};
</script>

<style lang="less" scoped>
//复用样式
.pos-ab() {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.play-page {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;

  overflow: hidden;
  &::before {
    content: "";
    display: block;
    .pos-ab();
    z-index: -2;
    background-color: #333;
  }


  .mask {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    // 模糊
    filter: blur(30px) brightness(0.8);
    z-index: -1;
    //缩放
    transform: scale(1.2);
    transition: all 0.8s;

    .pos-ab();
  }

  .rotate {
    height: 75vh;
    position: relative;
    padding-top: 25vw;
    top: 40px;
    img.needle {
      height: 40vw;
      position: absolute;
      top: 0;
      left: 48%;
      z-index: 1;
      margin-left: -15px;
      transform-origin: 15px 15px;
      transform: rotate(0deg);
      transition: all 0.3s;

      &.paused {
        transform: rotate(-20deg);
      }
    }
  }

  .lyric {
    height: 70vh;
    // background: rgb(116, 115, 115);
    text-align: center;
    overflow: hidden;
    position: relative;
    margin-top: 5vh;

    ul {
      transition: all 0.3s;
      color: rgb(207, 207, 203);
      // background: blue;
      // position:absolute;
      bottom: 10vh;

      li {
        line-height: 1.8;

        span {
          &.active {
            color: rgb(135, 250, 215);
          }
        }
      }
    }
  }

  .progress {
    width: 98vw;
    height: 4px;
    margin: 1vw auto;
    margin-top: 5vh;
    background: rgb(180, 180, 180);
    border-radius: 10px;
    position: relative;
    input {
      width: 100vw;
      left: -4px;
      background: red;
      position: absolute;
      top: -5px;
      opacity: 0;
    }
    .bar {
      display: block;
      background: #fff;
      border-radius: inherit;
      height: 4px;
      position: absolute;
    }
    .circle {
      display: block;
      width: 8px;
      height: 8px;
      background: rgb(255, 255, 255);
      border-radius: 50%;
      margin-left: -5px;
      position: absolute;
      top: -2px;
    }
  }

  .record {
    position: relative;
    width: 80vw;
    height: 80vw;
    left: 10vw;
    img {
      .pos-ab();
      border-radius: 50%;
    }
    img.thumb {
      transform: scale(0.8);
    }
    animation: rotate 8s linear infinite;
    animation-play-state: paused;
    &.playing {
      animation-play-state: running;
    }
  }

  .conter {
    margin: 20px 20px;
    h3 {
      color:#fff;
      padding: 10px 0;
      
    }
    span {
    color: rgb(224, 224, 224)
  }
  }
  

  .controls {

    width: 100%;
    // background: red;
    padding: 10px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-around;
    // color: rgb(182, 31, 31);
    top: 93vh;
    position: fixed;
    height: 7vh;  
    margin: -30px 0;


    svg {
      width: 30px;
      height: 30px;
      // color: #fff;
      
    }
    svg.zhant {
      width: 40px;
      height: 40px;
      margin-top: -6px;
    }

    
  }
}
</style>