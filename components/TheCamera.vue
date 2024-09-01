<script setup lang="ts">
import {
  FloatType,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderTarget,
} from "three";

// @ts-ignore
import externalForceFrag from "~/shader/external_force_frag.glsl?raw";
// @ts-ignore
import externalForceVex from "~/shader/external_force_vex.glsl?raw";
// @ts-ignore
import advectionFrag from "~/shader/advection_frag.glsl?raw";

const width = window.innerWidth;
const height = window.innerHeight;

const { render } = useLoop();
const { scene } = useTresContext();

const velocityTarget = new WebGLRenderTarget(width, height, { type: FloatType });
const advectionTarget = new WebGLRenderTarget(width, height, { type: FloatType });

const velocityScene = new Scene();
const velocityCamera = new OrthographicCamera(
  -width / 2,
  width / 2,
  height / 2,
  -height / 2,
  0,
  1000
);

velocityCamera.position.z = 1;

let uniforms = {
  m_position: { value: new Vector2(0, 0) },
  resolution: { value: new Vector2(width, height) },

  // fbos
  velocity: { value: velocityTarget.texture },
  advection: { value: advectionTarget.texture },
};

const material = new ShaderMaterial({
  vertexShader: externalForceVex,
  fragmentShader: externalForceFrag,
  uniforms,
});
const geometry = new PlaneGeometry(width, height);
const mesh = new Mesh(geometry, material);

// scene.value.add(mesh)
velocityScene.add(mesh);

window.addEventListener("mousemove", (event) => {
  let x = (event.pageX / window.innerWidth) * 2.0 - 1;
  let y = 1 - (event.pageY / window.innerHeight) * 2.0;

  x *= width / height;

  uniforms.m_position.value.set(x, y);
});

render(({ renderer, camera, scene }) => {
  renderer.setRenderTarget(velocityTarget);
  renderer.render(velocityScene, velocityCamera);

  renderer.setRenderTarget(null);
  renderer.render(scene, camera);
});
</script>

<template>
  <!-- External Force -->
  <!-- <TresMesh>
    <TresPlaneGeometry :args="[width, height]" />
    <TresShaderMaterial
      :vertex-shader="externalForceVex"
      :fragment-shader="externalForceFrag"
      :uniforms="uniforms"
    />
  </TresMesh> -->
  <!-- External Force End -->

  <!-- Advection -->
  <TresMesh>
    <TresPlaneGeometry :args="[width, height]" />
    <TresShaderMaterial
      :vertex-shader="externalForceVex"
      :fragment-shader="advectionFrag"
      :uniforms="uniforms"
    />
  </TresMesh>
  <!-- Advection End -->
</template>
