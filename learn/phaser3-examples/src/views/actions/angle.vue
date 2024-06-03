<template>
  <p>
    角度:
    <input
      type="number"
      v-model="angleForm.value"
      class="text-gray-800 w-16 mr-3"
      @change="changeAngle"
    />
    步进:
    <input
      type="number"
      v-model="angleForm.step"
      class="text-gray-800 w-16 mr-3"
      @change="changeAngle"
    />
    开始索引：
    <input
      type="number"
      v-model="angleForm.index"
      :max="IMGPATHS.length - 1"
      :min="0"
      class="text-gray-800 w-16 mr-3"
      @change="changeAngle"
    />
    <Direction v-model="angleForm.direction" @change="changeAngle" />
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
  </p>
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import { ref, reactive } from 'vue'
import useGame from '@/hooks/game'
import Direction from '@/components/direction.vue'

// 图片地址
const IMGPATHS = [
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png',
  '/fruits/fruit_strawberry_100.png',
  '/fruits/fruit_watermelon_100.png'
]

const runingState = ref(false)

const angleForm = reactive({
  value: 1,
  step: 1,
  index: 0,
  direction: '1'
})

// 初始化游戏
const { images } = useGame({
  imgPaths: IMGPATHS,
  addRect: true,
  createFun: () => {
    // 加载图片
    for (let i = 0; i < IMGPATHS.length; i++) {
      const offsetPosition = 40 + i * Phaser.Math.Between(50, 100)
      images[i].setPosition(offsetPosition, offsetPosition)
    }
    changeAngle()
  },
  updateFun: () => {
    runingState.value && changeAngle()
  }
})

// 是否持续旋转
const changeRuningState = (e: Event) => {
  runingState.value = (e.target as HTMLInputElement).checked
  changeAngle()
}

// 改变旋转角度
const changeAngle = () => {
  Phaser.Actions.Angle(
    images,
    angleForm.value,
    angleForm.step,
    angleForm.index,
    +angleForm.direction
  )
}
</script>
