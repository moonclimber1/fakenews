<template>
  <div id="textLayer">
    <p>
      <a href="https://qalerts.app/">Why do you believe what you believe?</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "TextLayer",
  props: {},
  data() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
#textLayer {
  background-color: #212425;
  width: 1200px;
  height: 800px;
  padding: 50px;

  font-size: 120px;
  font-weight: bolder;

  text-align: center;
  text-transform: uppercase;

  font-family: Arial, Helvetica, sans-serif;
  // font-style: normal; 

  a{
    color: white;
    text-decoration: none;

    &:hover{
      text-decoration: underline;
    }
  }
  
}
</style>
