<template>
  <div class="circle"></div>
</template>

<script>
export default {
      name: "MovingCircle",
  props: {},
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
  top: -12vw;
  left: -12vw;

  width: 24vw;
  height: 24vw;
  border-radius: 50%;

  background: #46d8bd;
  mix-blend-mode: exclusion;

  z-index: 1000;

  transition: transform 1.5s cubic-bezier(0.02, 1.23, 0.79, 1.08);

  pointer-events: none;
}
</style>
