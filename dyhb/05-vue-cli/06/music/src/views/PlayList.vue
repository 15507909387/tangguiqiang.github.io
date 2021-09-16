<template>
  <div v-if="detail">
    <section class="beijintu">
      <section
        class="mask"
        :style="{
          backgroundImage: `url(${detail.coverImgUrl}?imageView=1&type=webp&thumbnail=246x0)`,
        }"
      ></section>

      <section class="beijing">
        <div class="beijing-left">
          <img :src="`${detail.coverImgUrl}`" alt="" />
          <p>{{ detail.playCount | parseCount }}</p>
        </div>
        <div class="beijing-right">
          <h2>{{ detail.name }}</h2>
          <img src="" alt="" />
          <div>
            <img :src="`${detail.creator.avatarUrl}`" alt="" />
            <p>{{ detail.creator.nickname }}</p>
          </div>
        </div>
      </section>
    </section>

    <ul>
      <SongListItem
        v-for="(item, index) in detail.tracks"
        :key="item.id"
        :item="item"
        @change-current-song="
          $emit(`change-current-song`, item),
            $emit(`change-current-play-list`, detail.tracks)
        "
        :currentSongId="currentSongId"
        :playing="playing"
        :class="{ lt3: index < 3 }"
        >{{ index + 1 }}</SongListItem
      >
    </ul>
  </div>
</template>



<script>
import SongListItem from "@/components/SongListItem.vue";

export default {
  components: {
    SongListItem,
  },
  props: {
    currentSongId: {
      type: Number,
    },
    playing: Boolean,
  },
  data: function () {
    return {
      detail: null,
    };
  },

  filters: {
    parseCount: function (value) {
      // return value + "0";
      if (value > 100000000) {
        return (value / 100000000).toFixed(1) + "亿";
      } else if (value > 10000) {
        return (value / 10000).toFixed(1) + "万";
      } else {
        return value;
      }
    },
  },

  methods: {
    getPlayListDetail: function (id) {
      this.axios
        .get("http://apis.netstart.cn/music/playlist/detail", {
          params: {
            id,
          },
        })
        .then((res) => {
          this.detail = res.data.playlist;
        });
    },
  },
  created: function () {
    this.getPlayListDetail(this.$route.query.id);
  },
};
</script>

<style lang="less" scoped>
.beijintu {
  top: 0;
  left: 0;
  width: 100vw;
  height: 180px;
  overflow: hidden;
  position: relative;
  z-index: 1;

  .mask {
    width: 100%;
    height: 180px;
    //  background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    // // 模糊
    filter: blur(30px) brightness(0.6);
    //缩放
    transform: scale(1.5);
  }

  .beijing {
    position: absolute;
    top: 27px;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    .beijing-left {
      width: 126px;
      height: 126px;
      margin: 0 15px;

      p {
        position: absolute;
        right: 235px;
        top: 0;
        padding-left: 15px;
        color: #fff;
        font-size: 12px;
        background-position: 0;
        background-repeat: no-repeat;
        background-size: 11px 10px;
        text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
      }
    }
    // transition: all 0.8s;

    .beijing-right {
      width: 208px;
      h2 {
        padding-top: 1px;
        font-size: 17px;
        line-height: 1.3;
        color: #fefefe;
        height: 44px;
        display: -webkit-box;
        -webkit-box-pack: center;
      }
      div {
        // display: inline-block;
        display: flex;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;

        color: hsla(0, 0%, 100%, 0.7);

        img {
          width: 30px;
          border-radius: 50%;
          margin: 0 5px 0 0;
        }
        p {
          display: inline-block;
          margin-top: 0;
        }
      }
    }
  }
}
</style>