<template>
  <div class="h-screen ">
    <div class="max-w-3xl mx-auto py-10 px-4 text-6xl">
      不谢牌
    </div>
    <div class="grid grid-rows-4 grid-cols-3 gap-4">
      <div v-for="(player) in firstRowPlayers" :key="player._id" class="col-span-1 m-4">
        <PlayerInfo :player="player"></PlayerInfo>
      </div>
      <div class="row-span-2 col-span-3">
        <div class="flex h-full justify-center mx-4">
          <div
              class="border-4 w-80 h-full font-bold py-10 flex justify-center items-center border-gray-900 rounded-3xl">
            <div class="main-card-number">{{ card }}</div>
          </div>
          <div class="w-96 mx-4 flex items-center">
            <div>
              <div class="flex flex-wrap">
                <div v-for="index in [...Array(dealerMoney || 0).keys()]" :key="'dm' + index" class="mx-4 my-4">
                  <div class="w-16 h-16 bg-blue-600 rounded-full border-gray-900 border-2"></div>
                </div>
              </div>
              <div class="text-4xl">桌上筹码总数：{{ dealerMoney || 0 }}</div>
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
<!--          <Btn class="float-left" content="Take it!" @click="accept"></Btn>-->
<!--          <Btn class="float-left" content="No thanks!" @click="reject"></Btn>-->
        </div>
        <PlayerInfo :player="selfPlayer"></PlayerInfo>
      </div>
    </div>
  </div>
</template>

<script>
import {currentPlayer, selfPlayer} from "@/reactivity/game";
import {players, dealerMoney, card} from "@/reactivity/game";
import {Action} from "../../shared/httpMsg/PlayerActMsg";
import {act} from "@/reactivity/playAction";
import PlayerInfo from "@/components/PlayerInfo.vue";
// import Btn from "@/components/Btn.vue";

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
  computed: {
    dealerMoney: function() {
      return dealerMoney.value;
    },
    card: function() {
      return card.value;
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