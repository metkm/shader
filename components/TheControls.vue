<script setup lang="ts">
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

extend({ OrbitControls })

const { renderer, camera } = useTresContext()
</script>

<template>
  <TresOrbitControls
    v-if="renderer"
    :args="[camera, renderer?.domElement]"
  />
</template>
