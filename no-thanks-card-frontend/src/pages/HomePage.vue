<template>
  <div class="main-page">
    {{ msg }}

    <button @click="$router.push('create-room')">创建房间</button>
    <button @click="$router.push('join-room')">加入房间</button>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  created() {
  }
}
</script>

<style scoped>

</style>
