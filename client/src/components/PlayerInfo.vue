<template>
  <div class="player-info-content relative">
    <div v-if="canPlay" class="absolute time-countdown text-xl rounded-full border-2 border-gray-900 bg-white p-2">
      <span>{{ gameInfo.timeout < 0 ? "0" : gameInfo.timeout }}</span> <span class="text-red-500">S</span>
    </div>
    <div class="mx-4 shadow-lg rounded-lg overflow-hidden border-2 relative">
      <div class="flex">
        <div class="info-half px-2 py-2 sm:items-center">
          <img :src="require(`../assets/avatar/${player.avatar}.png`)"
               class="block mx-auto mb-4 rounded border-gray-400 sm:mb-0 sm-ml-0"/>
          <div class="text-center ">
            <div class="mt-4">
              <div>
                <span class="info-desc">玩家信息：</span>
                <span class="info-value">{{ player.name }}</span>
              </div>
              <div>
                <span class="info-desc">剩余筹码：</span>
                <span class="info-value">{{ player.money }}</span>
              </div>
              <div>
                <span class="info-desc">当前分数：</span>
                <span class="info-value">{{ calcScore(player.cards) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="info-half">
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
import {calcScore} from "../utils";

export default {
  name: "PlayerInfo",
  props: {
    player: Object,
  },
  methods: {calcScore},
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
      return this.player._id === currentPlayer?.value._id;
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
.player-info-content {
  width: 28rem;
  .info-half {
    width: 50%;
  }
  .info-desc {
    font-size: 0.6rem;
  }
  .info-value {
    font-size: 1.6rem;
    font-weight: bold;
    color: cornflowerblue;
  }
}
</style>