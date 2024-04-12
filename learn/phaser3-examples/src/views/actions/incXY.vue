<template>
  <p>
    x:
    <input
      type="number"
      v-model="incXYForm.x"
      class="text-gray-800 w-16 mr-3"
      @change="changeIncXY"
    />
    y:
    <input
      type="number"
      v-model="incXYForm.y"
      class="text-gray-800 w-16 mr-3"
      @change="changeIncXY"
    />
    stepX:
    <input
      type="number"
      v-model="incXYForm.stepX"
      class="text-gray-800 w-16 mr-3"
      @change="changeIncXY"
    />
    stepY:
    <input
      type="number"
      v-model="incXYForm.stepY"
      class="text-gray-800 w-16 mr-3"
      @change="changeIncXY"
    />
    开始索引：
    <input
      type="number"
      v-model="incXYForm.index"
      :max="IMGPATHS.length - 1"
      :min="0"
      class="text-gray-800 w-16 mr-3"
      @change="changeIncXY"
    />
    方向：
    <label for="direction1">
      <input
        type="radio"
        name="direction"
        id="direction1"
        value="1"
        class="text-gray-800"
        :checked="incXYForm.direction === 1"
        @change="changeDirection"
      />1</label
    >
    <label for="direction2">
      <input
        type="radio"
        name="direction"
        id="direction2"
        value="-1"
        :checked="incXYForm.direction === -1"
        class="text-gray-800 ml-3"
        @change="changeDirection"
      />-1</label
    >
    <br />
    <label for="runing">
      <input
        type="checkbox"
        id="runing"
        class="text-gray-800"
        :checked="runingState"
        @change="changeRuningState"
      />持续运动</label
    >
    <label for="runing">
      <input
        type="checkbox"
        id="runing"
        class="text-gray-800"
        :checked="inCameraBounds"
        @change="changeInState"
      />保持在相机视角内</label
    >
  </p>
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import { ref, reactive } from 'vue'
import useGame from '@/hooks/game'
import type { CustomScene } from '@/hooks/game'

// 图片地址
const IMGPATHS = [
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png',
  '/fruits/fruit_strawberry_100.png',
  '/fruits/fruit_watermelon_100.png'
]

const runingState = ref(false)
const inCameraBounds = ref(false)

const incXYForm = reactive({
  x: 1,
  y: 1,
  stepX: 0,
  stepY: 0,
  index: 0,
  direction: 1
})

// 初始化游戏
const { images, WIDTH, HEIGHT } = useGame({
  imgPaths: IMGPATHS,
  addRect: true,
  createFun: function () {
    // 加载图片
    const self = this as CustomScene
    self.cameras.main.setBounds(0, 0, WIDTH, HEIGHT)

    for (let i = 0; i < IMGPATHS.length; i++) {
      const offsetPosition = 40 + i * Phaser.Math.Between(50, 100)
      images[i].setPosition(offsetPosition, offsetPosition)
      images[i].setOrigin(0.5)
    }
    changeIncXY()
  },
  updateFun: function () {
    const self = this as CustomScene
    if (runingState.value) {
      changeIncXY()
    }
    if (inCameraBounds.value) {
      const rect = self.cameras.main.getBounds()
      Phaser.Actions.WrapInRectangle(images, rect, 50)
    }
  }
})

// 改变方向
const changeDirection = (e: Event) => {
  incXYForm.direction = +(e.target as HTMLInputElement).value
  changeIncXY()
}

// 是否持续旋转
const changeRuningState = (e: Event) => {
  runingState.value = (e.target as HTMLInputElement).checked
  changeIncXY()
}
// 是否让图片在相机视角内
const changeInState = (e: Event) => {
  inCameraBounds.value = (e.target as HTMLInputElement).checked
}

// 改变旋转角度
const changeIncXY = () => {
  Phaser.Actions.IncXY(
    images,
    incXYForm.x,
    incXYForm.y,
    incXYForm.stepX,
    incXYForm.stepY,
    incXYForm.index,
    incXYForm.direction
  )
}
</script>
