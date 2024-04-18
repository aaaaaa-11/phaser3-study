<template>
  <PlaceOn :items="images" ref="placeOnRef" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useGame from '@/hooks/game'
import PlaceOn from '@/components/place-on.vue'

// 图片地址
const IMGPATHS = [
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png',
  '/fruits/fruit_strawberry_100.png',
  '/fruits/fruit_watermelon_100.png',
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png',
  '/fruits/fruit_strawberry_100.png',
  '/fruits/fruit_watermelon_100.png',
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png',
  '/fruits/fruit_strawberry_100.png',
  '/fruits/fruit_watermelon_100.png',
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png',
  '/fruits/fruit_strawberry_100.png',
  '/fruits/fruit_watermelon_100.png'
]

const placeOnRef = ref()

// 初始化游戏
const { images } = useGame({
  imgPaths: IMGPATHS,
  createFun: function () {
    placeOnRef.value?.changePlaceOn()
  }
})
</script>
