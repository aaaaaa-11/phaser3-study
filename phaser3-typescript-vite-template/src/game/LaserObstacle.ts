import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";

export default class LaserObstacle extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y)
    
    const top = scene.add.sprite(0, 0, TextureKeys.LaserEnd).setOrigin(0.5, 0)
    const middle = scene.add.sprite(0, top.y + top.displayHeight, TextureKeys.LaserMiddle).setOrigin(0.5, 0)
    middle.setDisplaySize(middle.width, 200)
    const bottom = scene.add.sprite(0, middle.y + middle.displayHeight, TextureKeys.LaserEnd).setOrigin(0.5, 0).setFlipY(true)

    this.add(top)
    this.add(middle)
    this.add(bottom)

    scene.physics.add.existing(this, true) // 添加静态物体
    // 静态物体可以和普通的物体撞击，但是不受重力影响，不会掉落也不会被推动

    const body = this.body as Phaser.Physics.Arcade.StaticBody
    const width = top.displayWidth
    const height = top.displayHeight + middle.displayHeight + bottom.displayHeight

    body.setSize(width, height)
    body.setOffset(-width * 0.5, 0) // 之前设置setOrigin()的x为0.5，这里再反方向偏移回来

    body.position.x = this.x + body.offset.x
    body.position.y = this.y
  }

}