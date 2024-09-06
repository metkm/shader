<script setup lang="ts">
import {
  AdditiveBlending,
  FloatType,
  RawShaderMaterial,
  Vector2,
  WebGLRenderTarget,
} from "three";

import commonVert from "~/shader/common.vert?raw";

import colorFrag from "~/shader/color.frag?raw";
import forceFrag from "~/shader/force.frag?raw";
import advectionFrag from "~/shader/advection.frag?raw";
import divergenceFrag from "~/shader/divergence.frag?raw";
import jacobiFrag from "~/shader/jacobi.frag?raw";

const { render } = useLoop();
const { width, height } = useWindowSize()
const { force, coords } = useMouse();

const velocity0 = new WebGLRenderTarget(width.value, height.value, { type: FloatType });
const velocity1 = new WebGLRenderTarget(width.value, height.value, { type: FloatType });
const divergence = new WebGLRenderTarget(width.value, height.value, { type: FloatType });
const pressure0 = new WebGLRenderTarget(width.value, height.value, { type: FloatType });
const pressure1 = new WebGLRenderTarget(width.value, height.value, { type: FloatType });

let uniforms = {
  mPosition: { value: coords },
  mForce: { value: force },
  ratio: { value: width.value / height.value },

  resolution: { value: new Vector2(width.value, height.value) },
  px: { value: new Vector2(1 / width.value, 1 / height.value) },
  dt: { value: 1 / 60 },

  velocity0: { value: velocity0.texture },
  velocity1: { value: velocity1.texture },
  divergence: { value: divergence.texture },
  pressure0: { value: pressure0.texture },
  pressure1: { value: pressure1.texture },
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
  vertexShader: commonVert,
  fragmentShader: forceFrag,
  blending: AdditiveBlending,
  uniforms,
})

const {
  scene: jacobiScene,
  camera: jacobiCamera,
} = createRenderTarget({
  vertexShader: commonVert,
  fragmentShader: jacobiFrag,
  uniforms,
})

const {
  scene: divergenceScene,
  camera: divergenceCamera,
} = createRenderTarget({
  vertexShader: commonVert,
  fragmentShader: divergenceFrag,
  uniforms,
})

const {
  scene: subtractPressureScene,
  camera: subtractPressureCamera,
} = createRenderTarget({
  vertexShader: commonVert,
  fragmentShader: jacobiFrag,
  uniforms,
})

render(({ renderer, camera, scene }) => {
  renderer.setRenderTarget(velocity1);
  renderer.render(advectionScene, advectionCamera);
  renderer.render(mouseScene, mouseCamera);

  renderer.setRenderTarget(divergence);
  renderer.render(divergenceScene, divergenceCamera);

  let p0 = pressure0;
  let p1 = pressure1;
  let p_ = p0;
  for (let index = 0; index < 32; index++) {
    uniforms.pressure0.value = p0;

    renderer.setRenderTarget(p1);
    renderer.render(jacobiScene, jacobiCamera);

    p_ = p0;
    p0 = p1;
    p1 = p_;
  }

  renderer.setRenderTarget(velocity0);
  renderer.render(subtractPressureScene, subtractPressureCamera);

  renderer.setRenderTarget(null);
  renderer.render(scene, camera);
});
</script>

<template>
  <TresMesh>
    <TresPlaneGeometry :args="[width, height]" />
    <TresShaderMaterial
      :vertex-shader="commonVert"
      :fragment-shader="colorFrag"
      :uniforms="uniforms"
    />
  </TresMesh>
</template>
