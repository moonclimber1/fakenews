<template>
  <div class="home">
    
    <!-- <moving-circle /> -->
    <fake-news-galaxy/>
    <!-- <start-plane-canvas/> -->
   
  </div>
</template>

<script>

import MovingCircle from "../components/MovingCircle";
import TextLayer from "../components/TextLayer.vue";
import StartPlaneCanvas from '../components/StartPlaneCanvas.vue';
import FakeNewsGalaxy from '../components/FakeNewsGalaxy.vue';




// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    FakeNewsGalaxy,
    // MovingCircle,
    // StartPlaneCanvas,

    
  },
};
</script>

<style lang="scss"></style>
