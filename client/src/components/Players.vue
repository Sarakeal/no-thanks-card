<template>
  <div v-for="(player, index) in players" :key="index"
       class="flex flex-col items-center justify-center mb-24 relative text-xs">
    <div class="border-2 rounded-full relative">
      <img class="w-24" :src="require(`../assets/avatar/${player.avatar}.png`)"/>
      <div
          class="player-index-tag absolute whitespace-nowrap px-2 translate-x-[-50%] rounded-full text-white text-sm bg-orange-600">
        {{ player.index }}
      </div>
      <div v-if="player.id === gameInfo.creatorId"
           class="room-host-tag absolute whitespace-nowrap px-2 translate-x-[-50%] rounded-full text-white text-sm bg-orange-600">
        房主
      </div>
    </div>
    <div class="text-sm">{{ player.name }}</div>
    <div>筹码：<span class="text-xl">{{ player.money }}</span></div>
    <div>分数：<span class="text-xl">{{ player.score }}</span></div>
    <div class="player-card-list right" :style="{top: player.cardsTop + 'px'}">
      <div v-for="(card, index) in player.cards" :key="index"
           :style="{left: card.left + 'px', top: card.top + 'px'}"
           :class="['card-' + card.number, {active: card.up}]"
           class="card small-card"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Players",
  props: {
    players: [],
  }
}
</script>

<style scoped>

</style>