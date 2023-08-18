<template>
  <div class="create-room">
    <div class="name">
      <span class="hint">你的昵称：</span>
        <input
            :maxlength="10"
            type="text"
            placeholder="请输入昵称"
            v-model="nickname"
        />
    </div>
    <div class="password">
      <span class="hint">房间密码：</span>
        <input
            type="text"
            :maxlength="10"
            placeholder="(可选)"
            v-model="password"
        />
    </div>
    <button @click="create()">确认创建</button>
  </div>
</template>

<script>

import {createRoom} from "@/http/room";

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
      const res = await createRoom({
        name: this.nickname,
        password: this.password
      })

      if (res && res.status === 200) {
        const data = res.data;

        console.log(data);
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.create-room {
  padding: 1rem 1rem 0;
  text-align: center;
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .tile-wrapper {
    display: flex;
    flex-wrap: wrap;
    .room-character-tile {
      flex: 1 1 33%;
      padding: 1rem 0;
    }
  }

  .name,
  .password {
    .hint {
      position: relative;
      bottom: 0.04em;
      word-break: keep-all;
      margin-right: 0.5rem;
      font-weight: bold;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
    input {
      max-width: calc(100% - 1rem);
      padding: 0 0.5rem;
      line-height: 2.4rem;
      overflow: visible;
    }
    .useborder {
      max-width: 50%;
    }
  }

  .btn {
    margin: auto;
  }
}
</style>