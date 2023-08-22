<template>
  <div id="app">
    <router-view/>
    <Dialog></Dialog>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<script setup lang="ts">
import Dialog from "@/components/Dialog.vue";
</script>