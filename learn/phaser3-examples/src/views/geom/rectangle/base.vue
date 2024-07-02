<template>
  <p>
    Phaser.Geom.Rectangle设置的矩形不可见，上方的白色矩形为Phaser.GameObjects.Rectangle，用于辅助观察。
  </p>
  矩形属性：x:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="formState.x"
    @change="setTo"
  />
  y:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="formState.y"
    @change="setTo"
  />
  width:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="formState.width"
    :min="0"
    @change="setTo"
  />
  height:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="formState.height"
    :min="0"
    @change="setTo"
  />
  centerX:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="formState.centerX"
    :min="0"
    @change="centerOn"
  />
  centerY:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="formState.centerY"
    :min="0"
    @change="centerOn"
  />
  left:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="rect.left"
    :min="0"
    @change="setVisibleRect"
  />
  right:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="rect.right"
    :min="0"
    @change="setVisibleRect"
  />
  top:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="rect.top"
    :min="0"
    @change="setVisibleRect"
  />
  bottom:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="rect.bottom"
    :min="0"
    @change="setVisibleRect"
  />
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import useGame, { CustomScene } from '@/hooks/game'

const formState = reactive({
  x: 100,
  y: 100,
  width: 200,
  height: 200,
  centerX: 200,
  centerY: 200
})

const rect = ref<Phaser.Geom.Rectangle>(new Phaser.Geom.Rectangle())

const IMGPATHS = ['/fruits/fruit_strawberry_100.png']

let self: CustomScene
let visibleRect: Phaser.GameObjects.Rectangle
let img: Phaser.Types.Physics.Arcade.ImageWithDynamicBody

useGame({
  physicType: 'arcade',
  imgPaths: IMGPATHS,
  addImg: false,
  createFun: function () {
    self = this as CustomScene
    visibleRect = self.add
      .rectangle()
      .setOrigin(0, 0)
      .setStrokeStyle(2, 0xffffff)
    setTo()
    img = self.physics.add.image(
      formState.x + formState.width / 2,
      formState.y + formState.height / 2,
      self.imgKeys[0]
    )
    img.setSize(formState.width / 2, formState.height / 2)
    img.setVelocity(100, 40)
  },
  updateFun: function () {
    Phaser.Actions.WrapInRectangle([img], rect.value, -img.width / 2)
  }
})

const setTo = () => {
  rect.value.setTo(formState.x, formState.y, formState.width, formState.height)

  visibleRect.setPosition(formState.x, formState.y)
  visibleRect.setSize(formState.width, formState.height)
}
const centerOn = () => {
  rect.value.centerX = formState.centerX
  rect.value.centerY = formState.centerY

  visibleRect.setPosition(rect.value.x, rect.value.y)
}

const setVisibleRect = () => {
  visibleRect.setPosition(rect.value.x, rect.value.y)
  visibleRect.setSize(rect.value.width, rect.value.height)
}
</script>
<style lang="scss" scoped></style>
