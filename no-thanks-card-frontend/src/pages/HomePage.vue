<template>
  <div class="main-page">
    {{ msg }}

    <div class="flex flex-col h-screen justify-center items-center">
      <div class="max-w-3xl mx-auto py-10 px-4 text-6xl">
        不谢牌
      </div>
      <div class="max-w-3xl mx-auto py-6 px-4">
        <button @click="$router.push('create-room')"
                class="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring focus:ring-violet-300 rounded-md py-2 px-8 text-white font-semibold shadow-md">
          创建房间
        </button>
      </div>
      <div class="max-w-3xl mx-auto py-6 px-4">
        <button @click="$router.push('join-room')"
                class="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring focus:ring-violet-300 rounded-md py-2 px-8 text-white font-semibold shadow-md">
          加入房间
        </button>
      </div>
    </div>
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
