<script setup lang="ts">
import {
  FloatType,
  RawShaderMaterial,
  Vector2,
  WebGLRenderTarget,
} from "three";

import commonVertex from "~/shader/common_vertex.glsl?raw";

import externalForceFrag from "~/shader/external_force_frag.glsl?raw";
import advectionFrag from "~/shader/advection_frag.glsl?raw";
import poissionFrag from "~/shader/poission_frag.glsl?raw";
import pressureFrag from "~/shader/pressure_frag.glsl?raw";
import colorFrag from "~/shader/color_frag.glsl?raw";

const width = window.innerWidth;
const height = window.innerHeight;

const { render } = useLoop();
const { force, coords } = useMouse();

const vel0 = new WebGLRenderTarget(width, height, { type: FloatType });
const vel1 = new WebGLRenderTarget(width, height, { type: FloatType });

const pres0 = new WebGLRenderTarget(width, height, { type: FloatType });
const pres1 = new WebGLRenderTarget(width, height, { type: FloatType });

const velVis0 = new WebGLRenderTarget(width, height, { type: FloatType });
const velVis1 = new WebGLRenderTarget(width, height, { type: FloatType });

let uniforms = {
  mPosition: { value: coords },
  resolution: { value: new Vector2(width, height) },

  cellSize: { value: new Vector2(1 / width, 1 / height) },
  force: { value: force },

  vel0: { value: vel0.texture },
  vel1: { value: vel1.texture },

  pres0: { value: pres0.texture },
  pres1: { value: pres1.texture },

  velVis0: { value: velVis0.texture },
  velVis1: { value: velVis1.texture },
} as RawShaderMaterial['uniforms'];

const {
  scene: externalForceScene,
  camera: externalForceCamera,
} = createRenderTarget({
  vertexShader: commonVertex,
  fragmentShader: externalForceFrag,
  uniforms
})

const {
  scene: advectionScene,
  camera: advectionCamera,
} = createRenderTarget({
  vertexShader: commonVertex,
  fragmentShader: advectionFrag,
  uniforms
})

const {
  scene: poissionScene,
  camera: poissionCamera,
} = createRenderTarget({
  vertexShader: commonVertex,
  fragmentShader: poissionFrag,
  uniforms
})

const {
  scene: pressureScene,
  camera: pressureCamera,
} = createRenderTarget({
  vertexShader: commonVertex,
  fragmentShader: pressureFrag,
  uniforms
})

render(({ renderer, camera, scene }) => {
  // renderer.setRenderTarget(vel1);
  // renderer.render(advectionScene, advectionCamera);

  renderer.setRenderTarget(vel1);
  renderer.render(externalForceScene, externalForceCamera);

  // renderer.setRenderTarget(pres1);
  // renderer.render(poissionScene, poissionCamera);

  renderer.setRenderTarget(vel0);
  renderer.render(pressureScene, pressureCamera);

  renderer.setRenderTarget(null);
  renderer.render(scene, camera);
});
</script>

<template>
  <TresMesh>
    <TresPlaneGeometry :args="[width, height]" />
    <TresShaderMaterial
      :vertex-shader="commonVertex"
      :fragment-shader="externalForceFrag"
      :uniforms="uniforms"
    />
  </TresMesh>
</template>
