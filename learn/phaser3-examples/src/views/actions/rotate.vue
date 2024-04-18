<template>
  <Rotate :items="images" ref="rotateRef" />
  <Runing v-model:runing-state="runingState" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useGame from '@/hooks/game'
import Rotate from '@/components/rotate.vue'
import Runing from '@/components/runing.vue'

// 图片地址
const IMGPATHS = [
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png',
  '/fruits/fruit_strawberry_100.png',
  '/fruits/fruit_watermelon_100.png'
]

const rotateRef = ref()

const runingState = ref(false)

// 初始化游戏
const { images } = useGame({
  imgPaths: IMGPATHS,
  createFun: function () {
    rotateRef.value?.updateRotate()
  },
  updateFun: () => {
    runingState.value && rotateRef.value?.updateRotate()
  }
})
</script>
