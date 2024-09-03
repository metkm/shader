<script setup lang="ts">
import {
  FloatType,
  RawShaderMaterial,
  // RenderTarget,
  Vector2,
  WebGLRenderTarget,
} from "three";

import commonVert from "~/shader/common.vert?raw";
import mouseVert from "~/shader/mouse.vert?raw";

import velocityFrag from "~/shader/velocity.frag?raw";
import divergenceFrag from "~/shader/divergence.frag?raw";
import poissionFrag from "~/shader/poission.frag?raw";
import pressureFrag from "~/shader/pressure.frag?raw";
import colorFrag from "~/shader/color.frag?raw";
import forceFrag from "~/shader/force.frag?raw";

const width = window.innerWidth;
const height = window.innerHeight;

const { render } = useLoop();
const { force, coords, center } = useMouse();

const velocityTarget0 = new WebGLRenderTarget(width, height, { type: FloatType });
const velocityTarget1 = new WebGLRenderTarget(width, height, { type: FloatType });

const velocityViscous0 = new WebGLRenderTarget(width, height, { type: FloatType });
const velocityViscous1 = new WebGLRenderTarget(width, height, { type: FloatType });

const divergenceTarget = new WebGLRenderTarget(width, height, { type: FloatType });

const poissionTarget1 = new WebGLRenderTarget(width, height, { type: FloatType });
const poissionTarget0 = new WebGLRenderTarget(width, height, { type: FloatType });

let uniforms = {
  mPosition: { value: coords },
  mForce: { value: force },

  resolution: { value: new Vector2(width, height) },
  cellSize: { value: new Vector2(1 / width, 1 / height) },
  center: { value: center },

  velocity0: { value: velocityTarget0.texture },
  velocity1: { value: velocityTarget1.texture },
  
  velocityViscous0: { value: velocityViscous0.texture },
  velocityViscous1: { value: velocityViscous1.texture },

  divergence: { value: divergenceTarget.texture },

  poission0: { value: poissionTarget0.texture },
  poission1: { value: poissionTarget1.texture },
} as RawShaderMaterial['uniforms'];

const {
  scene: velocityScene,
  camera: velocityCamera,
} = createRenderTarget({
  vertexShader: commonVert,
  fragmentShader: velocityFrag,
  uniforms
})

const {
  scene: forceScene,
  camera: forceCamera,
} = createRenderTarget({
  vertexShader: mouseVert,
  fragmentShader: forceFrag,
  uniforms
})

const {
  scene: divergenceScene,
  camera: divergenceCamera,
} = createRenderTarget({
  vertexShader: commonVert,
  fragmentShader: divergenceFrag,
  uniforms
})

const {
  scene: poissionScene,
  camera: poissionCamera,
} = createRenderTarget({
  vertexShader: commonVert,
  fragmentShader: poissionFrag,
  uniforms
})

const {
  scene: pressureScene,
  camera: pressureCamera,
} = createRenderTarget({
  vertexShader: commonVert,
  fragmentShader: pressureFrag,
  uniforms
})

render(({ renderer, camera, scene }) => {
  renderer.setRenderTarget(velocityTarget1);
  renderer.render(velocityScene, velocityCamera);

  // External Force
  renderer.render(forceScene, forceCamera);
  // External Force End

  // Divergence
  renderer.setRenderTarget(divergenceTarget);
  renderer.render(divergenceScene, divergenceCamera);
  // Divergence End

  // Poission
  let targetIn, targetOut;
  for (let index = 0; index < 32; index++) {
    if (index % 2 === 0) {
      targetIn = poissionTarget0;
      targetOut = poissionTarget1;
    } else {
      targetIn = poissionTarget1;
      targetOut = poissionTarget0;
    }

    uniforms.poission0.value = targetIn.texture;
    uniforms.poission1.value = targetOut.texture;

    renderer.setRenderTarget(targetOut);
    renderer.render(poissionScene, poissionCamera);
  }
  // Poission End

  // Pressure
  renderer.setRenderTarget(velocityTarget0);
  renderer.render(pressureScene, pressureCamera);
  // Pressure End

  renderer.setRenderTarget(null);
  renderer.render(scene, camera);
});
</script>

<template>
  <TresMesh>
    <!-- <TresPlaneGeometry :args="[width / 2, height /2 ]" /> -->

    <TresPlaneGeometry :args="[1, 1]" />

    <TresShaderMaterial
      :vertex-shader="commonVert"
      :fragment-shader="colorFrag"
      :uniforms="uniforms"
    />
  </TresMesh>
</template>
