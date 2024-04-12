<template>
  <p>
    <Align ref="alignRef" :items="sprites" @changeAlignTo="updateGridAlign" />
  </p>
  <p>
    横向排列数（-1则表示一行排列）:
    <input
      type="number"
      :min="-1"
      v-model="formState.width"
      class="text-gray-800 w-16 mr-3"
      @change="updateGridAlign"
    />
    <br />
    纵向排列数（-1且横向排列不为-1，则表示一列排列）:
    <input
      type="number"
      :min="-1"
      v-model="formState.height"
      class="text-gray-800 w-16 mr-3"
      @change="updateGridAlign"
    />
    <br />
    cellWidth:
    <input
      type="number"
      v-model="formState.cellWidth"
      class="text-gray-800 w-16 mr-3"
      @change="updateGridAlign"
    />
    cellHeight:
    <input
      type="number"
      v-model="formState.cellHeight"
      class="text-gray-800 w-16 mr-3"
      @change="updateGridAlign"
    />
    x:
    <input
      type="number"
      v-model="formState.x"
      class="text-gray-800 w-16 mr-3"
      @change="updateGridAlign"
    />
    y:
    <input
      type="number"
      v-model="formState.y"
      class="text-gray-800 w-16 mr-3"
      @change="updateGridAlign"
    />
  </p>
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import { reactive, ref, computed } from 'vue'
import useGame from '@/hooks/game'
import type { Ref } from 'vue'
import type { CustomScene } from '@/hooks/game'

import Align from '@/components/align.vue'

// 条件对象
const formState = reactive({
  width: 5,
  height: 10,
  cellWidth: 50,
  cellHeight: 50,
  x: 0,
  y: 0
})

const alignRef = ref()
const activeAlign: Ref<AlignKey> = computed(() => alignRef.value?.activeAlign)

let group: Phaser.GameObjects.Group | null = null

// 创建游戏界面
const { sprites } = useGame({
  spritePaths: [
    {
      path: '/game/dude.png',
      config: {
        frameWidth: 32,
        frameHeight: 48
      }
    }
  ],
  addImg: false,
  createFun: function () {
    const self = this as CustomScene
    const frameKey = self.imgKeys[0]

    group = self.add.group({
      key: frameKey,
      frame: [0, 1, 4, 5, 6],
      frameQuantity: 5
    })

    updateGridAlign()
  }
})

const updateGridAlign = () => {
  Phaser.Actions.GridAlign((group as Phaser.GameObjects.Group).getChildren(), {
    width: formState.width,
    height: formState.height,
    cellWidth: formState.cellWidth,
    cellHeight: formState.cellHeight,
    x: formState.x,
    y: formState.y,
    position: Phaser.Display.Align[activeAlign.value]
  })
}
</script>
