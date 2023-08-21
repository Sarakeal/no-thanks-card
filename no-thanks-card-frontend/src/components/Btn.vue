<template>
  <div class="max-w-3xl mx-auto py-6 px-4">
    <button @click="onClick"
            class="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring focus:ring-violet-300 rounded-md py-2 px-8 text-white font-semibold shadow-md">
      {{ content }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Btn",
  props: {
    content: String,
    onClick: {type: Function, default: () => {}}
  }
}
</script>

<style scoped>

</style>