<template>
  <div>
    <div class="player-list">
      <div v-for="player in playerList" :key="player.index" class="player-item">
        <div class="player-name">玩家名称：{{ player.name }}</div>
        <div class="player-money">筹码：{{ player.money }}</div>
        <div class="player-cards">
          所有卡片：
          <div v-for="(card, index) in player.cards" :key="index">
            {{ card }}
          </div>
        </div>
        <button v-show="canPlay && show(player)" @click="act(Action.ACCEPT)">Accept</button>
        <button v-show="canPlay && show(player)" @click="act(Action.REJECT)">No thanks!</button>
      </div>
    </div>
  </div>
</template>

<script>
import {currentPlayer, selfPlayer} from "@/reactivity/game";
import {players} from "@/reactivity/game";
import {Action} from "../../shared/httpMsg/PlayerActMsg";
import {act} from "@/reactivity/playAction";

export default {
  name: "PlayRoom",
  methods: {
    act,
    show(player) {
      return player._id === selfPlayer.value._id;
    }
  },
  data() {
    return {
      playerList: players
    }
  },
  computed: {
    Action() {
      return Action
    },
    canPlay: function() {
      return selfPlayer.value._id === currentPlayer.value._id;
    }
  }
}
</script>

<style lang="scss" scoped>
.player-list {
  .player-item {
    width: 200px;
    float: left;
  }
}
</style>