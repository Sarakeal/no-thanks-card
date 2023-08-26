<template>
  <div class="wait-room">
    <div class="flex flex-col h-screen justify-center items-center">
      <div class="max-w-3xl mx-auto py-10 px-4 text-6xl">
        不谢牌
      </div>
      <div class="player-list flex">
        <div v-for="(player, index) in playerList" :key="index"
             class="flex flex-col items-center justify-center mx-4 relative text-xs">
          <div class="border-2 rounded-full relative">
            <img class="w-24 h-24" :src="require(`../assets/avatar/${player.avatar}.png`)"/>
            <div
                class="player-index-tag absolute whitespace-nowrap px-2 translate-x-[-50%] rounded-full text-white text-sm bg-orange-600">
              {{ player.index }}
            </div>
            <div v-if="player.id === creatorId"
                 class="room-host-tag absolute whitespace-nowrap px-2 translate-x-[-50%] rounded-full text-white text-sm bg-orange-600">
              房主
            </div>
          </div>
          <div class="text-xl font-bold text-orange-600 mt-4">{{ player.name }}</div>
        </div>
      </div>
      <div class="max-w-3xl mx-auto py-6 px-4">
        <button @click="gameBegin"
                class="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring focus:ring-violet-300 rounded-md py-2 px-8 text-white font-semibold shadow-md">
          开始游戏
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {players} from "@/reactivity/game";
import {gameBegin, initRoom} from "@/http/room";
import {RoomStatus} from "../../shared/constants";
import {showDialog} from "@/reactivity/dialog";
import router from "@/router";
import {joinRoomSocket} from "@/socket";

export default {
  name: 'WaitRoom',
  methods: {gameBegin},
  data() {
    return {
      creatorId: '',
      playerList: players
    }
  },
  async created() {
    let roomNumber = this.$route.query['number'];
    let password = this.$route.query['pw'];
    const res = await initRoom({roomNumber: roomNumber})
    if (res && res.status === 200) {
      const data = res.data;
      this.creatorId = res.data.creatorId;
      if (data.status === RoomStatus.Waiting) {
        players.value = res.data.players;
        joinRoomSocket(roomNumber);
      } else if (data.status === RoomStatus.Running || data.status === RoomStatus.End) {
        // 直接跳转到游戏界面
        await router.push({
          name: "playRoom",
          query: {
            pw: password,
            number: roomNumber
          }
        });
        joinRoomSocket(roomNumber);
      } else {
        showDialog("房间不存在！");
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.player-index-tag {
  left: 83px;
  top: 80px;
  z-index: 20;
}
.room-host-tag {
  left: 10px;
  top: -10px;
  z-index: 20;
}
</style>