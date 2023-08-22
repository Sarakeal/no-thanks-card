<template>
  <div class="dialog-wrapper" v-show="dialogInfo.isShow">
    <div class="flex h-screen justify-center items-center">
      <div class="w-1/6 h-fit bg-white border-2 border-gray-900 rounded-xl">
        <div class="p-4 font-bold text-2xl">提示框</div>
        <span v-html="dialogInfo?.content"></span>
        <div class="max-w-3xl mx-auto py-3 px-4">
          <button @click="close" class="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:ring focus:ring-violet-300 rounded-md py-2 px-8 text-white font-semibold shadow-md">
            确认
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {dialog} from "@/reactivity/dialog";

export default {
  name: "Dialog",
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.dialogInfo.isShow = false;
    }
  },
  computed: {
    dialogInfo() {
      return dialog.value || {isShow: false, content: "测试信息", showTime: 0}
    }
  },
}
</script>

<style lang="scss" scoped>
.dialog-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  .dialog-content {
    margin: auto;
    width: 10rem;
    flex: auto;
  }
}
</style>