<template>
  <div class="home">
    <moving-circle/>
    <three-test/>
  </div>
</template>

<script> 
import ThreeTest from '../components/ThreeTest.vue'
import MovingCircle from '../components/MovingCircle'

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'


export default {
  name: 'Home',
  components: {
    ThreeTest,
    MovingCircle,
  }
}
</script>

<style lang="scss">





</style>
