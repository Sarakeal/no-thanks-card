<template>
  <div class="wait-room">
    <div class="flex flex-col h-screen justify-center items-center">
      <div class="max-w-3xl mx-auto py-10 px-4 text-6xl">
        不谢牌
      </div>
      <div class="player-list flex">
        <div v-for="item in playerList" :key="item.index">
          <div class="mx-4 mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
            <div class="px-6 py-4 sm:items-center">
              <img src="http://source.unsplash.com/100x100" class="block mx-auto mb-4 rounded border-gray-400 sm:mb-0 sm-ml-0"/>
              <div class="text-center ">
                <div class="mt-4">
                  <p class="text-xl leading-tight">{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="max-w-3xl mx-auto py-6 px-4">
        <button @click="gameBegin()"
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

export default {
  name: 'WaitRoom',
  methods: {gameBegin},
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