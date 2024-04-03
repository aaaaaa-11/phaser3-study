<template>
  <p>
    <OffsetAlign ref="offsetRef" :items="images" :activeAlign="activeAlign" />
  </p>
  <p>
    <Align ref="alignRef" :items="images" />
  </p>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import Align from '@/components/align.vue'
import OffsetAlign from '@/components/offset.vue'
import useGame from '@/hooks/game'

// 图片地址
const IMGPATHS = [
  // 大小不同的图片
  '/game/bomb.png',
  // 大小相同的图片
  '/fruits/fruit_banana_100.png',
  '/game/star.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png'
]

const alignRef = ref()
const offsetRef = ref()

const activeAlign = computed(() => alignRef.value?.activeAlign)

const { images, gameState, GameState } = useGame({
  imgPaths: IMGPATHS,
  addRect: true
})

watch(gameState, (val: string) => {
  console.log('gameState', val)
  if (val === GameState.CREATE) {
    offsetRef.value?.changeAlignOffset()
  }
})
</script>
