<template>
  <div class="wait-room">
    <div class="flex flex-col h-screen justify-center items-center">
      <div class="max-w-3xl mx-auto py-10 px-4 text-6xl">
        不谢牌
      </div>
      <div class="player-list flex">
        <div v-for="(player, index) in playerList" :key="index">
          <div class="mx-4 mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
            <div class="px-6 py-4 sm:items-center">
              <img :src="require(`../assets/avatar/${player.avatar}.png`)"
                   class="block mx-auto mb-4 rounded border-gray-400 sm:mb-0 sm-ml-0"/>
              <div class="text-center ">
                <div class="mt-4">
                  <p class="text-xl leading-tight">{{ player.name }}</p>
                </div>
              </div>
            </div>
          </div>
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
      playerList: players
    }
  },
  async created() {
    let roomNumber = this.$route.query['number'];
    let password = this.$route.query['pw'];
    const res = await initRoom({roomNumber: roomNumber})
    if (res && res.status === 200) {
      const data = res.data;
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

</style>