<script setup lang="ts">
import {
  RawShaderMaterial,
  Vector2,
} from "three";

import externalForceFrag from "~/shader/external_force_frag.glsl?raw";
import externalForceVex from "~/shader/external_force_vex.glsl?raw";
import advectionFrag from "~/shader/advection_frag.glsl?raw";

import { createRenderTarget } from "~/utils/createRenderTarget";

const width = window.innerWidth;
const height = window.innerHeight;

const { render } = useLoop();
const { scene } = useTresContext();

// const advectionTarget = new WebGLRenderTarget(width, height, { type: FloatType });

let uniforms = {
  m_position: { value: new Vector2(0, 0) },
  resolution: { value: new Vector2(width, height) },
} as RawShaderMaterial['uniforms'];

const {
  target: velocityTarget,
  scene: velocityScene,
  camera: velocityCamera,
} = createRenderTarget({
  vertexShader: externalForceVex,
  fragmentShader: externalForceFrag,
  uniforms,
});

uniforms['velocity'] = { value: velocityTarget.texture }

window.addEventListener("mousemove", (event) => {
  // let x = (event.pageX / window.innerWidth) * 2.0 - 1;
  // let y = 1 - (event.pageY / window.innerHeight) * 2.0;

  let x = (event.pageX / window.innerWidth);
  let y = 1 - (event.pageY / window.innerHeight);

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
