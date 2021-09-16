<template>
  <section class="play-list">
    <div
      class="mask animate__animated animate__fadeIn"
      @click.stop="$emit('toggle-show-play-list', false)" 
    ></div>
    <div class="swiper animate__animated animate__slideInUp">
      <div class="card">
        <ul class="list">
          <SongListItem
            v-for="(item, index) in currentPlayList"
            :key="item.id"
            :item="item"
            :currentSongId="currentSong.id"
            :playing="playing"
            @change-current-song="$emit('change-current-song', $event)"
          >{{ (index + 1).toString().padStart(2, "0") }}</SongListItem>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import SongListItem from "@/components/SongListItem.vue";

export default {
  components: {
    SongListItem,
  },
  props:{

    currentSong: Object,
    playing: Boolean,
    showPlayList: Boolean,
    currentPlayList: Array,

 
   
   
  }
};
</script>

<style lang="less" scoped>
.play-list {
  z-index: 1;
  width: 100%;
  height: 100%;
  // background: red;
  position: fixed;
  left: 0;
  top: 0;
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
  }
  .swiper {
    width: 100%;
    height: 60vh;
    // background: #000;
    position: absolute;
    bottom: 10px;
    padding: 0 10px;

    .card {
      background: white;
      height: 100%;
      border-radius: 15px;

      padding: 15px 0;
      ul.list {
        height: 100%;
        overflow: auto;
      }
    }
  }
}
</style>