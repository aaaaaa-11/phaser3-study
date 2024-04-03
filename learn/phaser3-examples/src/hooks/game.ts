import Phaser from 'phaser'
import { onMounted, onUnmounted, ref } from 'vue'

const ORIGIN = location.origin // 项目域名

// canvas大小
const WIDTH = innerWidth * 0.8
const HEIGHT = innerHeight * 0.8
let game: Phaser.Game

type Image = Phaser.GameObjects.Image
type Sprite = Phaser.GameObjects.Sprite

interface SpriteConfig {
  path: string
  config: Phaser.Types.Loader.FileTypes.ImageFrameConfig
}

interface Options {
  imgPaths?: string[]
  spritePaths?: SpriteConfig[]
  addRect?: boolean
  createFun?: () => void
}

enum GameState {
  LOADING = 'loading',
  CREATE = 'create'
}

export class CustomScene extends Phaser.Scene {
  imgKeys: string[] = []
}

export default function useGame(options: Options) {
  const { imgPaths, spritePaths, createFun, addRect } = options

  let images: Image[] = []
  let sprites: Sprite[] = []

  const gameState = ref<string>(GameState.LOADING)

  // 场景
  class Scene extends Phaser.Scene {
    imgKeys: string[] = []
    imgKeysMap: Record<string, Image | Sprite> = {}
    constructor() {
      super()
    }

    preload() {
      // 加载图片
      imgPaths?.forEach((path, i) => {
        const key = 'img' + i
        this.load.image(key, ORIGIN + path)
      })
      // 加载图片
      spritePaths?.forEach(({ path, config }, i) => {
        const key = 'sprite' + i
        this.load.spritesheet(key, ORIGIN + path, config)
      })
    }

    create() {
      addRect &&
        // 设置一个参考矩形
        this.add
          .rectangle(0, HEIGHT * 0.5 - 50, WIDTH, 100, 0x9d2d9d)
          .setOrigin(0, 0)
      // 添加图片
      const imgLen = imgPaths?.length || 0
      const spriteLen = spritePaths?.length || 0
      const len = Math.max(imgLen, spriteLen)
      if (len) {
        for (let i = 0; i < len; i++) {
          if (imgLen) {
            const key = `img${i}`
            this.imgKeys.push(key)
            const img = this.add
              .image(WIDTH * 0.5, HEIGHT * 0.5, key)
              .setOrigin(0, 0)
            this.imgKeysMap[key] = img
            images.push(img)
          }
          if (spriteLen) {
            const key = `sprite${i}`
            this.imgKeys.push(key)
            const sprite = this.add
              .sprite(WIDTH * 0.5, HEIGHT * 0.5, key)
              .setOrigin(0, 0)
            this.imgKeysMap[key] = sprite
            sprites.push(sprite)
          }
        }
      }
      gameState.value = GameState.CREATE
      createFun?.apply(this)
    }

    destroyed() {
      Object.keys(this.imgKeysMap).map((key) => {
        this.imgKeysMap[key].destroy()
      })
      this.imgKeysMap = {}
    }
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
      scene: Scene
    }
    game = new Phaser.Game(config)
  })

  onUnmounted(() => {
    // 销毁游戏
    game.destroy(true)
    images = []
    sprites = []
  })
  // 存储图片
  return {
    WIDTH,
    HEIGHT,
    origin,
    images,
    sprites,
    gameState,
    GameState
  }
}
