<template>
  <div class="textLayer" :id="cssId">
    <p>{{ question }}</p>
  </div>
</template>

<script>
export default {
  name: "TextLayer",
  props: {
    question: Array,
    cssId: String
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.textLayer {
  // background-color: #212425;
  width: 1200px;
  height: 800px;

  font-size: 90px;
  font-weight: bolder;
  text-transform: uppercase;

  // text-align: center;

  display: table;

  color: white;

  p{
    display: table-cell;
    vertical-align: middle;
  }
}
</style>
