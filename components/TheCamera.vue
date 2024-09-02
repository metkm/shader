<script setup lang="ts">
import {
  FloatType,
  RawShaderMaterial,
  RenderTarget,
  Vector2,
  WebGLRenderTarget,
} from "three";

import commonVert from "~/shader/common.vert?raw";
import forceFrag from "~/shader/force.frag?raw";
import velocityFrag from "~/shader/velocity.frag?raw";
import divergenceFrag from "~/shader/divergence.frag?raw";

const width = window.innerWidth;
const height = window.innerHeight;

const { render } = useLoop();
const { force, coords } = useMouse();

const forceTarget = new WebGLRenderTarget(width, height, { type: FloatType });

let uniforms = {
  mPosition: { value: coords },
  mForce: { value: force },

  resolution: { value: new Vector2(width, height) },
  cellSize: { value: new Vector2(1 / width, 1 / height) },

  force: { value: forceTarget.texture },
} as RawShaderMaterial['uniforms'];

const {
  scene: forceScene,
  camera: forceCamera,
} = createRenderTarget({
  vertexShader: commonVert,
  fragmentShader: forceFrag,
  uniforms
})

render(({ renderer, camera, scene }) => {
  renderer.setRenderTarget(forceTarget);
  renderer.render(forceScene, forceCamera)

  renderer.setRenderTarget(null);
  renderer.render(scene, camera);
});
</script>

<template>
  <TresMesh>
    <TresPlaneGeometry :args="[width, height]" />
    <TresShaderMaterial
      :vertex-shader="commonVert"
      :fragment-shader="divergenceFrag"
      :uniforms="uniforms"
    />
  </TresMesh>
</template>
