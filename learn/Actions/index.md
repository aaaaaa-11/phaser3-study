# Actions

- [Align To](#align-to)
- [Angle](#angle)
- [Get First](#get-first)
- [Grid Align](#grid-align)
- [IncXY](#incxy)
- [PlaceOnXXX](#placeonxxx)
- [RandomXXX](#randomxxx)
- [RotateXXX](#rotatexxx)
- [SetXXX](#setxxx)
- [ShiftPosition](#shiftposition)
- [Spread](#spread)
- [WrapInRectangle](#wrapinrectangle)

## Align To

1. 对齐

```js
// GameObjects按照AliginTo对齐方式排列
Phaser.Actions.AlignTo(GameObjects, AliginTo);
// 例如，sprites中的元素，从左往右排列，相对右下对齐（应该是从左到右每一张图片的右下角对齐排列）
Phaser.Actions.AlignTo(sprites, Phaser.Display.Align.RIGHT_BOTTOM);

// 大小相同的图片，XXX_YYY和XXX_ZZZ排列效果是一样的
// Phaser.Actions.AlignTo(sprites, Phaser.Display.Align.RIGHT_BOTTOM) // 右下
// Phaser.Actions.AlignTo(sprites, Phaser.Display.Align.RIGHT_TOP) // 右上
```

[code](../phaser3-examples/src/views/actions/align-to-base.vue)

注：当需要对齐的这些图片大小不一样，右下与右上（或左下与左上、上左与上中等）才有不同效果，
如果 A 和 B 的高度一致，则 右上、右下、右中（或左上、左下、左中）效果都是一样的，
如果 A 和 B 的宽度一致，则 上左、上中、上右（或下...）都是一样的

2. 偏移

[code](../phaser3-examples/src/views/actions/align-to-offset.vue)

```js
// items沿着position对齐，x轴偏移量offsetX，y轴偏移量offsetY
function globalThis.Phaser.Actions.AlignTo<Phaser.GameObjects.Image[]>(items: Phaser.GameObjects.Image[], position: number, offsetX?: number | undefined, offsetY?: number | undefined): Phaser.GameObjects.Image[]
// 例如，sprites先按照右下对齐，每张相对前一张向左偏移10，向上偏移15
Phaser.Actions.AlignTo(
    sprites,
    Phaser.Display.Align.RIGHT_BOTTOM,
    -10,
    -15
  )
```

## Angle

```js
/**
 * @param {array|Array.<Phaser.GameObjects.GameObject>} items 作用对象，需要包含角度属性
 * @param {number} value 角度值
 * @param {number} step items[i].angle = items[i].angle + value + step * i，step默认0
 * @param {number} index 从索引为index的元素开始，默认0
 * @param {number} direction 遍历方向，1从头往后遍历，-1从后向前遍历
 */
Angle(items, value, step);
```

[code](../phaser3-examples/src/views/actions/angle.vue)

## Get First

```js
/**
 * 获取满足compare条件的第一个元素
 * @param {array | Array.<Phaser.GameObjects.GameObject>} items 从items里找满足条件的元素
 * @param {object} compare 对items中每一个元素比较，判断compare中每一个属性是否都满足
 * @param {number} index 从items中索引为index的元素开始
 */
GetFirst(items, compare, [index]);
```

[code](../phaser3-examples/src/views/actions/get-first.vue)

## Grid Align

```js
/**
 * 根据给定options网格排列游戏对象或任意含有共有属性x、y的对象
 * @param {array | Array.<Phaser.GameObjects.GameObject>} items
 * @param {Phaser.Types.Actions.GridAlignConfig} options 可选 网格排列选项 参考：https://newdocs.phaser.io/docs/3.80.0/Phaser.Types.Actions.GridAlignConfig
 * options：以下均为number类型
 * width 默认-1，标识items的宽（非px），-1表示所有item按水平排列，如果height也设置-1，则height会被覆盖而不生效
 * height 默认-1，和width类似，纵向排列
 * cellWidth、cellHeight 默认1，单元格宽高（px），item位于单元格之中
 * position 默认0，取值参考Phaser.Display.Align，例如TOP_LEFT
 * x、y 默认0，将最终网格的左上角放到此位置
 */
GridAlign(items, options);
```

当 cellWidth 小于 items 中元素的宽度，会看到元素一个叠着一个：

[code](../phaser3-examples/src/views/actions/grid-align-overlap.vue)

给元素加动画：

[code](../phaser3-examples/src/views/actions/grid-align-animation.vue)

可以使用组：group.getChildren()作为 items

[code](../phaser3-examples/src/views/actions/grid-align-animation.vue)

## IncXY

```js
/**
 * 将给定的值添加到每个item（游戏对象或任意有x、y属性的对象）上
 * @param {array | Array.<Phaser.GameObjects.GameObject>} items
 * @param {number} x 加到item.x上
 * @param {number} y 加到item.y上
 * @param {number} stepX item.x = item.x + x + stepX * i
 * @param {number} stepY item.y操作同上
 * @param {number} index items中开始的索引
 * @param {number} direction items遍历方向，1从头到尾，-1从尾到头
 */
IncXY(items, x, [y], [stepX], [stepY], [index], [direction]);
```

类似的属性

- IncY
- IncX

参数：(items, value, [step], [index], [direction])
value、step 对应 x（y）、stepX（stepY）

x、y、stepX、stepY 都会加到元素当前位置上，例如

s1: 初始(x, y) = (0, 0)

s2: 设置 IncXY(2, 3) item 的(x, y) = (2, 3)

s3: 设置 IncXY(-2, 1) item 的(x, y) = (2 - 2, 3 + 1) = (0, 4)

[code](../phaser3-examples/src/views/actions/incXY.vue)

## PlaceOnXXX

将元素放置到指定图形的轮廓线上

[code](../phaser3-examples/src/views/actions/place-on-circle.vue)

1. PlaceOnCircle

将元素均匀的放到圆圈边缘的点上

```js
/**
 * @param {array | Array.<Phaser.GameObjects.GameObject>} items
 * @param {Phaser.Geom.Circle} circle 如果是Phaser.GameObjects.Circle，传入其geom属性
 * @param {number} startAngle 默认0 弧度值，开始位置
 * @param {number} endAngle 默认6.28
 * 即：将items均匀地放在startAngle~endAngle之间的弧线（可能是一圈、几圈、半圈...圆）上
 */
PlaceOnCircle(items, circle, [startAngle], [endAngle]);
```

2. PlaceOnEllipse

将元素均匀的放到椭圆边缘的点上

```js
/**
 * @param {Phaser.Geom.Ellipse} ellipse 椭圆，如果是 Phaser.GameObjects.Ellipse，需要传geom属性
 */
PlaceOnEllipse(items, ellipse, [startAngle], [endAngle]);
```

3. PlaceOnLine

将元素均匀的放到线上

```js
/**
 * @param {Phaser.Geom.Line} line
 */
PlaceOnLine(items, line);
```

4. PlaceOnRectangle

将元素均匀的放到矩形上，从左上角开始，顺时针，可以根据 shift 设置偏移

```js
/**
 * @param {Phaser.Geom.Rectangle} rect
 * @param {number} shift 位置偏移
 */
PlaceOnRectangle(items, rect, [shift]);
```

5. PlaceOnRectangle

将元素均匀的放到矩形上，从左上角开始，顺时针，可以根据 shift 设置偏移

```js
/**
 * @param {Phaser.Geom.Triangle} rect
 * @param {number} stepRate 位置偏移
 */
PlaceOnTriangle(items, triangle, [stepRate]);
```

## RandomXXX

和[PlaceOnXXX](#placeonxxx)类似，将元素随机填充到指定图形内，注意 RamdomXXX(items, geo)没有多余的参数

[code](../phaser3-examples/src/views/actions/place-on-circle.vue)

1. RandomCircle(items, circle)
2. RandomEllipse(items, ellipse)
3. RandomLine(items, line)
4. RandomRectangle(items, rect)
5. RandomTriangle(items, triangle)

## RotateXXX

[code]()

1. Rotate
   旋转

```js
/**
 * @param	{array | Array.<Phaser.GameObjects.GameObject>} items
 * @param {number} value 添加到旋转属性rotation上的值
 * @param {number} step items[i].rotation += value + step * i
 * @param {number} index 开始索引
 * @param {number} direction 1，从头遍历，-1从尾遍历
 */
Rotate(items, value, [step], [index], [direction]);
```

2. RotateAround

将每个元素按照指定点旋转指定角度

```js
/**
 * @param	{array | Array.<Phaser.GameObjects.GameObject>} items
 * @param {object} point 含有公有属性x、y的对象
 * @param {number} angle 旋转角度，弧度值
 */
RotateAround(items, point, angle);
```

3. RotateAroundDistance

将每个元素按照指定点旋转指定角度和距离

```js
/**
 * @param	{array | Array.<Phaser.GameObjects.GameObject>} items
 * @param {object} point 含有公有属性x、y的对象
 * @param {number} angle 旋转角度，弧度值
 * @param {number} distance 旋转点距离，px
 */
RotateAroundDistance(items, point, angle, distance);
```

一个 demo：[让 container 面朝 center 旋转](../phaser3-examples/src/views/actions/rotate-container-facing-point.vue)

解析：

![让 container 面朝 center 旋转](./containerFacePoint.png)

## SetXXX

[code](../phaser3-examples/src/views/actions/)

1. SetAlpha

设置透明度

```js
/**
 * @param {array | Array.<Phaser.GameObjects.GameObject>} items
 * @param {number} value alpha值
 * @param {number} step items[i].alpha += value + step * i
 * @param {number} index 从索引为index的元素开始操作
 * @param {number} direction 遍历方向，1从头开始，-1从尾开始
 */
SetAlpha(items, value, [step], [index], [direction]);
```

2. SetBlendMode

设置混合模式，两个粒子重叠构造出一种新的颜色

具体含义和可选模式参考：https://newdocs.phaser.io/docs/3.80.0/Phaser.BlendModes

3. SetDepth
4. SetX
5. SetY
6. SetXY
7. SetScrollFactorX
8. SetScrollFactorY
9. SetScrollFactor

参考：https://newdocs.phaser.io/docs/3.80.0/Phaser.GameObjects.Components.ScrollFactor

设置滚动因子，控制相机移动对游戏对象的影响。

默认 1，和相机同步移动；为 0 时相机移动，items 不会移动

计算物理碰撞时，不会考虑 1 以外的滚动因子

10. SetRotation
11. SetScaleX
12. SetScaleY
13. SetScaleXY

缩放相对元素原始大小，value 为倍数

14. SetTint

分别设置 4 个方向的色调或只设置 topLeft 来应用于所有元素

hex 数值型，例如 0xff0000 表示红色，默认 0xffffff 15. SetVisible

设置可见性：true / false

16. SetOrigin

值表示 item.size \* value

## ShiftPosition

```js
/**
 * 可参考贪吃蛇
 * items依次沿着前一个item的位置移动，x,y为“头部”坐标，头部根据direction设置为第一个(1)或最后一个(0，默认)
 * @param {Array.<Phaser.GameObjects.GameObject> | Array.<Phaser.Types.Math.Vector2Like>} items
 * @param {number} x
 * @param {number} y
 * @param {number} direction
 * @param {Phaser.Types.Math.Vector2Like} output 最后一个元素的x、y，不设置就根据头部依次排到最后
 */
ShiftPosition(items, x, y, [direction], [output]);
```

[code](../phaser3-examples/src/views/actions/shift-position.vue)

[贪吃蛇](../phaser3-examples/src/views/actions/snake.vue)

## Spread

```js
/**
 * 让items的property在min~max之间均匀分布
 * @param { array | Array.<Phaser.GameObjects.GameObject> } items
 * @param {string} property item属性
 * @param {number} min
 * @param {number} max
 * @param {boolean} inc property属性值是否递增，true每次在上一次的基础上增加，false每次items属性都是从min~max
 */
Spread(items, property, min, max, [inc]);

// 例如，假设items为5个GameObject，初始x均为100
Spread(items, "x", 0, 100, true); // x依次为：100, 125, 150, 175, 200
Spread(items, "x", 0, 100, true); // 100, 150, 200, 250, 300
Spread(items, "x", 0, 100, true); // 100, 175, 250, 325, 400
Spread(items, "x", 0, 100, false); // 100, 125, 150, 175, 200
```

## WrapInRectangle

```js
/**
 * 保证items的x和y在给定的矩形区域中
 * @param { array | Array.<Phaser.GameObjects.GameObject> } items
 * @param {Phaser.Geom.Rectangle} rect 矩形区域
 * @param {number} padding 矩形区域每一侧增加的区域
 */
WrapInRectangle(items, rect, [padding]);
```
