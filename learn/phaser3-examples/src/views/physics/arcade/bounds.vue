<template>
  <button class="bg-indigo-800 rounded-md px-2 py-1 mb-1" @click="getBounds">
    获取边界</button
  ><br />
  设置物理世界边界：x:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="formState.x"
    @change="setBounds"
  />
  y:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="formState.y"
    @change="setBounds"
  />
  width:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="formState.width"
    :min="0"
    @change="setBounds"
  />
  height:
  <input
    class="w-16 text-gray-800"
    type="number"
    v-model="formState.height"
    :min="0"
    @change="setBounds"
  />
  <br />
  检测边界：<Checkbox
    @change="changeCheckBounds"
    :options="boundsOptions"
    v-model="formState.bounds"
  />
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import useGame, { CustomScene } from '@/hooks/game'
import Checkbox from '@/components/common/checkbox.vue'

const boundsOptions = [
  {
    label: '左',
    value: 'left'
  },
  {
    label: '右',
    value: 'right'
  },
  {
    label: '上',
    value: 'top'
  },
  {
    label: '下',
    value: 'bottom'
  }
]

const formState = reactive({
  x: 0,
  y: 0,
  width: 200,
  height: 200,
  bounds: boundsOptions.map((i) => i.value)
})

const IMGPATHS = ['/fruits/fruit_strawberry_100.png']

let self: CustomScene
let rect: Phaser.GameObjects.Rectangle

useGame({
  physicType: 'arcade',
  imgPaths: IMGPATHS,
  addImg: false,
  createFun: function () {
    self = this as CustomScene
    rect = self.add.rectangle().setOrigin(0, 0).setStrokeStyle(2, 0xffffff)
    setBounds()
    const img = self.physics.add
      .image(
        formState.x + formState.width / 2,
        formState.y + formState.height / 2,
        self.imgKeys[0]
      )
      .setBounce(1)
      .setCollideWorldBounds(true)
    img.setSize(formState.width / 2, formState.height / 2)
    img.setVelocity(100, 40)
  }
})

const setBounds = () => {
  self.physics.world.setBounds(
    formState.x,
    formState.y,
    formState.width,
    formState.height
  )

  rect.setPosition(formState.x, formState.y)
  rect.setSize(formState.width, formState.height)
}

const changeCheckBounds = () => {
  self.physics.world.setBoundsCollision(
    ...boundsOptions.map((i) => formState.bounds.includes(i.value))
  )
}

const getBounds = () => {
  alert(JSON.stringify(self.physics.world.bounds))
}
</script>
<style lang="scss" scoped></style>
