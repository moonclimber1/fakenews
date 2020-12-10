<template>
  <div class="home">
    <moving-circle />
    <start-screen/>
  </div>
</template>

<script>

import MovingCircle from "../components/MovingCircle";
import StartScreen from '../components/StartScreen.vue';
import StartTextWall from "../components/StartTextWall.vue";
import TextLayer from "../components/TextLayer.vue";


export default {
  name: "Home",
  components: {
    // ThreeTest,
    MovingCircle,
    // StartTextWall,
    
    StartScreen,
    // TextLayer,
  },
};
</script>

<style lang="scss"></style>
