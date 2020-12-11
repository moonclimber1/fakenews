<template>
  <div id="textLayer">
    <svg width="100%" height="100%"  xmlns="http://www.w3.org/2000/svg">

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
   ">

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
  
    <feBlend in="SourceGraphic" in2="RED" mode="normal"  result="SHADOW"/> 

    <feTurbulence id="turbulence" baseFrequency="0.02 0.03" numOctaves="40" result="NOISE" seed="0">

    <animate 
    id="noiseAnimate" 
    attributeName="baseFrequency"
    values="2.5;2.7"
    from="0"
    to="50"
    dur="10s"
    repeatCount="indefinite">
</animate>


    </feTurbulence>


    <feDisplacementMap  in2="NOISE" in="SHADOW" scale="20"></feDisplacementMap>

  
</filter>

    



    <text x ="50%" y="50%" fill="white">
     Do you see a pattern?
    </text>
  
</svg>


    <!-- <p>
      <a href="https://qalerts.app/">Why do you believe what you believe?</a>
    </p> -->
  </div>
</template>

<script>
export default {
  name: "TextLayer",
  props: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
#textLayer {
  background-color: #212425;
  width: 1200px;
  height: 800px;
  padding: 20px;

  font-size: 90px;
  font-weight: bolder;

  text-transform: uppercase;

  font-family: Arial, Helvetica, sans-serif;
  // font-style: normal; 

  a{
    color: white;
    text-decoration: none;


  }
  
}

svg text{

text-anchor:middle;

  &:hover{
filter:url(#distort);
  }
}
</style>
