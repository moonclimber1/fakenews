<template>
  <div class="home">
    <moving-circle />
    <start-text-wall/>
    <three-test-vivi/>
     <!-- <three-test />  -->
    <!-- <text-layer/>  -->
  </div>
</template>

<script>
// import ThreeTest from "../components/ThreeTest.vue";
// import ThreeTestVivi from "../components/ThreeTestVivi.vue";
import MovingCircle from "../components/MovingCircle";
import StartTextWall from '../components/StartTextWall.vue';
import TextLayer from '../components/TextLayer.vue';
import ThreeTestVivi from '../components/ThreeTestVivi.vue';

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    // ThreeTest,
    MovingCircle,
    StartTextWall,
    ThreeTestVivi,
    // TextLayer,
  },
};
</script>

<style lang="scss">
</style>
