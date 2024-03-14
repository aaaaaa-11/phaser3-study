/**
 * 预加载场景
 */
import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader)
  }

  preload () {
    // 加载背景图，并指定键名为background
    this.load.image(TextureKeys.Background, 'house/bg_repeat_340x640.png')

    // 加载房间装饰
    this.load.image(
      TextureKeys.MouseHole,
      'house/object_mousehole.png',
    )

    this.load.image(TextureKeys.Window1, 'house/object_window1.png')
    this.load.image(TextureKeys.Window2, 'house/object_window2.png')

    this.load.image(TextureKeys.Bookcase1, 'house/object_bookcase1.png')
    this.load.image(TextureKeys.Bookcase2, 'house/object_bookcase2.png')

    this.load.image(TextureKeys.LaserEnd, 'house/object_laser_end.png')
    this.load.image(TextureKeys.LaserMiddle, 'house/object_laser.png')

    // 加载精灵图
    this.load.atlas(
      TextureKeys.RocketMouse,
      'characters/rocket-mouse.png',
      'characters/rocket-mouse.json'
    )
  }

  create () {
    // 创建动画
    // 跑
    this.anims.create({
      key: AnimationKeys.RocketMouseRun, // 动画名称
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 4,
        prefix: 'rocketmouse_run',
        zeroPad: 2,
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1 // -1代表无限循环
    })
    // 喷火
    this.anims.create({
      key: AnimationKeys.RocketFlamesOn,
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 2,
        prefix: 'flame',
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    })
    // 飞
    this.anims.create({
      key: AnimationKeys.RocketMouseFly,
      frames: [
        { key: TextureKeys.RocketMouse, frame: 'rocketmouse_fly01.png' },
      ]
    })
    // 落
    this.anims.create({
      key: AnimationKeys.RocketFlamesFall,
      frames: [
        { key: TextureKeys.RocketMouse, frame: 'rocketmouse_fall01.png' },
      ]
    })
    // 死
    this.anims.create({
      key: AnimationKeys.RocketMouseDead,
      frames: this.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 2,
        prefix: 'rocketmouse_dead0',
        suffix: '.png'
      }),
      frameRate: 10
    })

    // preload()中资源加载完，会自动执行create()，所以此时可以加载游戏场景了
    this.scene.start(SceneKeys.Game)
  }
}