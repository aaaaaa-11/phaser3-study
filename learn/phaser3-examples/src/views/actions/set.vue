<template>
  <p>
    设置
    <select v-model="setType" class="text-gray-800" @change="setFun">
      <option
        v-for="item in Object.entries(setTextMap)"
        :key="item[0]"
        :value="item[0]"
      >
        {{ item[1] }}
      </option>
    </select>
  </p>
  <span
    class="mr-5 mt-2"
    v-for="item in Object.entries(setParamNamesMap[setType])"
    :key="item[0]"
  >
    {{ item[1] }}:
    <select
      v-model="setParamsForm.value"
      v-if="item[0] === 'value' && setType === SET_TYPE.SET_BLEND_MODE"
      class="text-gray-800"
      @change="setFun"
    >
      <option
        v-for="item in Object.entries(BlendModesMap)"
        :key="item[0]"
        :value="item[1]"
      >
        {{ item[0] }}
      </option>
    </select>
    <input
      v-else
      class="text-gray-800 w-16 ml-1"
      :type="
        [
          'hitArea',
          'topLeft',
          'topRight',
          'bottomLeft',
          'bottomRight'
        ].includes(item[0])
          ? 'text'
          : 'number'
      "
      v-model="setParamsForm[item[0] as keyof typeof setParamsForm]"
    />
  </span>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useGame from '@/hooks/game'
import { BlendModesMap, SET_TYPE } from '@/utils/enums'

// 图片地址
const IMGPATHS = [
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png',
  '/fruits/fruit_strawberry_100.png',
  '/fruits/fruit_watermelon_100.png'
]

const setType = ref<SET_TYPE>(SET_TYPE.SET_ALPHA)

const setParamsForm = reactive({
  value: 0.1,
  step: 1,
  index: 0,
  direction: 1,
  x: 0,
  y: 0,
  stepX: 0,
  stepY: 0,
  topLeft: 0,
  topRight: 0,
  bottomLeft: 0,
  bottomRight: 0,
  hitArea: null
})

const defaultMaps = {
  step: '步进',
  index: '开始索引',
  direction: '遍历方向'
}

const defaultXYMap = {
  stepX: 'X步进',
  stepY: 'Y步进',
  index: '开始索引',
  direction: '遍历方向'
}

const setTextMap = {
  [SET_TYPE.SET_ALPHA]: '透明度',
  [SET_TYPE.SET_BLEND_MODE]: '混合模式',
  [SET_TYPE.SET_DEPTH]: '深度',
  [SET_TYPE.SET_X]: 'x',
  [SET_TYPE.SET_Y]: 'y',
  [SET_TYPE.SET_SCROLL_FACTOR_X]: '翻滚因子x',
  [SET_TYPE.SET_SCROLL_FACTOR_Y]: '翻滚因子y',
  [SET_TYPE.SET_ROTATION]: '旋转',
  [SET_TYPE.SET_SCALE_X]: '缩放x',
  [SET_TYPE.SET_SCALE_Y]: '缩放y',
  [SET_TYPE.SET_XY]: '位置',
  [SET_TYPE.SET_TINT]: '色调',
  [SET_TYPE.SET_VISIBLE]: '可见',
  [SET_TYPE.SET_ORIGIN]: '原点',
  [SET_TYPE.SET_SCALE]: '缩放',
  [SET_TYPE.SET_SCROLL_FACTOR]: '翻滚因子',
  [SET_TYPE.SET_HIT_AREA]: '撞击区域'
}

const setParamNamesMap = {
  [SET_TYPE.SET_ALPHA]: {
    value: '透明度',
    ...defaultMaps
  },
  [SET_TYPE.SET_BLEND_MODE]: {
    value: '混合模式',
    ...defaultMaps
  },
  [SET_TYPE.SET_DEPTH]: {
    value: '深度',
    ...defaultMaps
  },
  [SET_TYPE.SET_X]: {
    value: 'x',
    ...defaultMaps
  },
  [SET_TYPE.SET_Y]: {
    value: 'y',
    ...defaultMaps
  },
  [SET_TYPE.SET_SCROLL_FACTOR_X]: {
    value: '翻滚因子x值',
    ...defaultMaps
  },
  [SET_TYPE.SET_SCROLL_FACTOR_Y]: {
    value: '翻滚因子y值',
    ...defaultMaps
  },
  [SET_TYPE.SET_SCALE_X]: {
    value: '缩放x',
    ...defaultMaps
  },
  [SET_TYPE.SET_SCALE_Y]: {
    value: '缩放y',
    ...defaultMaps
  },
  [SET_TYPE.SET_ROTATION]: {
    value: '旋转角度',
    ...defaultMaps
  },
  [SET_TYPE.SET_TINT]: {
    topLeft: 'topLeft',
    topRight: 'topRight',
    bottomLeft: 'bottomLeft',
    bottomRight: 'bottomRight'
  },
  [SET_TYPE.SET_VISIBLE]: {
    value: '是否可见',
    index: '开始索引',
    direction: '遍历方向'
  },
  [SET_TYPE.SET_ORIGIN]: {
    x: '原点x',
    y: '原点y',
    ...defaultXYMap
  },
  [SET_TYPE.SET_SCALE]: {
    x: '缩放x',
    y: '缩放y',
    ...defaultXYMap
  },
  [SET_TYPE.SET_SCROLL_FACTOR]: {
    x: '翻滚因子x值',
    y: '翻滚因子y值',
    ...defaultXYMap
  },
  [SET_TYPE.SET_XY]: {
    x: 'x',
    y: 'y',
    ...defaultXYMap
  },
  [SET_TYPE.SET_HIT_AREA]: {
    hitArea: '撞击区域'
  }
}

function hitArrayCallback(
  hitArea: any,
  x: number,
  y: number,
  gameObject: Phaser.GameObjects.GameObject
): boolean {
  console.log('hitArea---', hitArea, x, y, gameObject)
  return hitArea
}

const setFun = () => {
  const {
    value,
    step,
    index,
    direction,
    x,
    y,
    stepX,
    stepY,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    hitArea
  } = setParamsForm
  switch (setType.value) {
    case SET_TYPE.SET_ALPHA:
    case SET_TYPE.SET_DEPTH:
    case SET_TYPE.SET_X:
    case SET_TYPE.SET_Y:
    case SET_TYPE.SET_SCROLL_FACTOR_X:
    case SET_TYPE.SET_SCROLL_FACTOR_Y:
    case SET_TYPE.SET_SCALE_X:
    case SET_TYPE.SET_SCALE_Y:
    case SET_TYPE.SET_ROTATION:
      Phaser.Actions[setType.value](images, value, step, index, direction)
      break
    case SET_TYPE.SET_BLEND_MODE:
      Phaser.Actions[setType.value](images, value, index, direction)
      break
    case SET_TYPE.SET_TINT:
      Phaser.Actions[setType.value](
        images,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
      )
      break
    case SET_TYPE.SET_VISIBLE:
      Phaser.Actions[setType.value](images, !!value, index, direction)
      break
    case SET_TYPE.SET_ORIGIN:
    case SET_TYPE.SET_SCALE:
    case SET_TYPE.SET_SCROLL_FACTOR:
    case SET_TYPE.SET_XY:
      Phaser.Actions[setType.value](
        images,
        x,
        y,
        stepX,
        stepY,
        index,
        direction
      )
      break
    case SET_TYPE.SET_HIT_AREA:
      try {
        if (hitArea) {
          const area = JSON.parse(hitArea)
          Phaser.Actions[setType.value](images, area, hitArrayCallback)
        }
      } catch (e) {
        console.log(e)
      }
      break
    default:
      break
  }
}

// 初始化游戏
const { images } = useGame({
  imgPaths: IMGPATHS,
  addRect: true,
  createFun: setFun,
  updateFun: setFun
})
</script>
