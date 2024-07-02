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
  <br />
  膨胀： inflateX:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="formState.inflateX"
    :min="0"
  />
  inflateY:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="formState.inflateY"
    :min="0"
  />
  <button class="bg-indigo-800 rounded-md px-2 py-1 mb-1" @click="getBounds">
    获取膨胀矩形边界
  </button>
  <button class="bg-indigo-800 rounded-md px-2 py-1 mb-1" @click="draw">
    画出膨胀后的矩形轮廓
  </button>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import useGame, { CustomScene } from '@/hooks/game'

const formState = reactive({
  x: 100,
  y: 100,
  width: 200,
  height: 200,
  inflateX: 100,
  inflateY: 100
})

let self: CustomScene
let visibleRect: Phaser.GameObjects.Rectangle

const rect = ref<Phaser.Geom.Rectangle>(new Phaser.Geom.Rectangle())
let visibleInflateRect: Phaser.GameObjects.Rectangle

useGame({
  physicType: 'arcade',
  createFun: function () {
    self = this as CustomScene
    visibleRect = self.add
      .rectangle()
      .setOrigin(0, 0)
      .setStrokeStyle(2, 0xffffff)
    setTo()
  }
})
const setTo = () => {
  rect.value.setTo(formState.x, formState.y, formState.width, formState.height)

  visibleRect.setPosition(formState.x, formState.y)
  visibleRect.setSize(formState.width, formState.height)
}

const getBounds = () => {
  setTo()
  const bounds = Phaser.Geom.Rectangle.Inflate(
    Phaser.Geom.Rectangle.Clone(rect.value),
    formState.inflateX,
    formState.inflateY
  )
  alert(JSON.stringify(bounds))
}
const draw = () => {
  if (!visibleInflateRect) {
    visibleInflateRect = self.add
      .rectangle()
      .setOrigin(0, 0)
      .setStrokeStyle(2, 0xffa1ff)
  }
  const { x, y, width, height } = rect.value
  visibleInflateRect.setSize(
    width + formState.inflateX * 2,
    height + formState.inflateY * 2
  )
  visibleInflateRect.setPosition(
    x - formState.inflateX,
    y - formState.inflateY,
    y
  )
}
</script>
<style lang="scss" scoped></style>
