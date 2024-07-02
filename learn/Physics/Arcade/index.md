# Arcade

- [World](#world)
  - [setBounds](#setbounds)
  - [setBoundsCollision](#setboundscollision)

```js
new Phaser.Game({
  ...
  physics: {
    default: 'arcade' // 设置Arcade物理引擎
  }
})
```

## World

Arcade Physics World 物理世界，可以用来管理、创建、碰撞、更新内部所有的 body，实例挂在 Physics.scene 下，可以通过 physics.world 属性访问

```js
class GameScene extends Phaser.Scene {
  constructor() {}

  create() {
    this.physics.world; // 访问物理世界
  }
}
```

### setBounds

```js
/**
 * 设置物理世界的边界：位置、尺寸、属性等
 * 世界边界是一个不可见的矩形，Body设置了碰撞，则碰到边界的任意一边都会停下，也可以设置检测哪一边。
 * @param {number} x 边界左上顶点的x
 * @param {number} y 边界左上顶点的y
 * @param {number} width 边界宽
 * @param {number} height 边界高
 * @param {boolean} checkLeft checkRight checkUp checkDown 均可选，分别为是否检测对应边的边缘
 */
setBounds(
  x,
  y,
  width,
  height,
  [checkLeft],
  [checkRight],
  [checkUp],
  [checkDown]
);
```

[代码](../../phaser3-examples/src/views/physics/arcade/bounds.vue)

### setBoundsCollision

```js
/**
 * 设置物理世界的边界碰撞，默认每一边都会检测
 * @param {boolean} left right up down 均可选，分别为是否检测对应边的边缘
 */
setBoundsCollision([left], [right], [up], [down]);
```

[代码](../../phaser3-examples/src/views/physics/arcade/bounds.vue)
