<template>
  <div id="app">
    <HomePage msg="Home"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomePage from './pages/HomePage.vue';

@Component({
  components: {
    HomePage: HomePage,
  },
})
export default class App extends Vue {}
</script>

<style>

</style>
