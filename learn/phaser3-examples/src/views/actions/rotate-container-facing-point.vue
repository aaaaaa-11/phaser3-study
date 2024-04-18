<template>
  speed:
  <input
    type="number"
    :min="-1"
    v-model="formState.speed"
    class="text-gray-800 w-16 mr-3"
  />
  distance:
  <input
    type="number"
    :min="-1"
    v-model="formState.distance"
    class="text-gray-800 w-16 mr-3"
  />
  <br />
  中心点: x
  <input
    type="number"
    :min="-1"
    v-model="formState.center.x"
    class="text-gray-800 w-16 mr-3"
    @change="changeCenter"
  />
  y:
  <input
    type="number"
    :min="-1"
    v-model="formState.center.y"
    class="text-gray-800 w-16 mr-3"
    @change="changeCenter"
  />
  <br />
  <Runing v-model:runing-state="formState.runingState" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useGame, { CustomScene } from '@/hooks/game'
import Runing from '@/components/runing.vue'

// 图片地址
const IMGPATHS = [
  // '/fruits/fruit_banana_100.png',
  // '/fruits/fruit_grape_100.png',
  // '/fruits/fruit_pineapple_100.png',
  '/fruits/fruit_strawberry_100.png',
  '/fruits/fruit_watermelon_100.png',
  '/fruits/fruit_grape_100.png'
]

const formState = reactive({
  speed: 0.01,
  distance: 250,
  runingState: false,
  center: { x: 400, y: 230 }
})

let container: Phaser.GameObjects.Container | null = null
const images: Phaser.GameObjects.Image[] = []
let centerImg: Phaser.GameObjects.Image | null = null
// 初始化游戏
useGame({
  imgPaths: IMGPATHS,
  addImg: false,
  createFun: function () {
    const self = this as CustomScene
    centerImg = self.add.image(0, 0, self.imgKeys[0])
    centerImg.setPosition(formState.center.x, formState.center.y)
    images[0] = self.add.image(0, 0, self.imgKeys[1])
    images[1] = self.add.image(50, 0, self.imgKeys[2])
    container = self.add.container(600, 300)
  },
  updateFun: () => {
    const ctn = container as Phaser.GameObjects.Container
    formState.runingState &&
      Phaser.Actions.RotateAroundDistance(
        [ctn],
        formState.center,
        formState.speed,
        formState.distance
      )
    const { x, y } = formState.center
    const angleDeg = (Math.atan2(ctn.y - y, ctn.x - x) * 180) / Math.PI
    ctn.angle = angleDeg - 90
  }
})

const changeCenter = () => {
  centerImg?.setPosition(formState.center.x, formState.center.y)
}
</script>
