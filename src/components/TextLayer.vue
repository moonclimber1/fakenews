<template>
  <div class="textLayer" :id="cssId">
    <p>{{ question }}</p>
  </div>
</template>

<script>
export default {
  name: "TextLayer",
  props: {
    question: String,
    cssId: String,
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.textLayer {
  //background-color: red;
  width: 1200px;
  height: 800px;

  font-size: 90px;
  font-weight: bolder;
  text-transform: uppercase;

  // text-align: center;

  display: table;

  color: white;

  p {
    display: table-cell;
    vertical-align: middle;
    text-shadow: 0px 0px blue;

    &:hover {
      @keyframes ani {
        0% {
          text-shadow: 0px 0px rgb(50, 200, 200);
        }
        25% {
          text-shadow: 3px 3px;
        }
        50% {
          text-shadow: 3px -3px;
        }
        75% {
          text-shadow: -3px -3px pink;
        }
        100% {
          text-shadow: -3px 3px rgb(100, 230, 210);
        }
      }

      animation: ani 0.2s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }
  }
}
</style>
