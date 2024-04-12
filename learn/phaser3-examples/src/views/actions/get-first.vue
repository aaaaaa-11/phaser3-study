<template>
  <p>
    <span class="mr-5" v-for="f in framesList" :key="f[0]"
      >{{ f[0] }} 规格 {{ f[1] }}</span
    >
  </p>
  <p class="mt-3">获取满足条件的第一个元素，条件：</p>
  <p>
    规格(整数):
    <input
      type="number"
      :max="4"
      :min="1"
      v-model="compareForm.scale"
      class="text-gray-800 w-16 mr-3"
      @change="getFirstItem"
    />
    图片名称：
    <select
      v-model="compareForm.img"
      class="text-gray-800"
      @change="getFirstItem"
    >
      <option value="">不选</option>
      <option v-for="i in imgKeys" :key="i" :value="i">{{ i }}</option>
    </select>
    {{ error }}
  </p>
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import { ref, reactive } from 'vue'
import useGame from '@/hooks/game'
import type { CustomScene } from '@/hooks/game'

// 图片地址
const IMGPATHS = [
  '/game/bomb.png',
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_strawberry_100.png',
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_watermelon_100.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png',
  '/fruits/fruit_pineapple_100.png',
  '/game/star.png',
  '/fruits/fruit_watermelon_100.png'
]

const error = ref('') // 未获取到元素时的提示信息
// 条件对象
const compareForm = reactive({
  scale: 1,
  img: ''
})

const framesList = ref<[string, number][]>([])
const imgKeys = ref<string[]>([])

// 初始化游戏
const { images, WIDTH, HEIGHT, game } = useGame({
  imgPaths: IMGPATHS,
  addRect: true,
  createFun: function () {
    const self = this as CustomScene
    imgKeys.value = self.imgKeys
    // 加载图片
    for (let i = 0; i < IMGPATHS.length; i++) {
      const x = Phaser.Math.Between(0, WIDTH - 400)
      const y = Phaser.Math.Between(0, HEIGHT - 400)
      images[i].setPosition(x, y)
      const scale = +Phaser.Math.Between(1, 4).toFixed(1)
      framesList.value.push([self.imgKeys[i], scale])
      images[i].setScale(scale)
    }
    // 监听条件修改，获取满足条件的元素
    self.game.events.on('findFirstItem', () => {
      console.log('on')
      // 条件对象
      const compare: Record<string, unknown> = { scale: compareForm.scale }
      if (compareForm.img) {
        const frame = self.textures.getFrame(compareForm.img, 0)
        compare.frame = frame
      }
      // 获取满足条件的第一个元素
      const item = Phaser.Actions.GetFirst(
        images,
        compare
      ) as Phaser.GameObjects.Image
      // 元素存在
      if (item) {
        error.value = ''
        const originScale = item.scale
        self.children.bringToTop(item) // 放到最上面
        // 动画，将该元素放大至原始尺寸的5倍，然后再还原
        self.tweens.chain({
          targets: item,
          tweens: [
            {
              scale: 5,
              duration: 400,
              ease: 'Bounce.easeOut'
            },
            {
              delay: 500,
              scale: originScale,
              duration: 1000
            }
          ]
        })
      } else {
        // 元素不存在
        error.value = '没有满足条件的元素'
      }
    })
  }
})

// 获取满足条件的第一个元素
const getFirstItem = () => {
  game.value?.events.emit('findFirstItem')
}
</script>
