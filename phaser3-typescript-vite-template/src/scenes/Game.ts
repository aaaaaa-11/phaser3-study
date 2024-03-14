/**
 * 游戏场景
 */
import AnimationKeys from "../consts/AnimationKeys";
import SceneKeys from "../consts/SceneKeys";
import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import RocketMouse from "../game/RocketMouse";
import LaserObstacle from "../game/LaserObstacle";

// 创建一个继承了Phaser.Game的类Game
export default class Game extends Phaser.Scene {
  // !非空断言，如果不用!，也可以每次使用时断言成下面的类型或者?.访问其属性
  private background!: Phaser.GameObjects.TileSprite

  private mousehole!: Phaser.GameObjects.Image
  private window1!: Phaser.GameObjects.Image
  private window2!: Phaser.GameObjects.Image
  private bookcase1!: Phaser.GameObjects.Image
  private bookcase2!: Phaser.GameObjects.Image
  private bookcases: Phaser.GameObjects.Image[] = []
  private windows: Phaser.GameObjects.Image[] = []
  private laserObstacle!: LaserObstacle

  constructor() {
    // 传入一个唯一标识，用来区别其他场景
    super(SceneKeys.Game)
  }

  // 创建老鼠洞
  private wrapMouseHole() {
    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    // 一旦老鼠洞滚出视野之外，需要在右边界后面100~1000之间再创建一个
    if (this.mousehole.x + this.mousehole.width < scrollX) {
      this.mousehole.x = Phaser.Math.Between(
        rightEdge + 100,
        rightEdge + 1000
      )
    }
    
  }
  // 创建窗户
  private wrapWindows() {
    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    // 第一个窗户滚出视野之外，再创建一个
    let width = this.window1.width * 2
    if (this.window1.x + width < scrollX) {
      this.window1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + 800
      )

      const overlap = this.bookcases.find(bc => {
        return Math.abs(this.window1.x - bc.x) <= this.window1.width
      })

      this.window1.visible = !overlap
    }
    // 第二个窗户滚出视野之外，在第一个窗户后面再创建一个
    width = this.window2.width
    if (this.window2.x + width < scrollX) {
      this.window2.x = Phaser.Math.Between(
        this.window1.x + width,
        this.window1.x + 800
      )
      const overlap = this.bookcases.find(bc => {
        return Math.abs(this.window2.x - bc.x) <= this.window2.width
      })

      this.window2.visible = !overlap
    }
  }
  // 创建书架
  private wrapBookcases() {
    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    let width = this.bookcase1.width * 2
    if (this.bookcase1.x + width < scrollX) {
      this.bookcase1.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + 800
      )
      const overlap = this.windows.find(w => {
        return Math.abs(this.bookcase1.x - w.x) <= w.width
      })

      this.bookcase1.visible = !overlap
    }
    width = this.bookcase2.width
    if (this.bookcase2.x + width < scrollX) {
      this.bookcase2.x = Phaser.Math.Between(
        this.bookcase1.x + width,
        this.bookcase1.x + 800
      )
      const overlap = this.windows.find(w => {
        return Math.abs(this.bookcase2.x - w.x) <= w.width
      })

      this.bookcase2.visible = !overlap
    }
  }
  // 创建激光障碍
  private wrapLaserObstacle() {
    const scrollX = this.cameras.main.scrollX
    const rightEdge = scrollX + this.scale.width

    const body = this.laserObstacle.body as Phaser.Physics.Arcade.StaticBody

    let width = body.width
    if (this.laserObstacle.x + width < scrollX) {
      this.laserObstacle.x = Phaser.Math.Between(
        rightEdge + width,
        rightEdge + 1000
      )
      
      this.laserObstacle.y = Phaser.Math.Between(0, 300)
      body.position.x = this.laserObstacle.x + body.offset.x
      body.position.y = this.laserObstacle.y
    }
  }

  private handleOverlapLaser(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
    console.log('overlap');
    
  }

  // 这些资源放到Preloader场景里加载了
  // preload () {
  //   // 加载背景图，并指定键名为background
  //   this.load.image('background', 'house/bg_repeat_340x640.png')

  //   // 加载精灵图
  //   this.load.atlas(
  //     'rocket-mouse',
  //     'characters/rocket-mouse.png',
  //     'characters/rocket-mouse.json'
  //   )
  // }

  create () {
    // this.anims.create({
    //   key: 'rocket-mouse-run', // 动画名称
    //   frames: this.anims.generateFrameNames('rocket-mouse', {
    //     start: 1,
    //     end: 4,
    //     prefix: 'rocketmouse_run',
    //     zeroPad: 2,
    //     suffix: '.png'
    //   }),
    //   frameRate: 10,
    //   repeat: -1 // -1代表无限循环
    // })

    // 添加图片（键名为background），放在(0, 0)处
    // 默认游戏对象（如图片、精灵图等）的原点为中心点(0.5, 0.5)，这里设置图片的原点为左上角
    // this.add.image(0, 0, 'background').setOrigin(0, 0)

    // 使用tileSprite添加图片平铺背景
    const width = this.scale.width
    const height = this.scale.height

    this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background)
    .setOrigin(0)
    .setScrollFactor(0, 0) // 设置背景不跟随相机滚动

    // 老鼠洞应该在上面的背景之后生成，且在下面的老鼠之前生成
    this.mousehole = this.add.image(
      Phaser.Math.Between(900, 1500), // 随机的x位置生成一个老鼠洞
      501,
      TextureKeys.MouseHole
    )
    // 窗户
    this.window1 = this.add.image(
      Phaser.Math.Between(900, 1300), // 随机的x位置生成一个窗户
      200,
      TextureKeys.Window1
    )
    this.window2 = this.add.image(
      Phaser.Math.Between(1600, 2000), // 随机的x位置（第一个窗户之后）生成一个窗户
      200,
      TextureKeys.Window2
    )
    this.windows = [this.window1, this.window2]
    // 书架
    this.bookcase1 = this.add.image(
      Phaser.Math.Between(2200, 2700),
      580,
      TextureKeys.Bookcase1
    ).setOrigin(0.5, 1)
    this.bookcase2 = this.add.image(
      Phaser.Math.Between(2900, 3400),
      580,
      TextureKeys.Bookcase2
    ).setOrigin(0.5, 1)
    this.bookcases = [this.bookcase1, this.bookcase2]

    this.laserObstacle = new LaserObstacle(this, 900, 100)
    this.add.existing(this.laserObstacle)

    // 这个精灵图直接用RocketMouse类创建，方便为其添加子元素
    // 创建精灵图（加载的rocket-mouse中的飞行图1）
    // this.add.sprite(
    // const mouse = this.physics.add.sprite(
    //   width * 0.5,
    //   height - 30, // 物理世界的边界是地板
    //   'rocket-mouse',
    //   'rocketmouse_fly01.png'
    // )
    // .setOrigin(0.5, 1) // 设置原点在底部正中央
    // .play(AnimationKeys.RocketMouseRun)
    const mouse = new RocketMouse(this, width * 0.5, height - 30)
    this.add.existing(mouse) // 将mouse实例添加到游戏场景中

    this.physics.world.setBounds(
      0, 0, // x, y
      Number.MAX_SAFE_INTEGER, height - 30 // width, height
      // 这里角色会一直运动，但计算机内存有限，所以设置一个最大边界
      // 高度是游戏界面高度减去30，让角色在地板上运动
    )

    this.cameras.main.startFollow(mouse) // 让视角跟随mouse
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height) // 设置相机边界

    this.physics.add.overlap(
      this.laserObstacle,
      mouse,
      this.handleOverlapLaser,
      undefined,
      this
    )
  }

  update() {
    // 滚动背景
    this.background.setTilePosition(this.cameras.main.scrollX)
    
    this.wrapMouseHole()
    this.wrapWindows()
    this.wrapBookcases()
    this.wrapLaserObstacle()
  }
}