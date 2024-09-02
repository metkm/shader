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

const width = window.innerWidth;
const height = window.innerHeight;
const cellScale = new Vector2(1 / width, 1 / height)

const { render } = useLoop();
const { force, coords } = useMouse();

const vel0 = new WebGLRenderTarget(width, height, { type: FloatType });
const vel1 = new WebGLRenderTarget(width, height, { type: FloatType });

let uniforms = {
  mPosition: { value: coords },
  resolution: { value: new Vector2(width, height) },

  cellSize: { value: new Vector2(1 / width, 1 / height) },
  force: { value: force },

  vel0: { value: vel0.texture },
  vel1: { value: vel1.texture },
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

render(({ renderer, camera, scene }) => {
  renderer.setRenderTarget(vel1);
  renderer.render(advectionScene, advectionCamera);

  renderer.clear();

  renderer.setRenderTarget(vel1);
  renderer.render(externalForceScene, externalForceCamera);

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
