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
      <option v-for="i in imgFrames" :key="i" :value="i">{{ i }}</option>
    </select>
    {{ error }}
  </p>
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import { onMounted, onUnmounted, ref, reactive } from 'vue'

const origin = location.origin // 项目域名

// canvas大小
const WIDTH = innerWidth * 0.8
const HEIGHT = innerHeight * 0.8

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
// 图片key
const imgFrames = Array(IMGPATHS.length)
  .fill(0)
  .map((_, i) => 'img' + i)
// 存储图片
const sprites: Phaser.GameObjects.Image[] = []

let game: Phaser.Game

const error = ref('') // 未获取到元素时的提示信息
// 条件对象
const compareForm = reactive({
  scale: 1,
  img: ''
})

const framesList = ref<[string, number][]>([])

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
    // 加载图片
    for (let i = 0; i < IMGPATHS.length; i++) {
      const x = Phaser.Math.Between(0, WIDTH - 400)
      const y = Phaser.Math.Between(0, HEIGHT - 400)
      const img = this.add.image(x, y, imgFrames[i]).setOrigin(0, 0)
      const scale = +Phaser.Math.Between(1, 4).toFixed(1)
      framesList.value.push([imgFrames[i], scale])
      img.setScale(scale)
      sprites.push(img)
    }

    // 监听条件修改，获取满足条件的元素
    this.game.events.on('findFirstItem', () => {
      // 条件对象
      const compare: Record<string, unknown> = { scale: compareForm.scale }
      if (compareForm.img) {
        const frame = this.textures.getFrame(compareForm.img, 0)
        compare.frame = frame
      }
      // 获取满足条件的第一个元素
      const item = Phaser.Actions.GetFirst(
        sprites,
        compare
      ) as Phaser.GameObjects.Image
      // 元素存在
      if (item) {
        error.value = ''
        const originScale = item.scale
        this.children.bringToTop(item) // 放到最上面
        // 动画，将该元素放大至原始尺寸的5倍，然后再还原
        this.tweens.chain({
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
}

// 获取满足条件的第一个元素
const getFirstItem = () => {
  game.events.emit('findFirstItem')
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
  game.destroy(true)
})
</script>
