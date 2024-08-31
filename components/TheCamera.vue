<script setup lang="ts">
import { FloatType, RenderTarget, Vector2 } from "three";

// @ts-ignore
import externalForceFrag from "~/shader/external_force_frag.glsl?raw";
// @ts-ignore
import externalForceVex from "~/shader/external_force_vex.glsl?raw";

const width = window.innerWidth;
const height = window.innerHeight;

const velocityTarget = new RenderTarget(width, height, { type: FloatType });

let uniforms = {
  m_position: { value: new Vector2(0, 0) },
  resolution: { value: new Vector2(width, height) },

  // fbos
  velocity: { value: velocityTarget.texture }
}

window.addEventListener('mousemove', event => {
  let x = event.pageX / window.innerWidth * 2.0 - 1;
  let y = 1 - event.pageY / window.innerHeight * 2.0;

  uniforms.m_position.value.set(x, y)
})
</script>

<template>
  <TresMesh>
   <TresPlaneGeometry :args="[width, height]" />
    <TresShaderMaterial
      :vertex-shader="externalForceVex"
      :fragment-shader="externalForceFrag"
      :uniforms="uniforms"
    />
  </TresMesh>
</template>
