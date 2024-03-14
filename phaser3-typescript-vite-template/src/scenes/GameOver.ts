import Phaser from "phaser";
import SceneKeys from "../consts/SceneKeys";

export default class GameOver extends Phaser.Scene {

  constructor() {
    super(SceneKeys.GameOver);
  }

  create() {
    const { width, height } = this.scale

    const x = width * 0.5
    const y = height * 0.5

    this.add.text(x, y, 'Press SPACE to Play Again', {
      fontSize: '32px',
      color: '#BE1616C9',
			backgroundColor: '#C2C6D0D1',
      shadow: { fill: true, blur: 0, offsetY: 0 },
      padding: { left: 15, right: 15, top: 10, bottom: 10 }
    }).setOrigin(0.5)

    // 监听空格键按下（一次）
    // this.input.keyboard.once('keydown-SPACE', () => {
    //   this.scene.stop(SceneKeys.GameOver)
    //   // 结束并重新开始游戏场景
    //   this.scene.stop(SceneKeys.Game)
    //   this.scene.start(SceneKeys.Game)
    // })
  }
}