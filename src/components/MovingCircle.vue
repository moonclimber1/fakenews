<template>
  <div class="circle"></div>
</template>

<script>
export default {
      name: "MovingCircle",
  props: {},
  data() {},
  mounted() {
    const circle = document.querySelector(".circle");
    window.addEventListener("mousemove", function(event) {
      circle.style.transform =
        "translate3d(" + event.clientX + "px," + event.clientY + "px, 0px)";
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.circle {
  position: fixed;
  top: -10vw;
  left: -10vw;

  width: 20vw;
  height: 20vw;
  border-radius: 50%;

  background: #46d8bd;
  mix-blend-mode: exclusion;

  z-index: 1000;

  transition: transform 1.5s cubic-bezier(0.02, 1.23, 0.79, 1.08);

  pointer-events: none;
}
</style>
