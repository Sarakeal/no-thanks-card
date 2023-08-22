<template>
  <div class="relative">
    <div v-if="canPlay" class="absolute time-countdown text-xl rounded-full border-2 border-gray-900 bg-white p-2">
      <span>{{ gameInfo.timeout < 0 ? "0" : gameInfo.timeout }}</span> <span class="text-red-500">S</span>
    </div>
    <div class="mx-4 shadow-lg rounded-lg overflow-hidden border-2 relative">
      <div class="flex">
        <div class="w-1/3 px-6 py-4 sm:items-center">
          <img src="http://source.unsplash.com/100x100"
               class="block mx-auto mb-4 rounded border-gray-400 sm:mb-0 sm-ml-0"/>
          <div class="text-center ">
            <div class="mt-4">
              <p class="leading-tight">玩家名称：<b class="text-blue-700">{{ player.name }}</b></p>
              <p class="leading-tight">剩余筹码：{{ player.money }}</p>
<!--              <p class="leading-tight">当前分数：{{ player.name }}</p>-->
            </div>
          </div>
        </div>
        <div class="w-2/3">
          <div class="">拥有的卡牌：</div>
          <div class="flex flex-wrap">
            <div v-for="(card, index) in cards" :key="index"
                 class="flex justify-center items-center w-8 h-12 rounded border-gray-900 border-2 m-1 font-bold">
              {{ card }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {currentPlayer, gameInfo} from "@/reactivity/game";

export default {
  name: "PlayerInfo",
  props: {
    player: Object,
  },
  methods: {},
  data() {
    return {
    }
  },
  created() {
    if (this.canPlay) {
      setInterval(
          () => (this.gameInfo.timeout -= 1),
          1000
      );
    }
  },
  computed: {
    gameInfo: function() {
      return gameInfo.value;
    },
    canPlay: function () {
      return this.player._id === currentPlayer.value._id;
    },
    cards: function() {
      return [...this.player.cards].sort((a, b) => a - b);
    }
  }
}
</script>

<style lang="scss" scoped>
.time-countdown {
  right: 1rem;
  top: -2rem;
  z-index: 10;
}
</style>