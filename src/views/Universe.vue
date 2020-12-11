<template>
  <div class="home">
    <moving-circle />
    <fake-news-galaxy />
  </div>
</template>

<script>
import MovingCircle from "../components/MovingCircle";
import FakeNewsGalaxy from "../components/FakeNewsGalaxy.vue";

export default {
  name: "Universe",
  components: {
    FakeNewsGalaxy,
    MovingCircle,
  },
};
</script>

<style lang="scss"></style>
