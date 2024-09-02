<script setup lang="ts">
import {
  RawShaderMaterial,
  Vector2,
} from "three";

import commonVertex from "~/shader/common_vertex.glsl?raw";
import externalForceFrag from "~/shader/external_force_frag.glsl?raw";

const width = window.innerWidth;
const height = window.innerHeight;
const cellScale = new Vector2(1 / width, 1 / height)

const { render } = useLoop();
const { force, coords } = useMouse();

let uniforms = {
  mPosition: { value: coords },
  resolution: { value: new Vector2(width, height) },

  cellSize: { value: new Vector2(1 / width, 1 / height) },
  force: { value: force },
} as RawShaderMaterial['uniforms'];

const {
  target: externalForceTarget,
  scene: externalForceScene,
  camera: externalForceCamera,
} = createRenderTarget({
  vertexShader: commonVertex,
  fragmentShader: externalForceFrag,
  uniforms
})

uniforms['vel1'] = { value: externalForceTarget.texture }

render(({ renderer, camera, scene }) => {
  renderer.setRenderTarget(externalForceTarget);
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
