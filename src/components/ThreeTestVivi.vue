<template>
  <div id="canvas-wrapper"></div>
  <video id="video" loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/sintel.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
  <start-text-wall cssID="real" text="real"/>
  <start-text-wall cssID="fake" text="fake"/>

  <start-text-plane cssID="floor"/>
  <start-text-plane cssID="ceiling"/>
  </video>
</template>

<script>
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
//import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
//import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "three.meshline";
import StartTextWall from './StartTextWall.vue';
import StartTextPlane from './StartTextPlane.vue';
import { Object3D } from 'three';


export default {
  components: {StartTextWall, StartTextPlane},
  name: "ThreeTestVivi",
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

      

      //Resize Listener
      window.addEventListener("resize", this.onWindowResize, false);

      //Set up trackball controls
      this.controls = new TrackballControls(this.camera, this.rendererGL.domElement);
      this.controls.rotateSpeed = 4.0;
      this.controls.zoomSpeed = 2.0;
      this.controls.panSpeed = 4.0;
      this.controls.keys = [65, 83, 68];
    },
    createScene: function() {
      this.sceneGL = new THREE.Scene();
      this.sceneCSS = new THREE.Scene();


    const room = new Object3D();

    const wallReal = new CSS3DObject(document.getElementById("real"));
    wallReal.position.set(0, 0, 500);
    wallReal.rotation.y = this.deg2rad(90);
    room.add(wallReal);

    const wallFake = new CSS3DObject(document.getElementById("fake"));
    wallFake.position.set(500, 0, 0);
    room.add(wallFake);

    const floor = new CSS3DObject(document.getElementById("floor"));
    floor.rotation.x = this.deg2rad(-90);
    floor.position.set(500,-200, 500);
    room.add(floor);

    const ceiling = new CSS3DObject(document.getElementById("ceiling"));
    ceiling.rotation.x = this.deg2rad(90);
    ceiling.position.set(500,200, 500);
    room.add(ceiling);



    room.scale.set(0.001, 0.001, 0.001);
    room.position.set(0,0, 0);
    room.rotation.y = this.deg2rad(-45);
    this.sceneCSS.add(room)

      

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
      this.controls.update();
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
    deg2rad(deg){
        return deg * (Math.PI/180);
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

#canvas-wrapper {
  
  background-color:black;
  width: 100vw;
  height: 100vh;

  // pointer-events: none;

  canvas{
    width: 100%;
    height: 100%;
  }
}

</style>
