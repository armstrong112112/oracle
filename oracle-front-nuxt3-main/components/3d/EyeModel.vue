<template>
  <div ref="container" class="eye-model-container"></div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { markRaw, onBeforeUnmount, onMounted, ref } from "vue";

const container = ref<HTMLElement | null>(null);
const scene = ref<THREE.Scene | null>(null);
const camera = ref<THREE.PerspectiveCamera | null>(null);
const renderer = ref<THREE.WebGLRenderer | null>(null);
const eyeModel = ref<THREE.Group | THREE.Mesh | null>(null);
const mouse = ref<THREE.Vector2 | null>(null);
const windowHalf = ref<THREE.Vector2 | null>(null);
const animationId = ref<number | null>(null);
const isHovered = ref(false);
const currentPupilSize = ref(1.0);
const targetPupilSize = ref(1.0);
const mixer = ref<THREE.AnimationMixer | null>(null);
const clock = ref<THREE.Clock | null>(null);
const animations = ref<THREE.AnimationClip[]>([]);
const animationActions = ref<
  Array<{ action: THREE.AnimationAction; maxTime: number; trackName: string }>
>([]);
const textures = ref({
  baseColor: null as THREE.Texture | null,
  normal: null as THREE.Texture | null,
  ao: null as THREE.Texture | null,
  roughness: null as THREE.Texture | null,
  metallic: null as THREE.Texture | null,
  opacity: null as THREE.Texture | null,
});

function init() {
  if (!import.meta.client || !container.value) return;

  const rect = container.value.getBoundingClientRect();

  const mouseVector = new THREE.Vector2();
  const windowHalfVector = new THREE.Vector2();
  windowHalfVector.set(rect.width / 2, rect.height / 2);

  mouse.value = markRaw(mouseVector);
  windowHalf.value = markRaw(windowHalfVector);
  clock.value = markRaw(new THREE.Clock());

  scene.value = markRaw(new THREE.Scene());
  scene.value.background = null;

  camera.value = markRaw(
    new THREE.PerspectiveCamera(50, rect.width / rect.height, 0.1, 1000)
  );
  camera.value.position.set(0, 0, 3);

  renderer.value = markRaw(
    new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
  );
  renderer.value.setSize(rect.width, rect.height);
  renderer.value.setPixelRatio(window.devicePixelRatio);
  renderer.value.shadowMap.enabled = true;
  renderer.value.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.value.outputColorSpace = THREE.SRGBColorSpace;
  renderer.value.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.value.toneMappingExposure = 0.4;

  container.value.appendChild(renderer.value.domElement);

  setupLighting();
  setupEnvironment();
  loadEyeModel();
}

function setupLighting() {
  if (!scene.value) return;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.value.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.value.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.2, 100);
  pointLight.position.set(-5, -5, 5);
  scene.value.add(pointLight);

  const pointLight2 = new THREE.PointLight(0xffffff, 0.1, 100);
  pointLight2.position.set(0, 0, 10);
  scene.value.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xffffff, 0.8, 100);
  pointLight3.position.set(5, 5, 5);
  scene.value.add(pointLight3);

  const highlightLight = new THREE.PointLight(0xffffff, 1.2, 10);
  highlightLight.position.set(-0.5, 1, 2);
  highlightLight.castShadow = false;
  scene.value.add(highlightLight);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.1);
  directionalLight2.position.set(-5, -5, -5);
  scene.value.add(directionalLight2);
}

function setupEnvironment() {
  if (!renderer.value || !scene.value) return;

  const pmrem = new THREE.PMREMGenerator(renderer.value);
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.02).texture;
  scene.value.environment = envMap;
  scene.value.environmentIntensity = 0.2;
}

function loadEyeModel() {
  loadTextures();
  loadFBXModel();
}

function loadTextures() {
  const textureLoader = new THREE.TextureLoader();

  const basePath = "/3d/eye/models/";

  const onTextureLoaded = () => {
    if (eyeModel.value) {
      updateMaterialsWithTextures();
    }
  };

  let loadedCount = 0;
  const totalTextures = 6;

  const checkAllLoaded = () => {
    loadedCount++;
    if (loadedCount === totalTextures) {
      onTextureLoaded();
    }
  };

  textures.value.baseColor = markRaw(
    textureLoader.load(
      basePath + "Eyeball_Eyeball_BaseColor.png",
      checkAllLoaded,
      undefined,
      checkAllLoaded
    )
  );
  textures.value.normal = markRaw(
    textureLoader.load(
      basePath + "Eyeball_Eyeball_Normal.png",
      checkAllLoaded,
      undefined,
      checkAllLoaded
    )
  );
  textures.value.ao = markRaw(
    textureLoader.load(
      basePath + "Eyeball_Eyeball_AO.jpg",
      checkAllLoaded,
      undefined,
      checkAllLoaded
    )
  );
  textures.value.roughness = markRaw(
    textureLoader.load(
      basePath + "Eyeball_Eyeball_roughness.jpg",
      checkAllLoaded,
      undefined,
      checkAllLoaded
    )
  );
  textures.value.metallic = markRaw(
    textureLoader.load(
      basePath + "Eyeball_Eyeball_metallic.jpg",
      checkAllLoaded,
      undefined,
      checkAllLoaded
    )
  );
  textures.value.opacity = markRaw(
    textureLoader.load(
      basePath + "Eyeball_Eyeball_opacity.jpg",
      checkAllLoaded,
      undefined,
      checkAllLoaded
    )
  );
}

function loadFBXModel() {
  const loader = new FBXLoader();

  loader.load(
    "/3d/eye/models/EyeAnimation.fbx",
    (fbx: any) => {
      eyeModel.value = markRaw(fbx);

      const isMobile = window.innerWidth <= 600;
      const scale = isMobile ? 0.03 : 0.05;
      eyeModel.value!.scale.setScalar(scale);

      const box = new THREE.Box3().setFromObject(eyeModel.value!);
      const center = box.getCenter(new THREE.Vector3());
      eyeModel.value!.position.sub(center);

      fixModelMaterials(eyeModel.value!);

      if (textures.value.baseColor) {
        updateMaterialsWithTextures();
      }

      if (scene.value) {
        scene.value.add(eyeModel.value!);
      }

      debugModelParts(eyeModel.value!);

      if (fbx.animations && fbx.animations.length > 0) {
        console.log("=== Model Animations ===");
        console.log(`Total animations found: ${fbx.animations.length}`);
        fbx.animations.forEach((animation: any, index: number) => {
          console.log(`Animation ${index}:`, {
            name: animation.name,
            duration: animation.duration,
            tracks: animation.tracks.length,
            trackNames: animation.tracks.map((track: any) => track.name),
          });
        });
        console.log("========================");

        setupAnimations(fbx.animations);
      } else {
        console.log("No animations found in the model");
      }

      console.log("FBX Eye model loaded successfully");
    },
    (progress: any) => {
      console.log(
        "FBX Loading progress:",
        (progress.loaded / progress.total) * 100 + "%"
      );
    },
    (error: any) => {
      console.warn("FBX model failed to loaded , trying OBJ model:", error);
      loadOBJModel();
    }
  );
}

function loadOBJModel() {
  const mtlLoader = new MTLLoader();
  const objLoader = new OBJLoader();

  mtlLoader.load(
    "/3d/eye/models/Eye.mtl",
    (materials: any) => {
      materials.preload();
      objLoader.setMaterials(materials);

      objLoader.load(
        "/3d/eye/models/Eye.obj",
        (obj: any) => {
          eyeModel.value = markRaw(obj);

          const isMobile = window.innerWidth <= 600;
          const scale = isMobile ? 0.03 : 0.05;
          eyeModel.value!.scale.setScalar(scale);

          const box = new THREE.Box3().setFromObject(eyeModel.value!);
          const center = box.getCenter(new THREE.Vector3());
          eyeModel.value!.position.sub(center);

          fixModelMaterials(eyeModel.value!);

          if (textures.value.baseColor) {
            updateMaterialsWithTextures();
          }

          if (scene.value) {
            scene.value.add(eyeModel.value!);
          }

          console.log("OBJ Eye model load successfully");
        },
        (progress: any) => {
          console.log(
            "OBJ Loading progress:",
            (progress.loaded / progress.total) * 100 + "%"
          );
        },
        (error: any) => {
          console.error("Error loading OBJ eye model:", error);
          createFallbackEye();
        }
      );
    },
    (progress: any) => {
      console.log(
        "MTL Loading progress:",
        (progress.loaded / progress.total) * 100 + "%"
      );
    },
    (error: any) => {
      console.warn(
        "MTL materials failed to load, loading OBJ without materials:",
        error
      );
      objLoader.load(
        "/3d/eye/models/Eye.obj",
        (obj: any) => {
          eyeModel.value = markRaw(obj);

          const isMobile = window.innerWidth <= 600;
          const scale = isMobile ? 0.03 : 0.05;
          eyeModel.value!.scale.setScalar(scale);

          const box = new THREE.Box3().setFromObject(eyeModel.value!);
          const center = box.getCenter(new THREE.Vector3());
          eyeModel.value!.position.sub(center);

          fixModelMaterials(eyeModel.value!);

          if (textures.value.baseColor) {
            updateMaterialsWithTextures();
          }


          if (scene.value) {
            scene.value.add(eyeModel.value!);
          }

          console.log("OBJ Eye model loaded successfully (without materials)");
        },
        (progress: any) => {
          console.log(
            "OBJ Loading progress:",
            (progress.loaded / progress.total) * 100 + "%"
          );
        },
        (error: any) => {
          console.error("Error loading OBJ eye model:", error);
          createFallbackEye();
        }
      );
    }
  );
}

function createFallbackEye() {
  if (!scene.value) return;

  const geometry = new THREE.SphereGeometry(1.5, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 100,
    transparent: false,
    opacity: 1.0,
  });

  eyeModel.value = markRaw(new THREE.Mesh(geometry, material));
  scene.value.add(eyeModel.value!);

  console.log("Fallback eye geometry created");
}

function fixModelMaterials(object: THREE.Object3D) {
  object.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      if (Array.isArray(child.material)) {
        child.material = child.material.map((mat: THREE.Material) =>
          createPBRMaterial(mat)
        );
      } else if (child.material) {
        child.material = createPBRMaterial(child.material);
      } else {
        child.material = createPBRMaterial();
      }

      if (
        child.geometry &&
        child.geometry.attributes.uv &&
        !child.geometry.attributes.uv2
      ) {
        child.geometry.setAttribute("uv2", child.geometry.attributes.uv);
      }
    }
  });
}

function updateMaterialsWithTextures() {
  if (!eyeModel.value) return;

  eyeModel.value.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((mat: THREE.Material) => {
        if (mat instanceof THREE.MeshStandardMaterial) {
          mat.map = textures.value.baseColor;
          mat.normalMap = textures.value.normal;
          mat.aoMap = textures.value.ao;
          mat.roughnessMap = textures.value.roughness;
          mat.metalnessMap = textures.value.metallic;
          mat.alphaMap = textures.value.opacity;
          mat.opacity = 1.0;
          mat.transparent = true;
          mat.needsUpdate = true;
        }
      });
    }
  });
}

function createPBRMaterial(existingMaterial: THREE.Material | null = null) {
  const materialConfig: any = {
    map: textures.value.baseColor,
    normalMap: textures.value.normal,
    aoMap: textures.value.ao,
    aoMapIntensity: 2.0,
    roughnessMap: textures.value.roughness,
    metalnessMap: textures.value.metallic,
    alphaMap: textures.value.opacity,
    transparent: true,
    opacity: 1.0,
    depthWrite: false,
    side: THREE.DoubleSide,
  };

  if (existingMaterial && "name" in existingMaterial && existingMaterial.name) {
    materialConfig.name = existingMaterial.name;
  }

  const material = new THREE.MeshStandardMaterial(materialConfig);
  
  material.opacity = 1.0;
  material.transparent = true;
  material.needsUpdate = true;

  return material;
}

function debugModelParts(object: THREE.Object3D) {
  console.log("=== Model Parts Debug ===");
  object.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      console.log(`Mesh found: "${child.name}"`);
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat: THREE.Material, index: number) => {
            console.log(
              `  Material ${index}: transparent=${mat.transparent}, opacity=${mat.opacity}`
            );
          });
        } else {
          console.log(
            `  Material: transparent=${child.material.transparent}, opacity=${child.material.opacity}`
          );
        }
      }
    }
  });
  console.log("========================");
}

function setupAnimations(animationsList: THREE.AnimationClip[]) {
  if (!eyeModel.value) return;

  mixer.value = markRaw(new THREE.AnimationMixer(eyeModel.value));

  console.log("=== Starting Animations ===");

  animationsList.forEach((animation: THREE.AnimationClip, index: number) => {
    console.log(`\n📹 Animation ${index}: "${animation.name || "Unnamed"}"`);
    console.log(`   Total tracks available: ${animation.tracks.length}`);

    animation.tracks.forEach(
      (track: THREE.KeyframeTrack, trackIndex: number) => {
        console.log(`   Track ${trackIndex}: ${track.name}`);
      }
    );

    if (animation.tracks.length === 0) {
      console.log("   ⚠️  No tracks in this animation");
      return;
    }

    const firstTrack = animation.tracks[0];
    const singleTrackClip = new THREE.AnimationClip(
      `${animation.name || `Animation_${index}`}_FirstTrack`,
      animation.duration,
      [firstTrack]
    );

    console.log(`\n▶️  Playing ONLY first track: "${firstTrack.name}"`);
    console.log(`   Track type: ${firstTrack.constructor.name}`);
    console.log(`   Duration: ${singleTrackClip.duration.toFixed(2)}s`);

    if (!mixer.value) return;

    const action = mixer.value.clipAction(singleTrackClip);

    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.paused = true;
    action.play();
    action.time = 0;

    animationActions.value.push({
      action: action,
      maxTime: singleTrackClip.duration / 2,
      trackName: firstTrack.name,
    });

    console.log(
      `✅ Animation ready for cursor control (0 to ${(
        singleTrackClip.duration / 2
      ).toFixed(2)}s)`
    );
  });

  console.log("\n===========================");
}

function updatePupilSize(size: number) {
  if (!eyeModel.value) return;

  eyeModel.value.traverse((child: THREE.Object3D) => {
    if (child instanceof THREE.Mesh) {
      const name = child.name.toLowerCase();

      if (name.includes("pupil") || name.includes("зрачок")) {
        child.scale.setScalar(size);
      }
    }
  });
}

function animate() {
  if (!import.meta.client) return;

  animationId.value = requestAnimationFrame(animate);

  if (eyeModel.value) {
    updateEyeTracking();
  }

  if (renderer.value && scene.value && camera.value) {
    renderer.value.render(scene.value, camera.value);
  }
}

function updateEyeTracking() {
  if (!eyeModel.value || !mouse.value || !windowHalf.value) return;

  const targetX =
    ((mouse.value.x - windowHalf.value.x) / windowHalf.value.x) * 0.3;
  const targetY =
    ((mouse.value.y - windowHalf.value.y) / windowHalf.value.y) * 0.2;

  eyeModel.value.rotation.y = THREE.MathUtils.lerp(
    eyeModel.value.rotation.y,
    targetX,
    0.08
  );
  eyeModel.value.rotation.x = THREE.MathUtils.lerp(
    eyeModel.value.rotation.x,
    targetY,
    0.08
  );

  currentPupilSize.value = THREE.MathUtils.lerp(
    currentPupilSize.value,
    targetPupilSize.value,
    0.1
  );
  updatePupilSize(currentPupilSize.value);

  updateAnimationByDistance();
}

function updateAnimationByDistance() {
  if (animationActions.value.length === 0 || !mouse.value || !windowHalf.value)
    return;

  const dx = mouse.value.x - windowHalf.value.x;
  const dy = mouse.value.y - windowHalf.value.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const maxDistance = Math.sqrt(
    windowHalf.value.x * windowHalf.value.x +
      windowHalf.value.y * windowHalf.value.y
  );

  const normalizedDistance = Math.min(distance / maxDistance, 1.0);

  animationActions.value.forEach(
    ({
      action,
      maxTime,
    }: {
      action: THREE.AnimationAction;
      maxTime: number;
    }) => {
      const targetTime = normalizedDistance * (maxTime / 2);

      action.time = THREE.MathUtils.lerp(action.time, targetTime, 0.15);

      if (mixer.value) {
        mixer.value.update(0);
      }
    }
  );
}

function onMouseMove(event: MouseEvent) {
  if (import.meta.client && container.value) {
    const rect = container.value.getBoundingClientRect();
    if (mouse.value) {
      mouse.value.x = event.clientX - rect.left;
      mouse.value.y = event.clientY - rect.top;
    }
  }
}

function onWindowResize() {
  if (
    !import.meta.client ||
    !container.value ||
    !camera.value ||
    !renderer.value ||
    !windowHalf.value
  )
    return;

  const rect = container.value.getBoundingClientRect();

  windowHalf.value.set(rect.width / 2, rect.height / 2);

  camera.value.aspect = rect.width / rect.height;
  camera.value.updateProjectionMatrix();

  renderer.value.setSize(rect.width, rect.height);

  if (eyeModel.value) {
    const isMobile = window.innerWidth <= 600;
    const scale = isMobile ? 0.03 : 0.05;
    eyeModel.value.scale.setScalar(scale);
  }
}

function addEventListeners() {
  if (import.meta.client && container.value) {
    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("resize", onWindowResize, false);
    container.value.addEventListener("mouseenter", onMouseEnter, false);
    container.value.addEventListener("mouseleave", onMouseLeave, false);
  }
}

function removeEventListeners() {
  if (import.meta.client) {
    window.removeEventListener("mousemove", onMouseMove, false);
    window.removeEventListener("resize", onWindowResize, false);
    if (container.value) {
      container.value.removeEventListener("mouseenter", onMouseEnter, false);
      container.value.removeEventListener("mouseleave", onMouseLeave, false);
    }
  }
}

function onMouseEnter() {
  isHovered.value = true;
  targetPupilSize.value = 0.5;
}

function onMouseLeave() {
  isHovered.value = false;
  targetPupilSize.value = 1.0;
}

onMounted(() => {
  if (import.meta.client) {
    init();
    animate();
    addEventListeners();
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    removeEventListeners();
    if (animationId.value) {
      cancelAnimationFrame(animationId.value);
    }
    if (mixer.value) {
      mixer.value.stopAllAction();
      mixer.value = null;
    }
    if (renderer.value) {
      renderer.value.dispose();
    }
  }
});
</script>

<style scoped>
.eye-model-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: transparent;
  cursor: default;
  opacity: 1;
  visibility: visible;
}

.eye-model-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
  background: transparent !important;
  pointer-events: none;
}
</style>
