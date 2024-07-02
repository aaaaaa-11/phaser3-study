<template>
  frameRate:
  <input
    class="text-gray-800 w-16 ml-1"
    type="number"
    :max="60"
    :min="0"
    v-model="formState.frameRate"
    @change="addAnimation()"
  />
  repeat:
  <input
    class="text-gray-800 w-16 ml-1"
    type="number"
    v-model="formState.repeat"
    @change="addAnimation()"
  />
  <br />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useGame, { CustomScene } from '@/hooks/game'

// 图片地址
const IMGPATHS = ['/game/dude.png']

const formState = reactive({
  frameKey: '',
  frameRate: 10,
  repeat: -1,
  property: 'x',
  min: 0,
  max: 100,
  inc: '1'
})

let anims: Phaser.Animations.Animation | undefined | boolean

const spritePaths = IMGPATHS.map((i) => ({
  path: i,
  config: { frameWidth: 32, frameHeight: 48 }
}))

// 初始化游戏
const { sprites, WIDTH, HEIGHT } = useGame({
  spritePaths,
  createFun: function () {
    const self = this as CustomScene
    formState.frameKey = self.imgKeys[0]
    addAnimation(self)
  }
})

const addAnimation = (self?: CustomScene) => {
  sprites[0].setPosition(WIDTH / 2, HEIGHT / 2)
  if (!anims) {
    anims = self?.anims.create({
      key: 'walk',
      frames: self?.anims.generateFrameNumbers(formState.frameKey, {
        start: 0,
        end: 3
      }), // 精灵图中0~3前4帧向左
      frameRate: formState.frameRate,
      repeat: formState.repeat
    })
  } else {
    const ani = anims as Phaser.Animations.Animation
    if (formState.frameRate > 60) formState.frameRate = 60
    else if (formState.frameRate < 0) formState.frameRate = 0
    ani.frameRate = formState.frameRate
    ani.repeat = formState.repeat
  }
  sprites[0].play('walk')
}
</script>
