<script setup lang="ts">
import {
  RawShaderMaterial,
  Vector2,
} from "three";

import commonVertex from "~/shader/common_vertex.glsl?raw";

import diffusionFrag from "~/shader/diffusion_frag.glsl?raw";
import densityFrag from "~/shader/density_frag.glsl?raw";
import externalForceFrag from "~/shader/external_force_frag.glsl?raw";

const width = window.innerWidth;
const height = window.innerHeight;
const cellScale = new Vector2(1 / width, 1 / height)

const { render } = useLoop();
const { force } = useMouse();

let uniforms = {
  mPosition: { value: new Vector2(0, 0) },
  resolution: { value: new Vector2(width, height) },

  cellSize: { value: new Vector2(1 / width, 1 / height) }
} as RawShaderMaterial['uniforms'];

// const {
//   target: densityTarget,
//   scene: densityScene,
//   camera: densityCamera,
// } = createRenderTarget({
//   vertexShader: commonVertex,
//   fragmentShader: densityFrag,
//   uniforms,
// });

const {
  target: externalForceTarget,
  scene: externalForceScene,
  camera: externalForceCamera,
} = createRenderTarget({
  vertexShader: commonVertex,
  fragmentShader: externalForceFrag,
  uniforms
})

// uniforms['density'] = { value: densityTarget.texture }
uniforms['vel1'] = { value: externalForceTarget.texture }

window.addEventListener("mousemove", (event) => {
  let x = (event.pageX / window.innerWidth) * 2.0 - 1.0;
  let y = 1 - (event.pageY / window.innerHeight) * 2.0;

  x *= width / height;

  uniforms.mPosition.value.set(x, y);
});

render(({ renderer, camera, scene }) => {
  renderer.setRenderTarget(externalForceTarget);
  renderer.render(externalForceScene, externalForceCamera);

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
      :vertex-shader="commonVertex"
      :fragment-shader="externalForceFrag"
      :uniforms="uniforms"
    />
  </TresMesh>
  <!-- Advection End -->
</template>
