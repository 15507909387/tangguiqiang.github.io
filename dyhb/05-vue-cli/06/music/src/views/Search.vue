<template>
  <div class="search" @scroll="scroll">
    <!-- keyup 按键修饰符 enter 回车 -->
    <!-- 当元素获得焦点时（当通过鼠标点击选中元素或通过 tab 键定位到元素时），发生 focus 事件。 -->
    <!-- 当元素失去焦点时发生 blur 事件。 -->
    <div>
      <svg
        t="1630409169525"
        class="icon icon-sousuo"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2789"
        width="14"
        height="14"
      >
        <path
          d="M990.980258 969.944422l-185.094554-185.094554c83.911344-83.23135 135.990938-198.518449 135.990938-325.781454C941.876642 205.950391 735.934251 0 482.824228 0 229.698205 0 23.747814 205.950391 23.747814 459.076413c0 253.142022 205.950391 459.060414 459.076414 459.060414 103.079195 0 198.334451-34.167733 275.037851-91.759283l188.342529 188.342528c6.183952 6.183952 14.279888 9.271928 22.383825 9.271928s16.199873-3.087976 22.391825-9.271928a31.655753 31.655753 0 0 0 0-44.77565zM87.06732 459.076413c0-218.222295 177.534613-395.748908 395.756908-395.748908 218.206295 0 395.732908 177.526613 395.732908 395.748908 0 218.198295-177.526613 395.740908-395.732908 395.740909-218.222295 0-395.756908-177.542613-395.756908-395.740909z"
          fill="#838384"
          p-id="2790"
        ></path>
      </svg>
      <input
        type="text"
        placeholder="搜索歌曲、歌手、专辑"
        v-model.trim="value"
        @keyup.enter="value && (searching = true)"
        @focus="inputing = true"
        @blur="inputing = false"
      />
    </div>

    <section class="hots" v-if="!value && !searching">
      <h5>热门搜索</h5>
      <ul class="">
        <li
          v-for="hot in hots"
          :key="hot.first"
          @click="
            searching = true;
            value = hot.first;
          "
        >
          {{ hot.first }}
        </li>
      </ul>
    </section>
    <section class="record">
      <!-- 历史记录 -->
      <ol v-if="!value && !searching">
        <li v-for="(his, index) in history" :key="his">
          <span
            @click="
              searching = true;
              value = his;
            "
            ><svg
              t="1631012877126"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1934"
              width="14"
              height="14"
            >
              <path
                d="M748.896 624.16l-221.44-137.888 0-223.648c0-14.624-11.84-26.496-26.496-26.496s-26.496 11.84-26.496 26.496l0 238.336c0 9.152 4.736 17.664 12.48 22.464l233.92 145.664c4.352 2.688 9.184 4 13.984 4 8.832 0 17.472-4.416 22.496-12.48 7.744-12.416 3.936-28.768-8.48-36.48z"
                p-id="1935"
                fill="#8a8a8a"
              ></path>
              <path
                d="M512 0c-282.336 0-512 229.664-512 512s229.664 512 512 512c282.304 0 512-229.696 512-512s-229.696-512-512-512zM512 971.04c-253.12 0-459.04-205.92-459.04-459.04s205.92-459.04 459.04-459.04c253.12 0 459.04 205.92 459.04 459.04s-205.92 459.04-459.04 459.04z"
                p-id="1936"
                fill="#8a8a8a"
              ></path></svg
            >{{ his }}</span
          >
          <span class="delete" @click="criterion(index)">X</span>
        </li>
      </ol>
    </section>
    <section class="suggest" v-if="value && !searching">
      <h5>搜索"{{ value }}"</h5>
      <ul>
        <li
          v-for="(suggestss, index) in suggests"
          :key="index"
          @click="
            value = suggestss.keyword;
            searching = true;
          "
        >
          <svg
            t="1630409169525"
            class="icon icon-sousuo"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2789"
            width="14"
            height="14"
          >
            <path
              d="M990.980258 969.944422l-185.094554-185.094554c83.911344-83.23135 135.990938-198.518449 135.990938-325.781454C941.876642 205.950391 735.934251 0 482.824228 0 229.698205 0 23.747814 205.950391 23.747814 459.076413c0 253.142022 205.950391 459.060414 459.076414 459.060414 103.079195 0 198.334451-34.167733 275.037851-91.759283l188.342529 188.342528c6.183952 6.183952 14.279888 9.271928 22.383825 9.271928s16.199873-3.087976 22.391825-9.271928a31.655753 31.655753 0 0 0 0-44.77565zM87.06732 459.076413c0-218.222295 177.534613-395.748908 395.756908-395.748908 218.206295 0 395.732908 177.526613 395.732908 395.748908 0 218.198295-177.526613 395.740908-395.732908 395.740909-218.222295 0-395.756908-177.542613-395.756908-395.740909z"
              fill="#838384"
              p-id="2790"
            ></path>
          </svg>
          <span>
            {{ suggestss.keyword }}
          </span>
        </li>
      </ul>
    </section>
    <section class="result" v-if="searching">
      <!-- <h5>搜索结果</h5> -->
      <ul>
        <li
          v-for="(item, index) in searchResults"
          :key="index"
          @click="$emit(`change-current-song`, item)"
        >
          <div class="left">
            <div class="title">{{ item.name }}</div>
            <div class="info">
              <!-- <em v-if="item.song.exclusive"></em> -->
              <i
                class="artist"
                v-for="(artist, index) in item.artists"
                :key="index"
              >
                {{ artist.name }}
              </i>
              <b>{{ item.album.name }}</b>
            </div>
          </div>
          <div class="icon">
            <div
              class="play"
              :class="{ current: currentSongId === item.id, playing: playing }"
            >
              <i></i>
              <i></i>
              <i></i>
            </div>
          </div>
        </li>
      </ul>
      <p v-if="!hasMore">没有更多了</p>
    </section>
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
      hots: [],
      value: "",
      suggests: [],
      searchResults: [],
      searching: false,
      inputing: false,
      page: 0,
      hasMore: false,
      history: JSON.parse(window.localStorage.getItem("history")) || [],
      hiss: [],
    };
  },

  methods: {
    //判断是否触底
    scroll: function (event) {
      // console.log(event);
      // console.log(event.target.offsetHeight);
      // console.log(event.target.scrollTop);
      // console.log(event.target.scrollHeight);
      console.log(this.hiss);

      if (
        event.target.offsetHeight + event.target.scrollTop ===
        event.target.scrollHeight
      ) {
        console.log("底部");
        this.getSearch();
      }
    },

    //搜索结果
    getSearch: function () {
      this.axios
        .get("http://apis.netstart.cn/music/search", {
          params: {
            keywords: this.value,
            limit: 30,
            offset: this.page * 30,
          },
        })
        .then((res) => {
          this.searchResults.push(...res.data.result.songs);
          // 触底加页
          this.page++;
          this.hasMore = res.data.result.hasMore;
          //  console.log(res.data);

          //历史记录
          this.history = [...new Set([...this.history, this.value])];
          window.localStorage.setItem("history", JSON.stringify(this.history));
        });
    },

    criterion: function (index) {
      console.log(index);
      // for (var i = 0; i < this.history.length; i++) {
      //   if(index = i) {
          this.history.splice(index, 1);
        // }      
      // }
      window.localStorage.setItem("history", JSON.stringify(this.history));
    },
  },

  created: function () {
    this.axios.get("http://apis.netstart.cn/music/search/hot").then((res) => {
      // console.log(res);
      this.hots = res.data.result.hots;
    });
  },
  watch: {
    value: function (n) {
      if (this.inputing) {
        this.searching = false;
      }
      if (n && !this.searching) {
        //ajax 参数对象的形式
        this.axios
          .get("http://apis.netstart.cn/music/search/suggest", {
            params: {
              keywords: n,
              type: "mobile",
            },
          })
          .then((res) => {
            this.suggests = res.data.result.allMatch;
          });
      } else {
        this.suggests = [];
      }
    },

    searching: function (n) {
      if (n && this.value) {
        //ajax 参数对象的形式
        this.getSearch();
      } else {
        this.searchResults = [];
      }
      // console.log(this.searchResults);
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  width: 100vw;
  padding: 15px;
  div {
    position: relative;
    svg.icon-sousuo {
      position: absolute;
      top: 7px;
      left: 10px;
    }
    input {
      width: 100%;
      height: 30px;
      border-radius: 30px;
      background-color: rgb(240, 240, 240);
      //缩进
      text-indent: 30px;
      //取消高亮
      outline: none;
      border: none;
    }
  }

  .hots {
    margin-top: 20px;

    h5 {
      font-size: 12px;
    }
    ul {
      margin-top: 5px;
      color: rgb(32, 32, 32);
      font-size: 14px;

      li {
        float: left;
        border: 0.2px solid rgb(219, 216, 216);
        border-radius: 20px;
        height: 2em;
        padding: 0px 14px;
        margin: 8px;
        line-height: 2em;
      }
    }
  }
  .record {
    clear: both;
    color: #000;

    margin-top: 20px;

    ol {
      margin-top: 10px;
      font-size: 14px;

      li {
        display: flex;
        justify-content: space-between;
        line-height: 3;
        border-bottom: 1px solid rgba(226, 225, 225, 0.541);

        svg {
          margin-right: 10px;
        }
        span.delete {
          display: block;
          margin: 0 10px 0 10px;
          color: #888;
        }
      }
    }
  }

  .suggest {
    clear: both;

    h5 {
      line-height: 3;
      color: rgb(80, 125, 175);
      border-bottom: 1px solid rgba(226, 225, 225, 0.541);
    }
    li {
      display: flex;
      align-items: center;
      line-height: 3;
      border-bottom: 1px solid rgba(226, 225, 225, 0.541);

      svg {
        margin-right: 10px;
      }
      span {
        display: block;
        margin: 0 10px 0 10px;
      }
    }
  }

  .result {
    clear: both;
    ul {
      li {
        padding: 5px 12px 5px 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(212, 212, 212, 0.4);
        margin-left: 12px;

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
              color: rgb(80, 125, 175);

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

            display: flex;
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