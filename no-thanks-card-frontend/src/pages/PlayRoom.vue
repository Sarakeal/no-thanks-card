<template>
  <div>
    <div v-if="canPlay">
      I can play
    </div>
    <div v-else>
      I can't play
    </div>
  </div>
</template>

<script>
import {currentPlayer, selfPlayer} from "@/reactivity/game";

export default {
  name: "PlayRoom",
  computed: {
    canPlay: function() {
      return selfPlayer.value._id === currentPlayer.value._id;
    }
  }
}
</script>

<style scoped>

</style>