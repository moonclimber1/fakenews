<template>
  <div class="circle"></div>
</template>

<script>

export default {
  name: "MovingCircle",
  props: {},
  data(){
    //   return{
    //       circle: null
    //   }
  },
  mounted(){
        const circle = document.querySelector(".circle")
        window.addEventListener('mousemove', function(event){
            circle.style.transform= "translate3d(" +event.clientX + "px," + event.clientY + "px, 0px)"
        })
  },
  methods: {},
};
</script>


<style lang="scss" scoped>
    .circle{
       
        position: absolute;
        top: -10vw;
        left: -10vw;

        width: 20vw;
        height: 20vw;
        border-radius: 50%;

        background: #46D8BD;
        mix-blend-mode: exclusion;

        z-index: 100;

        // transform-origin: -50% -50%;
        transition: transform 1.5s cubic-bezier(.02,1.23,.79,1.08);

        pointer-events: none;
    }
</style>
