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
import {initRoom} from "@/http/room";

export default {
  name: 'WaitRoom',
  data() {
    return {
      playerList: players
    }
  },
  async mounted() {
    let number = this.$route.query['number'];
    const res = await initRoom({roomNumber: number})
    if (res && res.status === 200) {
      players.value = res.data.players;
    }
  }
}
</script>


<style lang="scss" scoped>

</style>