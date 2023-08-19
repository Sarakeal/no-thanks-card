<template>
  <div class="join-room">
    <div class="title">加入房间</div>
    <div class="number">
      <span class="hint">房号：</span>
        <input maxlength="6" type="text" v-model="roomNumber" />
    </div>
    <div class="pw">
      <span class="hint">密码：</span>
        <input
            maxlength="20"
            type="text"
            v-model="password"
        />
    </div>
    <div class="name">
      <span class="hint">昵称：</span>
        <input
            :maxlength="8"
            type="text"
            placeholder=""
            v-model="nickname"
        />
    </div>
    <div class="spacer"></div>
    <button @click="join">确认加入</button>
  </div>
</template>

<script>
import {joinRoom} from "@/http/room";
import router from "@/router";
import {joinRoomSocket} from "@/socket";
import {setToken} from "@/utils/token";

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

        joinRoomSocket(this.roomNumber);

        // FIXME
        setToken("ID", this.roomNumber);

        router.push({
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
.join-room {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  .title {
    font-weight: bold;
    font-size: 2rem;
    padding: 2rem;
  }

  .pw,
  .name,
  .number {
    .hint {
      position: relative;
      bottom: 0.08em;
      word-break: keep-all;
      margin-right: 0.5rem;
      font-weight: bold;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    input {
      max-width: calc(100% - 1rem);
      padding: 0 0.5rem;
      line-height: 2.4rem;
      overflow: visible;
    }
  }

  .spacer {
    flex: 1;
  }
}
</style>