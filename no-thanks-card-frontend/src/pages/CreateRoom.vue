<template>
  <div class="main-page">
    <button>确认</button>
  </div>
</template>

<script>
import {setup} from "@/socket";

export default {
  name: 'CreateRoom',
  props: {
    msg: String
  },
  created() {
    setup();
  }
}
</script>

<style scoped>

</style>
