<template>
  头部x: {{ formState.x }} 头部y: {{ formState.y }}
  <br />
  MAX_WIDTH: {{ WIDTH?.toFixed(0) }}, MAX_HEIGHT: {{ HEIGHT?.toFixed(0) }}
</template>

<script setup lang="ts">
import { reactive, nextTick } from 'vue'
import useGame, { CustomScene } from '@/hooks/game'

// 图片地址
const IMGPATHS = ['/snake/head.png', '/snake/body.png']

const formState = reactive({
  x: 0,
  y: 0,
  direction: 0
})

enum Direction {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT
}

// 图片大小
const IMG_WIDTH = 30
const IMG_HEIGHT = 30

let snake: Phaser.GameObjects.Group // 贪吃蛇组
let head: Phaser.GameObjects.Image // 头
let tail: Phaser.GameObjects.Image // 尾
let self: CustomScene
let snakFoodOverlap: Phaser.Physics.Arcade.Collider // 碰撞函数
let snakSelfOverlap: Phaser.Physics.Arcade.Collider // 碰撞函数
let direction = Phaser.Math.Between(Direction.TOP, Direction.LEFT) // 运行方向
let foodImg: Phaser.GameObjects.Image
let speed: number = 400

// 上一个尾部
const lastTail = [formState.x, formState.y + IMG_HEIGHT]
const tailHeadPos: { tail: number[][]; head: number[][]; lastTail: number[] } =
  {
    tail: [lastTail],
    head: [],
    lastTail: []
  }

const { images, WIDTH, HEIGHT } = useGame({
  addRect: true,
  imgPaths: IMGPATHS,
  physicType: 'arcade',
  createFun: function () {
    self = this as CustomScene

    self.physics.world.setBounds(0, 0, WIDTH, HEIGHT) // 启用物理系统

    // 记录头尾
    head = images[0]
    tail = images[1]
    // head.setDepth(2)
    const headPos = [head.x, head.y]
    tailHeadPos.tail.push([tail.x, tail.y])
    tailHeadPos.head.push(headPos)
    tailHeadPos.lastTail = formState.direction ? headPos : lastTail

    // 贪吃蛇
    const snakeArr = formState.direction ? [head, tail] : [tail, head]
    snakeArr.forEach((img, i) => {
      img.setPosition((i + 1) * IMG_WIDTH, formState.y + IMG_HEIGHT)
    })
    snake = self.physics.add.group(snakeArr)
    formState.x = head.x
    formState.y = head.y

    // 添加食物
    addFood()

    // 添加移动动画
    addMove()

    // 添加键盘事件
    addKeyboardEvents()
  }
})

// 添加食物
function addFood() {
  console.log('添加食物')
  const wScale = WIDTH / IMG_WIDTH
  const hScale = HEIGHT / IMG_HEIGHT
  foodImg = self.physics.add
    .image(0, 0, tail.texture.key)
    .setOrigin(0, 0) as Phaser.GameObjects.Image
  foodImg.setPosition(
    IMG_WIDTH * Phaser.Math.Between(0, wScale - 1),
    IMG_HEIGHT * Phaser.Math.Between(0, hScale - 1)
  )
  self.physics.world.enable(foodImg)
  self.physics.add.existing(foodImg)
  ;(foodImg.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true)

  // 添加贪吃蛇-食物碰撞
  snakFoodOverlap = self.physics.add.overlap(
    head,
    foodImg,
    eatFood,
    undefined,
    self
  )

  // 碰到自己会死
  snakSelfOverlap = self.physics.add.overlap(
    snake,
    snake,
    checkSelfOverlap,
    undefined,
    self
  )
}

// 碰到食物
function eatFood(obj1: any, obj2: any) {
  self.physics.world.removeCollider(snakSelfOverlap)
  const food = obj2 as Phaser.GameObjects.Image
  snake.add(food)
  if (!formState.direction) {
    // 添加的食物是最后一个，也会成为头，所以需要更换头
    // 清除深度、把原来的整个往后挪一格、移除碰撞
    // head.setDepth(0)
    const snakeChildren = snake.getChildren() as Phaser.GameObjects.Image[]
    for (let i = snakeChildren.length - 1; i >= 0; i--) {
      const lastChild = snakeChildren[i - 1]
      if (lastChild) {
        snakeChildren[i].setPosition(lastChild.x, lastChild.y)
      } else {
        snakeChildren[i].setPosition(...tailHeadPos.lastTail)
      }
    }
    self.physics.world.removeCollider(snakFoodOverlap)
    food.setFrame(self.textures.getFrame(head.texture.key))
    head.setFrame(self.textures.getFrame(tail.texture.key))
    // 将食物变成头
    head = food
    // head.setDepth(2)
  } else {
    // 添加的食物正好是最后一个，但是需要更新一下位置
    food.setPosition(...tailHeadPos.lastTail)
  }
  console.log('eatFood 换头')

  if (speed >= 100) {
    speed *= 0.95
  }
  // 添加新的食物
  console.log('准备新的食物')
  addFood()
}

// 移动动画
function addMove() {
  self.time.removeAllEvents()
  self.time.addEvent({
    delay: speed,
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

  formState.x = x
  formState.y = y
  tailHeadPos.head[0] = [x, y]

  Phaser.Actions.ShiftPosition(snake.getChildren(), x, y, formState.direction)
  // 更新尾部位置
  const tailPos = tailHeadPos.tail
  tailPos[0] = tailPos[1]
  tailPos[1] = [tail.x, tail.y]
  tailHeadPos.lastTail = tailPos[1]
}

// 添加键盘事件
function addKeyboardEvents() {
  // 添加键盘事件（上下左右）
  ;(self.input.keyboard as Phaser.Input.Keyboard.KeyboardPlugin).on(
    'keydown',
    function (event: KeyboardEvent) {
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
  )
}

// 交换尾部和头部
function exchangeTailHead() {
  // 获取头尾帧
  const tailFrame = self.textures.getFrame(tail.texture.key)
  const headFrame = self.textures.getFrame(head.texture.key)
  head.setFrame(tailFrame)
  // 移除原来的碰撞
  self.physics.world.removeCollider(snakFoodOverlap)

  // 修改遍历方向
  formState.direction = +!formState.direction
  // 确定新的尾部和头部
  const children = snake.getChildren() as Phaser.GameObjects.Image[]
  const first = children[0]
  const last = children[children.length - 1]
  const snakeArr = formState.direction ? [last, first] : [first, last]
  tail = snakeArr[0]
  head = snakeArr[1]
  head.setFrame(headFrame)

  snakFoodOverlap = self.physics.add.overlap(
    head,
    foodImg,
    eatFood,
    undefined,
    self
  )
}

function checkSelfOverlap(obj1: any, obj2: any) {
  console.log('overlap', obj1.x, obj1.y, obj2.x, obj2.y)
  if (
    (obj1.x === obj2.x && Math.abs(obj1.y - obj2.y) <= IMG_HEIGHT) ||
    (Math.abs(obj1.x - obj2.x) === IMG_WIDTH && obj1.y <= obj2.y)
  ) {
    console.log('正常移动')
  } else {
    gameOver()
  }
}

// 游戏结束
function gameOver() {
  alert('游戏结束')
  self.time.removeAllEvents()
}
</script>
