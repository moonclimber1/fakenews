<template>
  <div class="home">
    
    <!-- <moving-circle /> -->
    <three-test />
    <!-- <start-plane-canvas/> -->
   
  </div>
</template>

<script>
import ThreeTest from "../components/ThreeTest.vue";
import MovingCircle from "../components/MovingCircle";
import TextLayer from "../components/TextLayer.vue";
import StartPlaneCanvas from '../components/StartPlaneCanvas.vue';
import StartTextPlane from '../components/StartTextPlane.vue';


// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    ThreeTest,
    // MovingCircle,
    // StartPlaneCanvas,
    // StartTextPlane,
    
  },
};
</script>

<style lang="scss"></style>
