<template>
  <p>对齐方式：</p>
  <Align ref="alignRef" :items="images" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useGame from '@/hooks/game'
import Align from '@/components/align.vue'
import { GameState } from '@/utils/enums'

// 图片地址
const IMGPATHS = [
  // 大小相同的图片
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png',
  // 大小不同的图片
  '/game/bomb.png',
  '/game/star.png'
]

const alignRef = ref()

const { images, gameState } = useGame({
  imgPaths: IMGPATHS,
  addRect: true
})

watch(gameState, (val: string) => {
  console.log('gameState', val)
  if (val === GameState.CREATE) {
    alignRef.value?.changeAlignTo()
  }
})
</script>
