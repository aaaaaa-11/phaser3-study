import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";

enum MouseState {
  Runing,
  killed,
  Dead
}

export default class RocketMouse extends Phaser.GameObjects.Container {
  private flames: Phaser.GameObjects.Sprite
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private mouse: Phaser.GameObjects.Sprite
  private mouseState = MouseState.Runing

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.mouse = scene.add.sprite(0, 0, TextureKeys.RocketMouse)
      .setOrigin(0.5, 1)
      .play(AnimationKeys.RocketMouseRun);
    this.flames = scene.add.sprite(-63, -15, TextureKeys.RocketMouse)
      .play(AnimationKeys.RocketFlamesOn);

    // 将mouse作为child添加到RocketMouse
    this.add(this.flames) // 先添加火焰，所以火焰会在老鼠下面
    this.add(this.mouse)

    scene.physics.add.existing(this)

    const body = this.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true) // 边界
    // 偏移
    body.setSize(this.mouse.width, this.mouse.height)
    body.setOffset(this.mouse.width * -0.5, -this.mouse.height)
    // x轴速度
    body.setVelocity(200)

    this.cursors = scene.input.keyboard.createCursorKeys() // CursorKeys实例，方便访问四个方向键和空格键
    this.kill()
  }

  // 开/关 喷气式火焰
  enableJetpack(enabled: boolean) {
    this.flames.setVisible(enabled)
  }

  kill() {
    if (this.mouseState !== MouseState.Runing) return

    this.mouseState = MouseState.killed
    this.mouse.play(AnimationKeys.RocketMouseDead)

    const body = this.body as Phaser.Physics.Arcade.Body
    body.setAccelerationY(0)
    body.setVelocity(1000, 0)
    this.enableJetpack(false)
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body
    switch(this.mouseState) {
      case MouseState.Runing: {
        if (this.cursors.space?.isDown) {
          body.setAccelerationY(-600)
          this.enableJetpack(true)
          this.mouse.play(AnimationKeys.RocketMouseFly, true)
        } else {
          body.setAccelerationY(0)
          this.enableJetpack(false)
        }
        // 根据老鼠的速度展示跑、落、飞动画
        // 在地上
        if (body.blocked.down) {
          this.mouse.play(AnimationKeys.RocketMouseRun, true)
        } else if (body.velocity.y > 0) { // 速度>0，在下落
          this.mouse.play(AnimationKeys.RocketFlamesFall, true)
        }
        break
      }
      case MouseState.killed: {
        body.velocity.x *= 0.9
        if (body.velocity.x <= 5) {
          this.mouseState = MouseState.Dead
        }
        break
      }
      case MouseState.Dead: {
        body.setVelocity(0, 0)
        break
      }
    }
  }
}