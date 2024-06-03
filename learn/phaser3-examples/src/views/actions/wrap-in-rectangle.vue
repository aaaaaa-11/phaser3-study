<template>
  矩形区域: x<input
    class="text-gray-800 w-16 ml-1"
    type="number"
    :min="100"
    v-model="formState.x"
    @change="updateRect"
  />
  y:
  <input
    class="text-gray-800 w-16 ml-1"
    type="number"
    :min="100"
    v-model="formState.y"
    @change="updateRect"
  />
  width<input
    class="text-gray-800 w-16 ml-1"
    type="number"
    :min="100"
    v-model="formState.width"
    @change="updateRect"
  />
  height:
  <input
    class="text-gray-800 w-16 ml-1"
    type="number"
    :min="100"
    v-model="formState.height"
    @change="updateRect"
  />
  区域内边距:
  <input
    class="text-gray-800 w-16 ml-1"
    type="number"
    v-model="formState.padding"
    @change="updateRect"
  />
  <br />
  这里的图片原点设置为图片中心点
  <br />
  当中心点超出矩形区域时，图片会被重置到矩形区域内
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import useGame, { CustomScene } from '@/hooks/game'

// 图片地址
const IMGPATHS = [
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png',
  '/fruits/fruit_strawberry_100.png',
  '/fruits/fruit_watermelon_100.png'
]

const formState = reactive({
  x: 400,
  y: 200,
  width: 100,
  height: 100,
  padding: 200
})

let rect: Phaser.GameObjects.Rectangle
let wrapRect: Phaser.Geom.Rectangle

// 初始化游戏
const { images, WIDTH, HEIGHT } = useGame({
  imgPaths: IMGPATHS,
  createFun: function () {
    const self = this as CustomScene
    // formState.padding = images[0].width / 2
    rect = self.add.rectangle().setOrigin(0, 0)
    rect.setStrokeStyle(2, 0xffffff)
    wrapRect = new Phaser.Geom.Rectangle()
    updateRect()
    images.forEach((i) => {
      i.setPosition(formState.x, formState.y)
      i.setOrigin(0.5)
    })
  },
  updateFun: function () {
    images.forEach((img, i) => {
      img.x += 1 + 0.1 * i
      img.y += 1 + 0.1 * i
    })
    Phaser.Actions.WrapInRectangle(images, wrapRect, formState.padding)
  }
})

const updateRect = () => {
  const w = formState.width + formState.padding * 2
  const h = formState.height + formState.padding * 2
  rect.setPosition(
    w > 0 ? formState.x - formState.padding : formState.x + w,
    h > 0 ? formState.y - formState.padding : formState.y + h
  )
  rect.setSize(Math.abs(w), Math.abs(h))
  wrapRect.setPosition(formState.x, formState.y)
  wrapRect.setSize(formState.width, formState.height)
}
</script>
