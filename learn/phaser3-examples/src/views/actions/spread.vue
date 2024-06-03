<template>
  属性：
  <Select
    v-model="formState.property"
    :options="[
      {
        label: 'x',
        value: 'x'
      },
      {
        label: 'y',
        value: 'y'
      },
      {
        label: '透明度',
        value: 'alpha'
      },
      {
        label: '旋转角度',
        value: 'rotation'
      }
    ]"
    @change="updateSpread('property')"
  />
  max:
  <input
    class="text-gray-800 w-16 ml-1"
    type="number"
    :max="maxValue"
    :min="minValue"
    v-model="formState.max"
    @change="updateSpread('max')"
  />
  min:
  <input
    class="text-gray-800 w-16 ml-1"
    type="number"
    :max="maxValue"
    :min="minValue"
    v-model="formState.min"
    @change="updateSpread('min')"
  />
  inc:
  <Radio
    :options="incOptions"
    v-model="formState.inc"
    @change="updateSpread()"
  />
  <br />
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import useGame from '@/hooks/game'
import Radio from '@/components/common/radio.vue'
import Select from '@/components/common/select.vue'

// 图片地址
const IMGPATHS = [
  '/fruits/fruit_banana_100.png',
  '/fruits/fruit_grape_100.png',
  '/fruits/fruit_pineapple_100.png',
  '/fruits/fruit_strawberry_100.png',
  '/fruits/fruit_watermelon_100.png'
]

const incOptions = [
  {
    label: '是',
    value: '1'
  },
  {
    label: '否',
    value: ''
  }
]

const formState = reactive({
  property: 'x',
  min: 0,
  max: 100,
  inc: '1'
})

// 初始化游戏
const { images, WIDTH, HEIGHT } = useGame({
  imgPaths: IMGPATHS,
  addRect: true,
  createFun: function () {
    images.forEach((i) => i.setX(0))
    updateSpread()
  }
})

const minValue = computed(() => {
  if (formState.property === 'alpha') {
    return 0
  } else if (['x', 'y'].includes(formState.property)) {
    return 0
  }
  return -360
})

const maxValue = computed(() => {
  if (formState.property === 'alpha') {
    return 1
  } else if (formState.property === 'x') {
    return WIDTH
  } else if (formState.property === 'y') {
    return HEIGHT
  }
  return 360
})

console.log(minValue.value, maxValue.value)

const updateSpread = (type?: string) => {
  const max = maxValue.value
  const min = minValue.value
  if (type === 'property') {
    formState.max = max
    formState.min = min
  } else {
    const currMax = formState.max
    const currMin = formState.min
    if (currMax > max) {
      formState.max = max
    }
    if (currMin < min) {
      formState.min = min
    }
    if (type === 'max') {
      if (formState.max < formState.min) formState.max = formState.min
      else if (formState.max > max) {
        formState.max = max
      }
    } else if (type === 'min') {
      if (formState.min > formState.max) formState.min = formState.max
      else if (formState.min < min) {
        formState.min = min
      }
    }
  }
  Phaser.Actions.Spread(
    images,
    formState.property,
    formState.min,
    formState.max,
    !!formState.inc
  )
}
</script>
