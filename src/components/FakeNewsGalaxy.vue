<template>
  <div id="canvas-wrapper"></div>
  <video id="video1" loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/videos/clip_1.mp4" type="video/mp4" />
  </video>
  <video id="video2" loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/videos/clip_2.mp4" type="video/mp4" />
  </video>
  <video id="video3" loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/videos/clip_3.mp4" type="video/mp4" />
  </video>
  <video id="video4" loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/videos/clip_4.mp4" type="video/mp4" />
  </video>
  <video id="video5" loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/videos/clip_5.mp4" type="video/mp4" />
  </video>
  <video id="video6" loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/videos/clip_6.mp4" type="video/mp4" />
  </video>
  <video id="video7" loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/videos/clip_7.mp4" type="video/mp4" />
  </video>
  <video id="video8" loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/videos/clip_8.mp4" type="video/mp4" />
  </video>
  <video id="video9" loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/videos/clip_9.mp4" type="video/mp4" />
  </video>
  <video id="video10" loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/videos/clip_10.mp4" type="video/mp4" />
  </video>
  <video id="video11" loop crossOrigin="anonymous" playsinline style="display:none">
    <source src="@/assets/videos/clip_11.mp4" type="video/mp4" />
  </video>
  <text-layer :question="question" :cssId="'text' + index" v-for="(question, index) in questions" :key="index" />
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
import { log, MathUtils, MeshBasicMaterial, Object3D, Vector3 } from "three";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default {
  components: { TextLayer },
  name: "FakeNewsGalaxy",
  data() {
    return {
      questions: [
        "Do you see a pattern?",
        "How is the game played?",
        "Do not trust the media.",
        "System of control?",
        "What if the people in charge didnt have our best interests in mind?",
        "Who is influencing our media?",
        "Are you really free?",
        "Don't believe everything you read.",
        "Why do you believe what you believe?",
        "Would you be able to recognize “them” decieving you?",
        "What really happened during WWII ?",
        "Why is this relevant?",
        "How do you 'show' the public the truth?",
        "Follow the white rabbit",
        "Do you get it? They are afraid of you!",
        "What if entertainment was more than just entertainment?",
        "Enjoy the show",
        "Why are they protected?",
        "Nothing is random",
        "Do you see what happened",
        "Why are we being censored?",
        "The calm before the storm"
      ],
    };
  },
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
      cameraTween: {},
      cursor: {},
      tilt: {},
      videos3D: [],
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
      // this.stats = new Stats();
      // document.body.appendChild(this.stats.dom);

      this.cursor = { x: 0, y: 0 };
      const self = this;
      window.addEventListener("mousemove", function(event) {
        self.cursor.x = event.clientX;
        self.cursor.y = event.clientY;
      });

      window.onbeforeunload = function(event) {
        window.scrollTo(0, 0);
      };
    },
    createScene: function() {
      this.sceneGL = new THREE.Scene();
      this.sceneCSS = new THREE.Scene();

      this.videos3D = [];

      const spiral = this.createSpiral();
      this.sceneGL.add(spiral);

      // Nullpunkt Cube
      // const geometry = new THREE.BoxBufferGeometry(0.04, 0.04, 0.04);
      // const material = new MeshBasicMaterial({color: 0x05FF00});
      // // const material = new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true });
      // this.sceneGL.add(new THREE.Mesh(geometry, material));

      // CSS 3D Object
      // const textLayer = document.getElementById("textLayer");
      // const object = new CSS3DObject(textLayer);
      // object.position.set(0, 0, 0);
      // object.rotation.y = 0;
      // object.scale.set(0.001, 0.001, 0.001);
      // this.sceneCSS.add(object);

      const theodorus = this.getTheodorus(124, 0.6);
      theodorus.shift();
      const pointArray = [new THREE.Vector3(5.5, -3.5, 9), ...theodorus];
      this.cameraAnimationPath = new THREE.CatmullRomCurve3(pointArray);
      // const geometry = new THREE.TubeGeometry(this.cameraAnimationPath, 1024, 0.01, 12, false);
      // const material = new MeshBasicMaterial();
      // var tube = new THREE.Mesh(geometry, material);
      // this.sceneGL.add(tube)

      const textSpiral = this.createTextSpiral();
      this.sceneCSS.add(textSpiral);

      this.cameraTween = { val: 1 };

      gsap.registerPlugin(ScrollTrigger);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#canvas-wrapper",
          start: "top top",
          end: function() {
            return "+=" + window.innerHeight * 15 + " bottom";
          },
          toggleActions: "restart pause reverse pause",
          // markers: true,
          scrub: 1,
          pin: true,
        },
      });

      tl.from(this.cameraTween, { duration: 100, val: 0 });

      // const listener = new THREE.AudioListener();
      // this.camera.add(listener);

      // // create the PositionalAudio object (passing in the listener)
      // const sound = new THREE.PositionalAudio(listener);

      // // load a sound and set it as the PositionalAudio object's buffer
      // const audioLoader = new THREE.AudioLoader();
      // audioLoader.load("../assets/music.mp3", function(buffer) {
      //   console.log("🚀 ~ file: FakeNewsGalaxy.vue ~ line 154 ~ audioLoader.load ~ buffer", buffer);
      //   sound.setBuffer(buffer);
      //   sound.setRefDistance(20);
      //   sound.play();
      // });
      // // console.log("🚀 ~ file: FakeNewsGalaxy.vue ~ line 157 ~ sound", sound)
      // spiral.add(sound);
    },
    createVideoDiamond: function() {
      const diamond = new THREE.Object3D();

      // Create inner Video Mesh
      const geometry = new THREE.SphereBufferGeometry(0.2, 4, 2);
      const video = document.getElementById(this.getRandomVideoId());
      const material = this.createVideoMaterial(video);
      // const material = new THREE.MeshPhongMaterial({ color: 0xcccccc, flatShading: true });
      const videoMesh = new THREE.Mesh(geometry, material);
      videoMesh.rotation.x = this.deg2rad(90);
      videoMesh.rotation.y = this.deg2rad(180);
      diamond.add(videoMesh);
      diamond.add(this.createEdgesMesh(geometry));
      this.addVideo3D(video, diamond);
      return diamond;
    },
    addVideo3D(video, obj) {
      const index = this.videos3D.findIndex((vid3D) => vid3D.video == video);
      if (index >= 0) {
        this.videos3D[index].objects.push(obj);
      } else {
        this.videos3D.push({
          video: video,
          objects: [obj],
        });
      }
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
      const video = document.getElementById(this.getRandomVideoId());
      const material = this.createVideoMaterial(video);
      const videoMesh = new THREE.Mesh(geometry, material);
      cube.add(videoMesh);
      cube.add(this.createEdgesMesh(geometry));
      cube.rotation.y = this.deg2rad(90);
      cube.rotation.z = this.deg2rad(90);
      this.addVideo3D(video, cube);
      return cube;
    },
    getRandomVideoId() {
      const videoNr = Math.floor(Math.random() * 11) + 1;
      return "video" + videoNr;
    },
    createVideoMaterial(video) {
      video.volume = 0.1;
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
      let points = this.getTheodorus(120, 0.6);

      points.forEach((point, index) => {
        const spiralPoint = new THREE.Object3D();
        spiralPoint.position.set(point.x, point.y, point.z);

        if (index >= 0 && index < points.length - 1) {
          const nextPoint = points[index + 1];

          // spiralPoint.lookAt(nextPoint)
          spiralPoint.up.set(0, 0, 1);
        }

        if (index % 5 == Math.round(Math.random() - 0.3) && index > 1) {
          const cube = this.createVideoCube();
          cube.position.set((Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 1.2);
          spiralPoint.add(cube);
        }

        if (index % 8 == Math.round(Math.random() - 0.3) && index > 1) {
          const diamond = this.createVideoDiamond();
          diamond.position.set((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 1.0);
          spiralPoint.add(diamond);
        }

        const cubeSphere = this.createRandomCubesInSphere(0.5, 12);

        spiralPoint.add(cubeSphere);
        spiral.add(spiralPoint);
      });
      return spiral;
    },
    createTextSpiral() {
      const spiral = new Object3D();

      const theodorus = this.getTheodorus(140, 0.6);
      const pointArray = [...theodorus];
      const textPath = new THREE.CatmullRomCurve3(pointArray);

      let offset = 0.04;
      let nr = 0;
      let lookAt;
      const stepSize = (1 - offset) / this.questions.length;
      for (let val = offset; val < 1; val += stepSize) {
        const spiralPoint = new THREE.Object3D();
        const point = textPath.getPointAt(val);
        spiralPoint.position.set(point.x, point.y, point.z);

        lookAt = textPath.getPointAt(val + 0.0001);
        spiralPoint.lookAt(lookAt);
        spiralPoint.up.set(0, 0, 1);

        const textLayer = document.getElementById("text" + nr);
        const object = new CSS3DObject(textLayer);
        object.rotation.y = this.deg2rad(180);
        object.rotation.z = this.deg2rad(90);
        object.scale.set(0.0012, 0.0012, 0.0012);

        if (point.y < 0) {
          object.rotation.z = this.deg2rad(270);
        }

        if (nr == this.questions.length - 1) {
          object.scale.set(0.004, 0.004, 0.004);
        }

        spiralPoint.add(object);
        spiral.add(spiralPoint);

        nr++;
      }
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

      // Camera Animation
      const p1 = this.cameraAnimationPath.getPointAt(this.cameraTween.val);
      const p2 = this.cameraAnimationPath.getPointAt(this.cameraTween.val + 0.008);
      this.camera.position.set(p1.x, p1.y, p1.z);
      this.camera.lookAt(p2);
      this.camera.up.set(0, 0, 1);

      // Scene Tilting
      const desiredYTilt = ((this.cursor.x / window.innerWidth) * 2 - 1) * this.deg2rad(4);
      const yTilt = THREE.MathUtils.lerp(this.sceneGL.rotation.y, desiredYTilt, 0.04);
      this.sceneGL.rotation.y = yTilt;
      this.sceneCSS.rotation.y = yTilt;

      const desiredXTilt = ((this.cursor.y / window.innerHeight) * 2 - 1) * this.deg2rad(3);
      const xTilt = THREE.MathUtils.lerp(this.sceneGL.rotation.x, desiredXTilt, 0.04);
      this.sceneGL.rotation.x = xTilt;
      this.sceneCSS.rotation.x = xTilt;

      // 3D Sound
      this.videos3D.forEach((vid3D) => {
        let volume = 0;
        vid3D.objects.forEach((obj) => {
          const squareDist = obj
            .getWorldPosition(new THREE.Vector3())
            .distanceToSquared(this.cameraAnimationPath.getPointAt(this.cameraTween.val + 0.008));
          const newVolume = (1 / squareDist) * 0.18;
          if (newVolume > volume) {
            volume = newVolume;
          }
        });
        vid3D.video.volume = this.limit(volume, 0.01, 1);
      });

      // const up = new Vector3(0,0,1)
      // const desiredYTilt = ((this.cursor.x / window.innerWidth) * 2 - 1) * this.deg2rad(2);
      // // const desiredTiltVec = new Object3D().rotateOnWorldAxis(p2, yTilt)
      // // console.log("🚀 ~ file: FakeNewsGalaxy.vue ~ line 311 ~ desiredYTilt", desiredYTilt)
      // const yTilt = THREE.MathUtils.lerp(this.sceneGL.rotation.y, desiredYTilt, 0.04);
      // this.sceneGL.rotation.set(0,0,0)
      // this.sceneCSS.rotation.set(0,0,0)
      // this.sceneGL.rotateOnAxis(this.camera.up, desiredYTilt);
      // this.sceneCSS.rotateOnAxis(this.camera.up, desiredYTilt);

      // this.tilt = {lastLookAtTilt: desiredYTilt}

      // const desiredXTilt = ((this.cursor.y / window.innerHeight) * 2 - 1) * this.deg2rad(5);
      // const xTilt = THREE.MathUtils.lerp(this.sceneGL.rotation.x, desiredXTilt, 0.04);
      // this.sceneGL.rotation.x = xTilt;
      // this.sceneCSS.rotation.x = xTilt;

      // this.controls.update();
      this.composerGL.render();
      this.rendererCSS.render(this.sceneCSS, this.camera);
      // this.stats.update();

      // console.log("🚀 ~ file: FakeNewsGalaxy.vue ~ line 254 ~ this.camera.position", this.camera.position)
    },

    onWindowResize: function() {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.rendererGL.setSize(this.container.clientWidth, this.container.clientHeight);
      this.composerGL.setSize(this.container.clientWidth, this.container.clientHeight);
      this.rendererCSS.setSize(this.container.clientWidth, this.container.clientHeight);
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    limit(val, min, max) {
      return val < min ? min : val > max ? max : val;
    },
  },
  created() {
    // Shuffle
    this.questions = this.questions.sort(() => 0.5 - Math.random());
    // Select 10 items
    this.questions = this.questions.slice(0, 10);
    // Add beginning and end
    this.questions = ["Question everything!", ...this.questions, "", "What is your truth?"];
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

  pointer-events: none;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
