<template>
  <p>
    方向：
    <Radio
      :options="[
        {
          label: '朝左',
          value: animationKey.WALK_LEFT
        },
        {
          label: '朝右',
          value: animationKey.WALK_RIGHT
        }
      ]"
      v-model="formState.direction"
      @change="changeDirection"
    />
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
import Radio from '@/components/common/radio.vue'

// 动画key
const animationKey = {
  WALK_LEFT: 'walk-left',
  WALK_RIGHT: 'walk-right'
}

// 条件对象
const formState = reactive({
  direction: animationKey.WALK_RIGHT,
  width: 10,
  height: 10,
  cellWidth: 50,
  cellHeight: 50,
  x: 0,
  y: 0
})

const alignRef = ref()
const activeAlign: Ref<AlignKey> = computed(() => alignRef.value?.activeAlign)

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
    // 创建动画
    self.anims.create({
      key: animationKey.WALK_LEFT,
      frames: self.anims.generateFrameNumbers(frameKey, {
        start: 0,
        end: 3
      }),
      frameRate: 16,
      repeat: -1
    })
    self.anims.create({
      key: animationKey.WALK_RIGHT,
      frames: self.anims.generateFrameNumbers(frameKey, {
        start: 5,
        end: 8
      }),
      frameRate: 16,
      repeat: -1
    })

    for (let i = 0; i < 30; i++) {
      // 添加图片并播放动画
      sprites.push(self.add.sprite(0, 0, frameKey).play(formState.direction))
    }

    updateGridAlign()
  }
})

// 改变方向
const changeDirection = () => {
  sprites.forEach((s) => {
    s.play(formState.direction)
  })
}

const updateGridAlign = () => {
  Phaser.Actions.GridAlign(sprites, {
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
