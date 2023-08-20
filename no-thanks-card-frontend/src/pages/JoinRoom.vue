<template>
  <div class="join-room">
    <div class="flex flex-col h-screen justify-center items-center">
      <div class="max-w-3xl mx-auto py-10 px-4 text-6xl">
        加入房间
      </div>

      <div class="flex text-2xl py-4 text-center">
        <div class="flex-auto">
          昵称：
        </div>
        <input
            class="px-4 border border-gray-400 bg-gray-100 rounded text-base hover:outline-none hover:border-indigo-600"
            :maxlength="10"
            type="text"
            placeholder="请输入昵称"
            v-model="nickname"
        />
      </div>
      <div class="flex text-2xl py-4">
        <div class="flex-auto">
          房号：
        </div>
        <input
            class="px-4 border border-gray-400 bg-gray-100 rounded text-base hover:outline-none hover:border-indigo-600"
            :maxlength="6"
            type="text"
            placeholder="请输入房号"
            v-model="roomNumber"
        />
      </div>
      <div class="flex text-2xl py-4 text-center">
        <div class="flex-auto">
          密码：
        </div>
        <input
            class="px-4 border border-gray-400 bg-gray-100 rounded text-base hover:outline-none hover:border-indigo-600"
            :maxlength="10"
            type="text"
            placeholder="请输入密码"
            v-model="password"
        />
      </div>
      <div class="max-w-3xl mx-auto py-6 px-4">
        <button @click="join"
                class="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring focus:ring-violet-300 rounded-md py-2 px-8 text-white font-semibold shadow-md">
          确认加入
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {joinRoom} from "@/http/room";
import router from "@/router";
import {joinRoomSocket} from "@/socket";
import {setToken} from "@/utils/token";
import {selfPlayer} from "@/reactivity/game";

export default {
  name: "JoinRoom",
  data() {
    return {
      roomNumber: '',
      nickname: '',
      password: ''
    }
  },
  methods: {
    async join() {
      const res = await joinRoom({
        name: this.nickname,
        roomNumber: this.roomNumber,
        password: this.password
      })

      if (res && res.status === 200) {
        const data = res.data;

        joinRoomSocket(this.roomNumber);
        selfPlayer.value = data.player;

        setToken(data.ID, this.roomNumber);

        await router.push({
          name: "waitRoom",
          query: {
            pw: this.password,
            number: this.roomNumber
          }
        });
      }

    }
  }
}
</script>


<style lang="scss" scoped>

</style>