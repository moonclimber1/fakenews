<template>
  <div id="canvas-wrapper"></div>
  <video id="video" loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/sintel.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
  <text-layer/>
  </video>
</template>

<script>
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "three.meshline";
import TextLayer from './TextLayer.vue';

export default {
  components: { TextLayer },
  name: "ThreeTest",
  static() {
    return {
      camera: {},
      sceneGL: {},
      rendererGL: {},
      composerGL: {},
      controls: {},
      videoMesh: {},
      edgesMesh: {},
      container: {},
      lastTimestamp: {},
      sceneCSS: {},
      rendererCSS: {},
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

      // Set up CSS Renderer
      this.rendererCSS = new CSS3DRenderer();
      this.rendererCSS.setSize(this.container.clientWidth, this.container.clientHeight);
      this.rendererCSS.domElement.style.position = "absolute";
      this.rendererCSS.domElement.style.top = 0;

      // Set up GL Renderer
      this.rendererGL = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.rendererGL.setClearColor(0x00ff00, 0.0);
      this.rendererGL.setSize(this.container.clientWidth, this.container.clientHeight);
      this.rendererGL.domElement.style.position = "absolute";
      this.rendererGL.domElement.style.zIndex = 1;
      this.rendererGL.domElement.style.top = 0;

      // Add GL Renderer to CSS Renderer and append CSS Renderer to DOM
      this.rendererCSS.domElement.appendChild(this.rendererGL.domElement);
      this.container.appendChild(this.rendererCSS.domElement);

      // Set up post processing
      this.composerGL = new EffectComposer(this.rendererGL);
      this.composerGL.addPass(new RenderPass(this.sceneGL, this.camera));

      // const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
      // bloomPass.threshold = 0;
      // bloomPass.strength = 2;
      // bloomPass.radius = 0;
      // this.composerGL.addPass(bloomPass);

      //Resize Listener
      window.addEventListener("resize", this.onWindowResize, false);

      // Set up trackball controls
      // this.controls = new TrackballControls(this.camera, this.rendererGL.domElement);
      // this.controls.rotateSpeed = 4.0;
      // this.controls.zoomSpeed = 2.0;
      // this.controls.panSpeed = 4.0;
      // this.controls.keys = [65, 83, 68];
    },
    createScene: function() {
      this.sceneGL = new THREE.Scene();
      this.sceneCSS = new THREE.Scene();

      // Create inner Video Mesh
      const geometry = new THREE.SphereBufferGeometry(0.2, 4, 2);
      const video = document.getElementById("video");
      video.play();
      const videoTexture = new THREE.VideoTexture(video);
      const material = new THREE.MeshBasicMaterial({ map: videoTexture });
      // const material = new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true });
      this.videoMesh = new THREE.Mesh(geometry, material);
      this.videoMesh.rotation.y = -Math.PI / 2;
      this.sceneGL.add(this.videoMesh);

      // // Create outer Edges Mesh
      // const edges = new THREE.EdgesGeometry(geometry);
      // this.edgesMesh = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 }));
      // this.edgesMesh.scale.set(1.4, 1.4, 1.4);
      // this.sceneGL.add(this.edgesMesh);

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
      this.sceneGL.add(this.edgesMesh);

      // CSS 3D Object
      const textLayer = document.getElementById("textLayer");
      const object = new CSS3DObject(textLayer);
      object.position.set(0, 0, -0.3);
      object.rotation.y = 0;
      object.scale.set(0.001, 0.001, 0.001);
      this.sceneCSS.add(object);

      // Add light so that we can see something
      const light1 = new THREE.PointLight(0xffffff, 1);
      light1.position.set(3, 1, 1);
      this.sceneGL.add(light1);
      const light2 = new THREE.PointLight(0xffffff, 0.3);
      light2.position.set(-3, 1, 1);
      this.sceneGL.add(light2);
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

      // this.sceneGL.rotation.x = now * 0.0005;
      this.sceneGL.rotation.y = now * 0.0004;
      // this.sceneCSS.rotation.x = now * 0.0005;
      this.sceneCSS.rotation.y = now * 0.0004;

      // this.controls.update();
      this.composerGL.render();
      this.rendererCSS.render(this.sceneCSS, this.camera);
    },
    onWindowResize: function() {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.rendererGL.setSize(this.container.clientWidth, this.container.clientHeight);
      this.composerGL.setSize(this.container.clientWidth, this.container.clientHeight);
      this.rendererCSS.setSize(this.container.clientWidth, this.container.clientHeight);
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
  
  background-color:black;
  width: 100vw;
  height: 100vh;

  pointer-events: none;

  canvas{
    width: 100%;
    height: 100%;
  }
}

</style>
