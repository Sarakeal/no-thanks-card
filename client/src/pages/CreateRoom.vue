<template>
  <div class="create-room">
    <div class="flex flex-col h-screen justify-center items-center">
      <div class="max-w-3xl mx-auto py-10 px-4 text-6xl">
        创建房间
      </div>
      <div class="flex text-2xl py-4">
        <div class="flex-auto">
          你的昵称：
        </div>
        <input
            class="px-4 border border-gray-400 bg-gray-100 rounded text-base hover:outline-none hover:border-indigo-600"
            :maxlength="10"
            type="text"
            placeholder="请输入昵称"
            v-model="nickname"
        />
      </div>
      <div class="flex text-2xl py-4 text-center">
        <div class="flex-auto">
          房间密码：
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
        <button @click="create"
                class="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring focus:ring-violet-300 rounded-md py-2 px-8 text-white font-semibold shadow-md">
          确认创建
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import {createRoom} from "@/http/room";
import router from "@/router";
import {joinRoomSocket} from "@/socket";
import {setToken} from "@/utils/token";
import {selfPlayer} from "@/reactivity/game";
import {showDialog} from "@/reactivity/dialog";

export default {
  name: 'CreateRoom',
  data() {
    return {
      nickname: '',
      password: ''
    }
  },
  methods: {
    async create() {
      if (!this.nickname) return showDialog("请填写昵称!");
      if (!this.password) return showDialog("请填写密码!");

      const res = await createRoom({
        name: this.nickname,
        password: this.password
      })

      if (res && res.status === 200) {
        const data = res.data;
        selfPlayer.value = res.data.player;

        joinRoomSocket(data.roomNumber);

        await router.push({
          name: "waitRoom",
          query: {
            pw: this.password,
            number: data.roomNumber
          }
        });

        setToken(data.ID, data.roomNumber);
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>