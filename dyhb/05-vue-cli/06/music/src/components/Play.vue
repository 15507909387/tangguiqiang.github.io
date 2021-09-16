<template>
  <footer class="play" :class="{ playing: playing }">
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
    >
      <PlayBar
        v-show="!showPlayPage"
        :currentSong="currentSong"
        :playing="playing"
        :duration="duration"
        :currentTime="currentTime"
        :currentPlayList="currentPlayList"
        @toggle-playing-state="$emit('toggle-playing-state')"
        @toggle-show-play-list="showPlayList = $event"
        @toggle-show-play-page="showPlayPage = $event"
      />
    </transition>

    <PlayList
      v-if="showPlayList"
      :currentSong="currentSong"
      :playing="playing"
      :currentPlayList="currentPlayList"
      @toggle-show-play-list="showPlayList = $event"
      @change-current-song="$emit(`change-current-song`,$event),$emit(`change-current-play-list`,$event)"
    />
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <PlayPage
        v-if="showPlayPage"
        @toggle-show-play-page="showPlayPage = $event"
        :currentSong="currentSong"
        :currentTime="currentTime"
        :duration="duration"
        :playing="playing"
        @toggle-playing-state="$emit('toggle-playing-state')"
        @toggle-show-play-list="showPlayList = $event"
        @page-top="$emit('page-top')"
        @page-bottom="$emit('page-bottom')"
        @current-time-change="$emit('current-time-change',$event)"
      />
    </transition>
  </footer>
</template>

<script>
import PlayBar from "@/components/PlayBar.vue";
import PlayList from "@/components/PlayList.vue";
import PlayPage from "@/components/PlayPage.vue";

export default {
  components: {
    PlayBar,
    PlayList,
    PlayPage,
  },
  props: {
    currentSong: Object,
    playing: Boolean,
    duration: Number,
    currentTime: Number,
    currentPlayList: Array,
  },
  data: function () {
    return {
      showPlayList: false,
      showPlayPage: false,
    };
  },
};

</script>

<style lang="less" scoped>
</style>