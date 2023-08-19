<template>
  <div class="wait-room">
    <div class="player-list">
      <div v-for="item in playerList" :key="item.index">
        <span class="player-name">{{ item.name }}</span>
      </div>
    </div>
    <button>开始游戏</button>
  </div>
</template>

<script>

import {players} from "@/reactivity/game";

export default {
  name: 'WaitRoom',
  data() {
    return {
      playerList: players
    }
  },
  methods: {

  }
}
</script>


<style lang="scss" scoped>

</style>