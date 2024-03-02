<template>
  <p>对齐方式：</p>
  <select v-model="activeAlign" class="text-gray-800" @change="changeAlignTo">
    <option v-for="i in aligns" :key="i" :value="i">{{ i }}</option>
  </select>
  {{ alignsMap[activeAlign] }} 对齐
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import { onMounted, onUnmounted, ref } from 'vue'

const origin = location.origin // 项目域名

// canvas大小
const WIDTH = innerWidth * 0.8
const HEIGHT = innerHeight * 0.8

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

// 存储图片
const sprites: Phaser.GameObjects.Image[] = []

let game: Phaser.Game
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
    // 设置一个参考矩形
    this.add
      .rectangle(0, HEIGHT * 0.5 - 50, WIDTH, 100, 0x9d2d9d)
      .setOrigin(0, 0)

    // 添加图片
    for (let i = 0; i < IMGPATHS.length; i++) {
      const img = this.add
        .image(WIDTH * 0.5, HEIGHT * 0.5, `img${i}`)
        .setOrigin(0, 0)
      sprites.push(img)
    }

    // 右下对齐排列
    changeAlignTo()
  }
}

// 切换对齐方式
const activeAlign = ref<keyof typeof Phaser.Display.Align>('RIGHT_BOTTOM')
const aligns: string[] = [
  'TOP_LEFT',
  'TOP_CENTER',
  'TOP_RIGHT',
  'LEFT_TOP',
  'LEFT_CENTER',
  'LEFT_BOTTOM',
  'CENTER',
  'RIGHT_TOP',
  'RIGHT_CENTER',
  'RIGHT_BOTTOM',
  'BOTTOM_LEFT',
  'BOTTOM_CENTER',
  'BOTTOM_RIGHT'
]
// 对齐方式-文字描述 映射
const alignsMap: Record<string, string> = {
  TOP_LEFT: '上左',
  TOP_CENTER: '上中',
  TOP_RIGHT: '上右',
  LEFT_TOP: '左上',
  LEFT_CENTER: '左中',
  LEFT_BOTTOM: '左下',
  CENTER: '中间',
  RIGHT_TOP: '右上',
  RIGHT_CENTER: '右中',
  RIGHT_BOTTOM: '右下',
  BOTTOM_LEFT: '下左',
  BOTTOM_CENTER: '下中',
  BOTTOM_RIGHT: '下右'
}
// 改变对齐方式
const changeAlignTo = () => {
  Phaser.Actions.AlignTo(
    sprites,
    Phaser.Display.Align[activeAlign.value] as number
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
  // 销毁游戏
  game.destroy(true)
})
</script>
