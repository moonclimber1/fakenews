<template>
  <div id="canvas-wrapper"></div>
  <video id="video" loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/sintel.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
  </video>
</template>

<script>
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "three.meshline";

export default {
  name: "ThreeTest",
  static() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      composer: null,
      controls: null,
      videoMesh: null,
      edgesMesh: null,
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

      // Set up Scene
      this.createScene();

      // Set up renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      this.container.appendChild(this.renderer.domElement);

      // Set up post processing
      this.composer = new EffectComposer(this.renderer);
      this.composer.addPass(new RenderPass(this.scene, this.camera));

      const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
      bloomPass.threshold = 0;
      bloomPass.strength = 2;
      bloomPass.radius = 0;
      // this.composer.addPass(bloomPass);

      //Resize Listener
      window.addEventListener("resize", this.onWindowResize, false);

      // Set up trackball controls
      this.controls = new TrackballControls(this.camera, this.renderer.domElement);
      this.controls.rotateSpeed = 4.0;
      this.controls.zoomSpeed = 2.0;
      this.controls.panSpeed = 4.0;
      this.controls.keys = [65, 83, 68];
    },
    createScene: function() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x000000);
      this.scene.fog = new THREE.FogExp2(0x000000, 0.4);

      // Create inner Video Mesh
      const geometry = new THREE.SphereBufferGeometry(0.2, 4, 2);
      const video = document.getElementById("video");
      video.play();
      const videoTexture = new THREE.VideoTexture(video);
      const material = new THREE.MeshBasicMaterial({ map: videoTexture });
      // const material = new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true });
      this.videoMesh = new THREE.Mesh(geometry, material);
      this.videoMesh.rotation.y = -Math.PI/2;
      this.scene.add(this.videoMesh);

      // // Create outer Edges Mesh
      // const edges = new THREE.EdgesGeometry(geometry);
      // this.edgesMesh = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 }));
      // this.edgesMesh.scale.set(1.4, 1.4, 1.4);
      // this.scene.add(this.edgesMesh);

      // Create thick outer edges
      const edgeLine = new MeshLine();
      edgeLine.setGeometry(new THREE.EdgesGeometry(geometry));
      const resolution = new THREE.Vector2(this.container.clientWidth, this.container.clientHeight);
      this.edgesMesh = new THREE.Mesh(
        edgeLine,
        new MeshLineMaterial({
          color: "white",
          resolution,
          lineWidth: 0.005,
          side: THREE.DoubleSide,
        })
      );
      this.edgesMesh.scale.set(1.4, 1.4, 1.4);
      this.scene.add(this.edgesMesh);

      // Add light so that we can see something
      const light1 = new THREE.PointLight(0xffffff, 1);
      light1.position.set(3, 1, 1);
      this.scene.add(light1);
      const light2 = new THREE.PointLight(0xffffff, 0.3);
      light2.position.set(-3, 1, 1);
      this.scene.add(light2);
    },
    animate: function(now) {
      requestAnimationFrame(this.animate);

      // if(!this.lastTimestamp){this.lastTimestamp = now}
      // let delta = (now - this.lastTimestamp) / 16.6667;
      // this.lastTimestamp = now;

      // this.videoMesh.rotation.x = now * 0.0005;
      // this.videoMesh.rotation.y = now * 0.0008;

      // this.edgesMesh.rotation.x = now * 0.0005;
      // this.edgesMesh.rotation.y = now * 0.0008;

      this.controls.update();
      this.composer.render();
      // this.renderer.render(this.scene, this.camera);
    },
    onWindowResize: function() {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
      this.composer.setSize(this.container.clientWidth, this.container.clientHeight);
    },
  },
  mounted() {
    this.init();
    this.animate();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
