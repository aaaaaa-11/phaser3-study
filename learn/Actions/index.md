# Actions

- [Align To](#align-to)
- [Angle](#angle)
- [Get First](#get-first)
- [Grid Align Animations](#grid-align-animations)

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
 * @param {number} step 第i个对象的角度=value + step * i，默认0
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

## Grid Align Animations
