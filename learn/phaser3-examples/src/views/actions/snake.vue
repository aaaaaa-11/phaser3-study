<template>
  <p>
    上下左右箭头控制蛇移动，蛇头碰到自己时游戏结束，迟到食物得分，蛇身边长，速度随蛇身变长而加快
  </p>
  <p>分数：{{ score }}</p>
  <p>速度：{{ speed.toFixed(0) }}</p>
</template>

<script setup lang="ts">
import useGame, { CustomScene } from '@/hooks/game'
import { GameEvents } from '@/utils/enums'
import { onUnmounted, ref } from 'vue'

type Image = Phaser.GameObjects.Image

let score = ref(0)

// 图片地址
const IMGPATHS = ['/snake/head.png', '/snake/body.png']

// 方位枚举
enum Direction {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT
}

// 图片大小
const IMG_WIDTH = 30
const IMG_HEIGHT = 30

let snakeGroup: Phaser.GameObjects.Group // 贪吃蛇组
let snake: Image[] // 存储贪吃蛇每个元素数组
let head: Image // 头
let tail: Image // 尾
let self: CustomScene
let direction = Phaser.Math.Between(Direction.TOP, Direction.LEFT) // 运行方向
let foodImg: Image
const speed = ref(400)
let selfOverlap: Phaser.Physics.Arcade.Collider

// 记录当前snake每个元素的位置
const snakePos: number[][] = []

const { images, WIDTH, HEIGHT, game } = useGame({
  addRect: true,
  imgPaths: IMGPATHS,
  physicType: 'arcade',
  createFun: function () {
    self = this as CustomScene

    const wScale = WIDTH / IMG_WIDTH
    const hScale = HEIGHT / IMG_HEIGHT
    self.physics.world.setBounds(0, 0, WIDTH, HEIGHT) // 启用物理系统

    // 记录头尾
    head = images[0]
    tail = images[1]

    // 贪吃蛇
    snake = [tail, head]
    const tailPos = [
      IMG_WIDTH * Phaser.Math.Between(2, wScale - 3),
      IMG_HEIGHT * Phaser.Math.Between(2, hScale - 3)
    ]
    tail.setPosition(...tailPos)
    snakePos.push(tailPos)
    // 根据direction生成head位置
    let hx = 0
    let hy = 0
    if (direction === Direction.TOP) {
      hx = tailPos[0]
      hy = tailPos[1] - IMG_HEIGHT
    } else if (direction === Direction.RIGHT) {
      hx = tailPos[0] + IMG_WIDTH
      hy = tailPos[1]
    } else if (direction === Direction.BOTTOM) {
      hx = tailPos[0]
      hy = tailPos[1] + IMG_HEIGHT
    } else if (direction === Direction.LEFT) {
      hx = tailPos[0] - IMG_WIDTH
      hy = tailPos[1]
    }
    head.setPosition(hx, hy)
    snakePos.push([hx, hy])
    snakeGroup = self.physics.add.group([head, tail])

    // 添加食物
    addFood()

    // 添加移动动画
    addMove()

    // 添加键盘事件
    addKeyboardEvents()
  }
})

const wScale = WIDTH / IMG_WIDTH
const hScale = HEIGHT / IMG_HEIGHT
// 随机生成食物位置，如果和贪吃蛇重合，则重新生成
const createFoodPos = () => {
  const [x, y] = [
    IMG_WIDTH * Phaser.Math.Between(0, wScale - 1),
    IMG_HEIGHT * Phaser.Math.Between(0, hScale - 1)
  ]
  // 如果和贪吃蛇重合，则重新生成
  snakePos.forEach(([sx, sy]) => {
    if (x >= sx && x <= sx + IMG_WIDTH && y >= sy && y <= sy + IMG_HEIGHT) {
      return createFoodPos()
    }
  })
  return [x, y]
}

// 添加食物
function addFood() {
  foodImg = self.physics.add
    .image(0, 0, tail.texture.key)
    .setOrigin(0, 0) as Image
  const [x, y] = createFoodPos()
  foodImg.setPosition(x, y)
  self.physics.world.enable(foodImg)
  self.physics.add.existing(foodImg)
  ;(foodImg.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true)

  // 添加贪吃蛇-食物碰撞
  self.physics.add.overlap(head, foodImg, eatFood, undefined, self)
}

// 碰到食物
function eatFood(obj1: any, obj2: any) {
  self.physics.world.removeCollider(selfOverlap)
  const food = obj2 as Image
  food.setPosition(...snakePos[0])
  snakeGroup.add(food)
  snake.unshift(food)

  score.value += 1
  if (speed.value >= 100) {
    speed.value *= 0.95
  }
  // 添加新的食物
  addFood()
}

// 移动动画
function addMove() {
  self.time.removeAllEvents()
  self.time.addEvent({
    delay: speed.value,
    loop: true,
    callback: move
  })
}

// 移动
function move() {
  let x = head.x
  let y = head.y
  // 如果碰到边界则游戏结束，否则向对应方向移动
  if (direction === Direction.TOP) {
    if (y < IMG_HEIGHT) return gameOver()
    y -= IMG_HEIGHT
  } else if (direction === Direction.RIGHT) {
    if (x > WIDTH - IMG_WIDTH) return gameOver()
    x += IMG_WIDTH
  } else if (direction === Direction.LEFT) {
    if (x < IMG_WIDTH) return gameOver()
    x -= IMG_WIDTH
  } else if (direction === Direction.BOTTOM) {
    if (y > HEIGHT - IMG_HEIGHT * 2) return gameOver()
    y += IMG_HEIGHT
  }

  // 存储贪吃蛇位置，保留上一个
  if (snakePos.length > snake.length) {
    snakePos.shift()
  }
  snakePos.push([x, y])
  const filterPos = [...new Set(snakePos.map((i) => i.toString()))]

  if (filterPos.length !== snakePos.length) {
    alert('碰到自己了' + direction)
    console.log('重复了', snakePos.length, filterPos.length)
    return gameOver()
  }
  // 更新贪吃蛇位置
  setSnakePos()
}

// 添加键盘事件
function addKeyboardEvents() {
  // 添加键盘事件（上下左右）
  ;(self.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin).on(
    'keydown',
    keyboardEventsHandler
  )
}

// 键盘事件处理
function keyboardEventsHandler(event: KeyboardEvent) {
  let exchange = false
  if (event.code === 'ArrowUp') {
    if (direction === Direction.BOTTOM) {
      exchange = true
    }
    direction = Direction.TOP
  } else if (event.code === 'ArrowRight') {
    if (direction === Direction.LEFT) {
      exchange = true
    }
    direction = Direction.RIGHT
  } else if (event.code === 'ArrowDown') {
    if (direction === Direction.TOP) {
      exchange = true
    }
    direction = Direction.BOTTOM
  } else if (event.code === 'ArrowLeft') {
    if (direction === Direction.RIGHT) {
      exchange = true
    }
    direction = Direction.LEFT
  } else {
    return
  }
  if (exchange) {
    exchangeTailHead()
    exchange = false
  }
  addMove()
  move()
}

function setSnakePos() {
  snake.forEach((s, i) => {
    const pos = snakePos[i + 1]
    s.setPosition(...pos)
  })
}

// 换方向
function exchangeTailHead() {
  if (snakePos.length > snake.length) {
    snakePos.shift()
  }
  snakePos.reverse()
  snake.forEach((s, i) => {
    const pos = snakePos[i]
    s.setPosition(...pos)
  })
}

// 游戏结束
function gameOver() {
  self.time.removeAllEvents()
  ;(self.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin).off('keydown')
  game.value?.events.emit(GameEvents.GAMEOVER)
  alert('游戏结束')
}

onUnmounted(() => {
  self.input.keyboard?.off('keydown', keyboardEventsHandler)
  snakeGroup.destroy(true, true)
  selfOverlap.destroy()
})
</script>
