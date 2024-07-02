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
  addImg?: boolean
  physicType?: string
  createFun?: () => void
  updateFun?: () => void
}
