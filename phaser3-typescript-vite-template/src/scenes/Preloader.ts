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

    this.load.image(TextureKeys.Coin, 'house/object_coin.png')

    // 加载精灵图
    this.load.atlas(
      TextureKeys.RocketMouse,
      'characters/rocket-mouse.png',
      'characters/rocket-mouse.json'
    )
  }

  create () {
    // preload()中资源加载完，会自动执行create()，所以此时可以加载游戏场景了
    this.scene.start(SceneKeys.Game)
  }
}