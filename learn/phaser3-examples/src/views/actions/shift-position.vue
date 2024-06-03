<template>
  头部x: {{ formState.x }} 头部y: {{ formState.y }}
  <br />
  头部为第一个元素还是最后一个:
  <input
    class="text-gray-800 w-16 ml-1"
    type="number"
    :max="1"
    :min="0"
    v-model="formState.direction"
  />
  尾部x:
  <input
    class="text-gray-800 w-16 ml-1"
    type="number"
    v-model="formState.output.x"
  />
  尾部y:
  <input
    class="text-gray-800 w-16 ml-1"
    type="number"
    v-model="formState.output.y"
  />
  <p>
    动画类型：
    <Select
      v-model="animateType"
      @change="addEvent"
      :options="
        Object.keys(AmimationMap).map((i) => ({
          label: i[1],
          value: +i[0]
        }))
      "
    />
  </p>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useGame, { CustomScene } from '@/hooks/game'
import Select from '@/components/common/select.vue'

// 图片地址
const IMGPATHS = [
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png',
  '/fruits/fruit_strawberry_100.png',
  '/fruits/fruit_watermelon_100.png'
]

const formState = reactive({
  x: 0,
  y: 0,
  direction: 1,
  output: {
    x: undefined,
    y: undefined
  }
})

enum Direction {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT
}

enum Animations {
  ROUND,
  SNAKE
}

const AmimationMap = {
  [Animations.ROUND]: '绕圈',
  [Animations.SNAKE]: '贪吃蛇'
}

const animateType = ref(Animations.ROUND)

let self: CustomScene
// 初始化游戏
const { images, WIDTH, HEIGHT, game } = useGame({
  imgPaths: IMGPATHS,
  addRect: true,
  createFun: function () {
    self = this as CustomScene
    images.forEach((item, i) => {
      item.setPosition(formState.x + i * IMG_WIDTH, formState.y)
    })
    addEvent()
  }
})
// 添加动画（定时器事件）
function addEvent() {
  self.time.removeAllEvents()
  self.time.addEvent({
    delay: 100,
    loop: true,
    callback: animateType.value === Animations.ROUND ? round : snake
  })
}

const IMG_WIDTH = 100
const IMG_HEIGHT = 100

let direction = Direction.TOP // 运行方向 1：top 2：right 3：bottom 4：left
// 绕圈
function round() {
  let head: Phaser.GameObjects.Image = formState.direction
    ? images[0]
    : images[images.length - 1]
  let x = head.x
  let y = head.y
  if (
    (direction === Direction.TOP && head.y < IMG_HEIGHT) ||
    (direction === Direction.BOTTOM && head.y > HEIGHT - 2 * IMG_HEIGHT)
  ) {
    if (head.x < IMG_WIDTH) {
      direction = Direction.RIGHT
    } else if (head.x > WIDTH - IMG_WIDTH) {
      direction = Direction.LEFT
    } else {
      direction = Math.random() > 0.5 ? Direction.RIGHT : Direction.LEFT
    }
    x = x + IMG_WIDTH * (direction === Direction.RIGHT ? 1 : -1)
  } else if (direction === Direction.TOP) {
    y -= IMG_HEIGHT
  } else if (direction === Direction.BOTTOM) {
    y += IMG_HEIGHT
  }
  if (
    (direction === Direction.LEFT && head.x < IMG_WIDTH) ||
    (direction === Direction.RIGHT && head.x > WIDTH - IMG_WIDTH)
  ) {
    if (head.y < IMG_HEIGHT) {
      direction = Direction.BOTTOM
    } else if (head.y > HEIGHT - 2 * IMG_HEIGHT) {
      direction = Direction.TOP
    } else {
      direction = Math.random() > 0.5 ? Direction.BOTTOM : Direction.TOP
    }
    y = y + IMG_HEIGHT * (direction === Direction.BOTTOM ? 1 : -1)
  } else if (direction === Direction.LEFT) {
    x -= IMG_WIDTH
  } else if (direction === Direction.RIGHT) {
    x += IMG_WIDTH
  }
  formState.x = x
  formState.y = y
  Phaser.Actions.ShiftPosition(
    images,
    formState.x,
    formState.y,
    formState.direction
  )
}
// 贪吃蛇
let distance = Phaser.Math.Between(4, 8)
function snake() {
  let head: Phaser.GameObjects.Image = formState.direction
    ? images[0]
    : images[images.length - 1]
  let x = head.x
  let y = head.y
  if (direction === Direction.TOP) {
    y = Phaser.Math.Wrap(y - IMG_HEIGHT, 0, HEIGHT)
  } else if (direction === Direction.RIGHT) {
    x = Phaser.Math.Wrap(x + IMG_WIDTH, 0, WIDTH)
  } else if (direction === Direction.LEFT) {
    x = Phaser.Math.Wrap(x - IMG_WIDTH, 0, WIDTH)
  } else if (direction === Direction.BOTTOM) {
    y = Phaser.Math.Wrap(y + IMG_HEIGHT, 0, HEIGHT)
  }

  formState.x = x
  formState.y = y

  Phaser.Actions.ShiftPosition(images, x, y, formState.direction)

  distance--

  if (distance === 0) {
    if ([Direction.TOP, Direction.BOTTOM].includes(direction)) {
      direction = Math.random() > 0.5 ? Direction.LEFT : Direction.RIGHT
    } else {
      direction = Math.random() > 0.5 ? Direction.TOP : Direction.BOTTOM
    }
    distance = Phaser.Math.Between(4, 12)
  }
}
</script>
