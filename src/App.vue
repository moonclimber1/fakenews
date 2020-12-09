<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/blog">Blog</router-link> | 
    <router-link to="/home-vivi">Home Vivi</router-link>
  </div>
  <router-view/>
</template>

<style>
@import url("https://use.typekit.net/ygj0kbg.css");

body{
  margin:0px;
  padding:0px;
}

*{
  box-sizing: border-box;
}

#app {
  font-family: "Video";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: white;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
