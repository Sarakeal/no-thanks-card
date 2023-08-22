<template>
  <div class="h-screen ">
    <div class="max-w-3xl mx-auto py-10 px-4 text-6xl">
      不谢牌
    </div>
    <div class="grid grid-rows-1 grid-cols-3 gap-4">
      <div v-for="(player) in firstRowPlayers" :key="player._id" class="col-span-1 m-4">
        <PlayerInfo :player="player"></PlayerInfo>
      </div>
      <div class="row-span-1 col-span-3">
        <div class="flex h-full justify-center mx-4">
          <div
              class="border-4 w-64 h-full font-bold py-10 flex justify-center items-center border-gray-900 rounded-3xl">
            <div class="main-card-number">{{ gameInfo.card !== 0 ? gameInfo.card : '#' }}</div>
          </div>
          <div class="w-96 mx-4 flex items-center">
            <div>
              <div class="flex flex-wrap">
                <div v-for="index in [...Array(gameInfo.dealerMoney || 0).keys()]" :key="'dm' + index" class="mx-4 my-4">
                  <div class="w-16 h-16 bg-blue-600 rounded-full border-gray-900 border-2"></div>
                </div>
              </div>
              <div class="text-4xl">桌上筹码总数：{{ gameInfo.dealerMoney || 0 }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-for="(player) in secondRowPlayers" :key="player._id" class="col-span-1 m-4">
        <PlayerInfo :player="player"></PlayerInfo>
      </div>
      <div v-for="index in [...Array(2 - secondRowPlayers.length).keys()]" :key="'space' + index" class="col-span-1 m-4"></div>
      <div class="col-span-1 my-4 relative">
        <div class="absolute action-btn" v-show="canPlay">
          <div class="float-left max-w-3xl mx-auto py-6 px-4">
            <button @click="accept" class="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring focus:ring-violet-300 rounded-md py-2 px-8 text-white font-semibold shadow-md">
              Take it!
            </button>
          </div>
          <div  class="float-left max-w-3xl mx-auto py-6 px-4">
            <button @click="reject" class="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring focus:ring-violet-300 rounded-md py-2 px-8 text-white font-semibold shadow-md">
              No thanks!
            </button>
          </div>
        </div>
        <PlayerInfo :player="selfPlayer"></PlayerInfo>
      </div>
    </div>
  </div>
</template>

<script>
import {currentPlayer, selfPlayer} from "@/reactivity/game";
import {players, gameInfo} from "@/reactivity/game";
import {Action} from "../../shared/httpMsg/PlayerActMsg";
import {act} from "@/reactivity/playAction";
import PlayerInfo from "@/components/PlayerInfo.vue";
import {initRoom} from "@/http/room";
import {RoomStatus} from "../../shared/constants";
import router from "@/router";
import {joinRoomSocket} from "@/socket";
import {showDialog} from "@/reactivity/dialog";

export default {
  name: "PlayRoom",
  components: {PlayerInfo},
  methods: {
    async accept() {
      await act(Action.ACCEPT);
    },
    async reject() {
      await act(Action.REJECT);
    }
  },
  data() {
    return {
    }
  },
  async created() {
    let roomNumber = this.$route.query['number'];
    let password = this.$route.query['pw'];
    const res = await initRoom({roomNumber: roomNumber})
    if (res && res.status === 200) {
      const data = res.data;
      if (data.status === RoomStatus.Waiting) {
        await router.push({
          name: "waitRoom",
          query: {
            pw: password,
            number: roomNumber
          }
        });
      } else if (data.status === RoomStatus.Running || data.status === RoomStatus.End) {
        joinRoomSocket(roomNumber);
      } else {
        showDialog("房间不存在！");
      }
    }
  },
  computed: {
    gameInfo: function() {
      return gameInfo.value;
    },
    canPlay: function () {
      return selfPlayer.value._id === currentPlayer.value._id;
    },
    selfPlayer: function () {
      return players.value.find(p => p._id === selfPlayer.value._id);
    },
    firstRowPlayers: function () {
      return players.value.filter(p => p._id !== selfPlayer.value._id).splice(0, 3) || [];
    },
    secondRowPlayers: function () {
      return players.value.filter(p => p._id !== selfPlayer.value._id).splice(3, 5) || [];
    },
  }
}
</script>

<style lang="scss" scoped>
.main-card-number {
  font-size: 12rem;
}

.action-btn {
  left: 0;
  top: -5rem;
}
</style>