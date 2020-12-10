<template>
  <canvas class="start-plane-canvas" id="text-canvas" width="2000" height="2000"> </canvas>
</template>

<script>
export default {
  name: "StartPlaneCanvas",
  props: {},
  mounted() {
    const canvas = document.getElementById("text-canvas");
    this.ctx = canvas.getContext("2d");
    this.draw()
  },
  data() {
    return {
      text:
        "Do you see a pattern? How is the game played? Do not trust the media. The media lies. Are you really free? System of control? Apply logic and common sense. Thinking for yourself, is their greatest fear. Enjoy the show. Follow the white rabbit. Do you get it yet? They are afraid of you. Don't believe everything you read. Why do you believe what you believe? Whould you be able to recognize “them” decieving you? What if entertainment was more than just entertainment? What if the people in charge didnt have our best interests in mind? Who is influencing our media? Are you really free?",
      ctx: {},
    };
  },
  methods: {
    draw() {
      this.ctx.clearRect(0, 0, 2000, 2000);

      this.ctx.fillStyle = "#000000";
      this.ctx.fillRect(0, 0, 2000, 2000);

      this.ctx.fillStyle = "#ffffff";
      this.ctx.font = "100px Video";

      // this.ctx.fillText(this.text, 10, 50);

      this.text = this.text.toUpperCase();

      let x = 20,
        y = 100,
        maxWidth = 2000,
        lineHeight = 125;
      const words = this.text.split(" ");
      let line = "";
      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + " ";
        let metrics = this.ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth) {
          this.ctx.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      this.ctx.fillText(line, x, y);
    },
  },
};
</script>

<style lang="scss" scoped>
start-plane-canvas {
  width: 2000px;
  height: 2000px;
}
</style>
