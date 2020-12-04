<template>
  <div id="canvas-wrapper"></div>
</template>

<script>
import * as THREE from "three";
export default {
  name: "ThreeTest",
  static() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      videoMesh: null,
      lineMesh: null,
      container: null,
      lastTimestamp: null,
    };
  },
  props: {},
  methods: {
    init: function() {
      // Set up Camera
      this.container = document.getElementById("canvas-wrapper");
      this.camera = new THREE.PerspectiveCamera(70, this.container.clientWidth / this.container.clientHeight, 0.01, 10);
      this.camera.position.z = 1;

      // Setup Scene
      this.createScene();

      // Set up renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      this.container.appendChild(this.renderer.domElement);

      //Resize Listener
      window.addEventListener('resize', this.onWindowResize, false);
    },
    createScene: function() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x000000);
      this.scene.fog = new THREE.FogExp2(0x000000, 0.4);

      // let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);

      const geometry = new THREE.SphereBufferGeometry( 0.2, 4, 2);
      const material = new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true})
     

      this.videoMesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.videoMesh);

      const lineMeshGeometry = this.videoMesh.clone()
      lineMeshGeometry.scale.set(1.5, 1.5, 1.5)
      const edges = new THREE.EdgesGeometry( lineMeshGeometry.geometry );
      this.lineMesh = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
      this.scene.add(this.lineMesh)

      const light1 = new THREE.PointLight(0xFFFFFF, 1);
      light1.position.set(3, 1, 1);
      this.scene.add(light1);

    },
    animate: function(now) {
      
      requestAnimationFrame(this.animate);

      // if(!this.lastTimestamp){this.lastTimestamp = now}
      // let delta = (now - this.lastTimestamp) / 16.6667;
      // this.lastTimestamp = now;
      
      this.videoMesh.rotation.x = now * 0.0005;
      this.videoMesh.rotation.y = now * 0.0008;

      this.lineMesh.rotation.x = now * 0.0005;
      this.lineMesh.rotation.y = now * 0.0008;

      this.renderer.render(this.scene, this.camera);
    },
    onWindowResize: function() {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
  },
  mounted() {
    this.init();
    this.animate();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* #container {
  position: relative; 
}
canvas {
  display: block;
  width: 800px;
  height: 500px;
} */

#canvas-wrapper {
  width: 100vw;
  height: 100vh;
  background-color: aqua;
}
</style>
