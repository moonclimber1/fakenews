<template>
  <div class="home">
    <moving-circle />
    <start-screen/>
    
  </div>
</template>

<script>

import MovingCircle from "../components/MovingCircle";
import StartScreen from '../components/StartScreen.vue';



export default {
  name: "Home",
  components: {
    MovingCircle,
    StartScreen,
  },
};
</script>

<style lang="scss"></style>
