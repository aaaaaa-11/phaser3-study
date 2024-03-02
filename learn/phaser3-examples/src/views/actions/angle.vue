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
    方向：
    <label for="direction1">
      <input
        type="radio"
        name="direction"
        id="direction1"
        value="1"
        class="text-gray-800"
        :checked="angleForm.direction === 1"
        @change="changeDirection"
      />1</label
    >
    <label for="direction2">
      <input
        type="radio"
        name="direction"
        id="direction2"
        value="-1"
        :checked="angleForm.direction === -1"
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
  </p>
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import { onMounted, onUnmounted, ref, reactive } from 'vue'

const origin = location.origin // 项目域名

// canvas大小
const WIDTH = innerWidth * 0.8
const HEIGHT = innerHeight * 0.8

// 图片地址
const IMGPATHS = [
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png',
  '/fruits/fruit_strawberry_100.png',
  '/fruits/fruit_watermelon_100.png'
]

// 存储图片
const sprites: Phaser.GameObjects.Image[] = []

let game: Phaser.Game

const runingState = ref(false)

const angleForm = reactive({
  value: 1,
  step: 1,
  index: 0,
  direction: 1
})

// 场景
class Example extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    // 加载图片
    IMGPATHS.forEach((path, i) => {
      this.load.image('img' + i, origin + path)
    })
  }

  create() {
    // 加载图片
    for (let i = 0; i < IMGPATHS.length; i++) {
      const offsetPosition = 40 + i * Phaser.Math.Between(50, 100)
      const img = this.add
        .image(offsetPosition, offsetPosition, `img${i}`)
        .setOrigin(0, 0)
      sprites.push(img)
    }

    // 更新角度
    changeAngle()
  }

  update() {
    runingState.value && changeAngle()
  }
}

// 改变方向
const changeDirection = (e: Event) => {
  angleForm.direction = +(e.target as HTMLInputElement).value
  changeAngle()
}

// 是否持续旋转
const changeRuningState = (e: Event) => {
  runingState.value = (e.target as HTMLInputElement).checked
  changeAngle()
}

// 改变旋转角度
const changeAngle = () => {
  Phaser.Actions.Angle(
    sprites,
    angleForm.value,
    angleForm.step,
    angleForm.index,
    angleForm.direction
  )
}

onMounted(() => {
  // 加载游戏场景
  const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#2d2d2d',
    parent: 'game',
    pixelArt: true,
    scene: Example
  }
  game = new Phaser.Game(config)
})

onUnmounted(() => {
  game.destroy(true)
})
</script>
