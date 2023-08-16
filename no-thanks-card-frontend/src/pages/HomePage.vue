<template>
  <div class="main-page">
    {{ msg }}
  </div>
</template>

<script>
import {setup} from "@/socket";

export default {
  name: 'HomePage',
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
