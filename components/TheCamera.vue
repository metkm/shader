<script setup lang="ts">
import {
  AdditiveBlending,
  FloatType,
  RawShaderMaterial,
  Vector2,
  WebGLRenderTarget,
} from "three";

import commonVert from "~/shader/common.vert?raw";
import mouseVert from "~/shader/mouse.vert?raw";

import colorFrag from "~/shader/color.frag?raw";
import forceFrag from "~/shader/force.frag?raw";
import advectionFrag from "~/shader/advection.frag?raw";

const { render } = useLoop();
const { width, height } = useWindowSize()
const { force, coords, center } = useMouse();

const velocity0 = new WebGLRenderTarget(width.value, height.value, { type: FloatType });
const velocity1 = new WebGLRenderTarget(width.value, height.value, { type: FloatType });
const divergence = new WebGLRenderTarget(width.value, height.value, { type: FloatType });
const pressure0 = new WebGLRenderTarget(width.value, height.value, { type: FloatType });
const pressure1 = new WebGLRenderTarget(width.value, height.value, { type: FloatType });

let uniforms = {
  mPosition: { value: coords },
  mForce: { value: force },
  center: { value: center },

  resolution: { value: new Vector2(width.value, height.value) },
  px: { value: new Vector2(1 / width.value, 1 / height.value) },
  dt: { value: 1 / 60 },

  velocity0: { value: velocity0.texture },
  velocity1: { value: velocity1.texture },
} as RawShaderMaterial['uniforms'];

const {
  scene: advectionScene,
  camera: advectionCamera,
} = createRenderTarget({
  vertexShader: commonVert,
  fragmentShader: advectionFrag,
  uniforms,
})

const {
  scene: mouseScene,
  camera: mouseCamera,
} = createRenderTarget({
  vertexShader: mouseVert,
  fragmentShader: forceFrag,
  blending: AdditiveBlending,
  uniforms,
})

render(({ renderer, camera, scene }) => {
  renderer.setRenderTarget(velocity1);
  renderer.render(advectionScene, advectionCamera);
  renderer.render(mouseScene, mouseCamera);

  renderer.setRenderTarget(null);
  renderer.render(scene, camera);
});
</script>

<template>
  <TresMesh>
    <TresPlaneGeometry :args="[width, height]" />
    <TresShaderMaterial
      :vertex-shader="commonVert"
      :fragment-shader="forceFrag"
      :uniforms="uniforms"
    />
  </TresMesh>
</template>
