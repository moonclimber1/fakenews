<template>
  <div class="startTextWall" :id="cssID">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <filter id="distort" x="0%" y="0%" width="120%" height="120%">
        <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2">
          <animate
            id="shadowAnimate"
            attributeName="dx"
            values="0;2;0;-2;0"
            from="0"
            to="100"
            dur="0.2s"
            repeatCount="indefinite"
          ></animate>
        </feOffset>

        <feColorMatrix
          in="offOut"
          type="matrix"
          result="RED"
          values="
   2 0 0 0 0
   0 0 0 0 0
   0 0 .3 0 0
   0 0 0 1 0
   "
        >
          <animate
            id="colorAnim"
            attributeName="values"
            from="  2 0 0 0 0 0 0 0 0 0 0 0 .3 0 0 0 0 0 1 0"
            to=" 2 0 0 0 0 0 0 0 0 0 0 0 .3 0 0 0 0 0 1 0"
            values=" 2 0 0 0 0 0 0 0 0 0 0 0 .3 0 0 0 0 0 1 0; 0.16 0 0 0 0 0 0.9 0 0 0 0 0 0.58 0 0 0 0 0 1 0; 2 0 0 0 0 0 0 0 0 0 0 0 .3 0 0 0 0 0 1 0;"
            dur=".4s"
            repeatCount="indefinite"
          ></animate>
        </feColorMatrix>

        <feBlend in="SourceGraphic" in2="RED" mode="normal" result="SHADOW" />

        <feTurbulence id="turbulence" baseFrequency="0.02 0.03" numOctaves="40" result="NOISE" seed="0">
          <animate
            id="noiseAnimate"
            attributeName="baseFrequency"
            values="2.5;2.7"
            from="0"
            to="50"
            dur="10s"
            repeatCount="indefinite"
          ></animate>
        </feTurbulence>

        <feDisplacementMap in2="NOISE" in="SHADOW" scale="20"></feDisplacementMap>
      </filter>

      <text x="45%" y="80%" dy="0" fill="white">
        {{ text }}
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  name: "StartTextWall",
  props: {
    cssID: String,
    text: String,
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.startTextWall {
  background-color: black;
  width: 1000px;
  height: 400px;
  font-size: 400px;
  line-height: 500px;
  color: white;
  text-anchor: middle;
  text-transform: uppercase;
  text-align: center;
  

  svg {
    background-color:black;
  }

  svg text:hover {
    filter: url(#distort);
  }
}
</style>
