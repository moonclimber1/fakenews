<template>
  <div id="canvas-wrapper"></div>
  <video id="video" loop muted crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/sintel.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
    <text-layer />
  </video>
</template>

<script>
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "three.meshline";
import TextLayer from "./TextLayer.vue";
import { log, MeshBasicMaterial, Object3D } from "three";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default {
  components: { TextLayer },
  name: "FakeNewsGalaxy",
  static() {
    return {
      camera: {},
      sceneGL: {},
      stats: {},
      rendererGL: {},
      composerGL: {},
      controls: {},
      container: {},
      sceneCSS: {},
      rendererCSS: {},
      cameraAnimationPath: {},
      cameraTween: {}
    };
  },
  props: {},
  methods: {
    init: function() {
      // Set up Camera
      this.container = document.getElementById("canvas-wrapper");
      this.camera = new THREE.PerspectiveCamera(70, this.container.clientWidth / this.container.clientHeight, 0.001, 100);
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

      // const bloomPass = new UnrealBloomPass(new THREE.Vector2(this.container.clientWidth, this.container.clientHeight), 1.5, 0.4, 0.85);
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

      // Setup stats
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);
    },
    createScene: function() {
      this.sceneGL = new THREE.Scene();
      this.sceneCSS = new THREE.Scene();

      // const diamond = this.createVideoDiamond()
      // this.sceneGL.add(diamond)

      // const cube = this.createVideoCube();
      // this.sceneGL.add(cube);

      const spiral = this.createSpiral();
      this.sceneGL.add(spiral);

      // const cubeSphere = this.createRandomCubesInSphere(0.5,30)
      // this.sceneGL.add(cubeSphere)

      // CSS 3D Object
      const textLayer = document.getElementById("textLayer");
      const object = new CSS3DObject(textLayer);
      object.position.set(0, 0, -0.3);
      object.rotation.y = 0;
      object.scale.set(0.001, 0.001, 0.001);
      this.sceneCSS.add(object);

      const pointArray = [new THREE.Vector3(5.5,-3.5,9),...this.getTheodorus(120, 0.6)]
      this.cameraAnimationPath =  new THREE.CatmullRomCurve3(pointArray)
      const geometry = new THREE.TubeGeometry(this.cameraAnimationPath, 1024, 0.01, 12, false);
      const material = new MeshBasicMaterial();
      var tube = new THREE.Mesh(geometry, material);
      // this.sceneGL.add(tube)


      this.cameraTween = {val: 1} 

      gsap.registerPlugin(ScrollTrigger);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#canvas-wrapper",
          start: "top top",
          end: function (){ return '+='+window.innerHeight*15 + ' bottom'},
          toggleActions: "restart pause reverse pause",
          // markers: true,
          scrub: 1,
          pin: true,
        },
      })
      
      tl.from(this.cameraTween, {duration: 100, val: 0 })
    
    },
    createVideoDiamond: function() {
      const diamond = new THREE.Object3D();

      // Create inner Video Mesh
      const geometry = new THREE.SphereBufferGeometry(0.2, 4, 2);
      const material = this.createVideoMaterial("video");
      // const material = new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true });
      const videoMesh = new THREE.Mesh(geometry, material);
      videoMesh.rotation.y = -Math.PI / 2;

      diamond.add(videoMesh);
      diamond.add(this.createEdgesMesh(geometry));

      return diamond;
    },
    createCube() {
      const geometry = new THREE.BoxBufferGeometry(0.04, 0.04, 0.04);
      const material = new MeshBasicMaterial();
      // const material = new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true });
      return new THREE.Mesh(geometry, material);
    },
    createVideoCube: function() {
      const cube = new THREE.Object3D();
      const geometry = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
      const material = this.createVideoMaterial("video");
      const videoMesh = new THREE.Mesh(geometry, material);
      cube.add(videoMesh);
      cube.add(this.createEdgesMesh(geometry));

      return cube;
    },
    createVideoMaterial(id) {
      const video = document.getElementById(id);
      video.play();
      const videoTexture = new THREE.VideoTexture(video);
      return new THREE.MeshBasicMaterial({ map: videoTexture });
    },
    createEdgesMesh(geometry) {
      // // Create outer Edges Mesh
      // const edges = new THREE.EdgesGeometry(geometry);
      // const edgesMesh = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1 }));
      // edgesMesh.scale.set(1.3, 1.3, 1.3);
      // return edgesMesh;

      // Create thick outer edges
      const edgeLine = new MeshLine();
      edgeLine.setGeometry(new THREE.EdgesGeometry(geometry));
      const resolution = new THREE.Vector2(this.container.clientWidth, this.container.clientHeight);
      const edgesMesh = new THREE.Mesh(
        edgeLine,
        new MeshLineMaterial({
          color: "white",
          resolution,
          lineWidth: 0.009,
          side: THREE.DoubleSide,
        })
      );
      edgesMesh.scale.set(1.4, 1.4, 1.4);
      return edgesMesh;
    },
    getTheodorus(segments, len) {
      let result = [];
      let radius = 0;
      let angle = 0;
      for (var i = 0; i < segments; i++) {
        radius = Math.sqrt(i + 1);
        angle += Math.asin(1 / radius);
        let x = Math.cos(angle) * radius * len;
        let y = Math.sin(angle) * radius * len;
        let z = radius * len;
        result[i] = new THREE.Vector3(x, y, z);
      }
      return result;
    },
    createSpiral() {
      const spiral = new Object3D();
      console.log("BEFORE");
      let points = this.getTheodorus(120, 0.6);
      console.log("AFTER");
      points.forEach((point, index) => {
        const spiralPoint = new THREE.Object3D();
        spiralPoint.position.set(point.x, point.y, point.z);

        if (index % 3 == Math.round(Math.random() - 0.3)) {
          const diamond = this.createVideoDiamond();
          diamond.position.set((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 1.0);
          spiralPoint.add(diamond);
        }

        if (index % 7 == Math.round(Math.random()-0.3)) {
          const cube = this.createVideoCube();
          cube.position.set((Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 1.2);
          spiralPoint.add(cube);
        }

        const cubeSphere = this.createRandomCubesInSphere(0.5, 15);

        spiralPoint.add(cubeSphere);
        spiral.add(spiralPoint);
      });
      return spiral;
    },
    createRandomCubesInSphere(radius, n) {
      const sphere = new THREE.Object3D();

      for (let i = 0; i < n; i++) {
        const pos = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
        pos.multiplyScalar(2 * radius);
        const cube = this.createCube();
        cube.position.set(pos.x, pos.y, pos.z);
        cube.rotation.x = Math.random() * 2 * Math.PI;
        cube.rotation.y = Math.random() * 2 * Math.PI;
        cube.rotation.z = Math.random() * 2 * Math.PI;
        sphere.add(cube);
      }
      return sphere;
    },
    animate: function(now) {
      requestAnimationFrame(this.animate);

      var p1 = this.cameraAnimationPath.getPointAt(this.cameraTween.val);
      var p2 = this.cameraAnimationPath.getPointAt(this.cameraTween.val + 0.0001);
      this.camera.position.set(p1.x, p1.y, p1.z);
      this.camera.lookAt(p2);
      this.camera.up.set(0, 0, 1);

      // this.controls.update();
      this.composerGL.render();
      this.rendererCSS.render(this.sceneCSS, this.camera);
      this.stats.update();
      
      // console.log("🚀 ~ file: FakeNewsGalaxy.vue ~ line 254 ~ this.camera.position", this.camera.position)

      
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
  background-color: black;
  width: 100vw;
  height: 100vh;

  // pointer-events: none;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
