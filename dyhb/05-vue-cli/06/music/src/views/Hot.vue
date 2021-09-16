<template>
<div>
 <div class="hotzhaop">

   <div class="imgb"></div>
 </div>
    <ul >
      <li class="hot" v-for="(item, index) in hotsong" :key="item.id"
        @click="$emit(`change-current-song`, item),$emit(`change-current-play-list`,hotsong)"
      >
       
        <div class="num"> {{ (index + 1).toString().padStart(2, "0") }}</div>
        <div class="left">
          <div class="title">{{ item.name }}</div>
          <div class="info">
            <!-- <em v-if="item.song.exclusive"></em> -->
            <i class="artist" v-for="artist in item.ar" :key="artist.id">
              {{ artist.name }}
            </i>
            <b>{{ item.al.name }}</b>
          </div>
        </div>
        <div class="icon">
          <div
            class="play"
            :class="{current: currentSongId === item.id, playing:playing }"
          >
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
   
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },
  data: function () {
    return {
      //新建空数组
      hotsong: [],
    };
  },
  created: function () {
    //发起Ajax

    this.axios
      .get("http://apis.netstart.cn/music/playlist/detail?id=3778678")
      .then((res) => {
        // console.log(res);
        this.hotsong = res.data.playlist.tracks;
        // console.log(this.hotsong);
      });
  },
};
</script>

<style lang="less">
.hotzhaop {

  width: 100vw;
  height: 140px;
  background-image: url(https://s3.music.126.net/mobile-new/img/hot_music_bg_3x.jpg?2bfefd3ba37eaffbd66b7d108b9de26a=);
  background-size: 100%;
  overflow: hidden;

  .imgb {
    margin: 20px;
    width: 40vw;
    height: 30vw;
    background-image: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png);
    background-size: 147px;
    background-repeat: no-repeat;
    background-position: -17px -20px;
  }


}

.hot {
  padding: 5px 12px 5px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(212, 212, 212, 0.4);
  margin-left: 12px;
  .num {
    width: 22px;
    padding-right: 30px;
    // background: red;
  }
  &.lt3 {
    .num {
      color: #d43c33;
    }
  }
  .left {   
    flex: 1;
    .title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      span {
        color: #888;
        &::before {
          content: "(";
        }
        &::after {
          content: ")";
        }
      }
    }
    .info {
      font-size: 10px;
      color: #888;
      line-height: 1.8;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      em {
        display: inline-block;
        width: 12px;
        height: 8px;
        background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png");
        background-repeat: no-repeat;
        background-size: 166px auto;
        margin-right: 4px;
      }

      i.artist {
        font-style: normal;
        &:after {
          content: "/";
          margin: 0 3px;
        }
        &:last-of-type {
          &::after {
            content: "-";
            margin: 0 5px;
          }
        }
      }
      b {
        font-weight: normal;
      }
    }
  }
  .icon {
    width: 22px;
    height: 22px;
    margin-left: 15px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    // background: red;
    .play {
      width: 100%;
      height: 100%;
      background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png");
      background-repeat: no-repeat;
      background-size: 166px auto;
      background-position: -24px 0;
    }
    .current {
      width: 15px;
      height: 15px;
      background: red;
      background: none;

      display:flex;
      justify-content: space-around;
      i {
        width: 3px;
        height: 100%;
        background: #d43c33;
        transform-origin: bottom;
        animation: playing 0.9s linear 0s infinite alternate;
        //暂停
        animation-play-state: paused;
        &:nth-child(1) {
          animation-delay: -0.6s;
        }
        &:nth-child(2) {
          animation-delay: -0.3s;
        }     
      }
      // .current 在 playing 状态时的样式
      &.playing {
        i {
          
          animation-play-state: running;
        }
      }
    }
  }
}
@keyframes playing {
    from {
      transform: scaleY(0.2);
    }
    to {
      transform: scaleY(1);
    }
  }
</style>