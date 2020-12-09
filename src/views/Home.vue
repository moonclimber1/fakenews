<template>
  <div class="home">
    <moving-circle />
    <three-test />
    <!-- <text-layer/> -->
  </div>
</template>

<script>
import ThreeTest from "../components/ThreeTest.vue";
import ThreeTestVivi from "../components/ThreeTestVivi.vue";
import MovingCircle from "../components/MovingCircle";
import TextLayer from '../components/TextLayer.vue';

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    ThreeTest,
    MovingCircle,
    TextLayer,
  },
};
</script>

<style lang="scss"></style>
