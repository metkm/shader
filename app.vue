<script setup lang="ts">
import { extend } from "@tresjs/core";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

extend({ OrbitControls });

const width = window.innerWidth;
const height = window.innerHeight;
</script>

<template>
  <TresCanvas window-size clear-color="black">
    <TresOrthographicCamera
      :args="[width / -2, width / 2, height / 2, height / -2, 1, 1000]"
      :position="[0, 0, 1]"
    />

    <TheCamera />
  </TresCanvas>
</template>
