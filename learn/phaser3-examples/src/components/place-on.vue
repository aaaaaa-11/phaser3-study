<template>
  <p>
    place on

    <select v-model="placeOn" class="text-gray-800" @change="changePlaceOn">
      <option v-for="i in Object.values(PLACE_ON)" :key="i" :value="i">
        {{ i }}
      </option>
    </select>
    <span class="mx-3">{{ PlaceOnTextMap[placeOn] }}</span>
    <span v-show="[PLACE_ON.CIRCLE, PLACE_ON.ELLIPSE].includes(placeOn)"
      >startAngle:
      <input
        type="number"
        v-model="optionsForm.startAngle"
        class="text-gray-800 w-16 mr-3"
        @change="updatePlaceOn"
    /></span>
    <span v-show="[PLACE_ON.CIRCLE, PLACE_ON.ELLIPSE].includes(placeOn)">
      endAngle:
      <input
        type="number"
        v-model="optionsForm.endAngle"
        class="text-gray-800 w-16 mr-3"
        @change="updatePlaceOn"
      />
    </span>
    <span v-show="placeOn === PLACE_ON.RECTANGLE">
      shift:
      <input
        type="number"
        v-model="optionsForm.shift"
        class="text-gray-800 w-16 mr-3"
        @change="updatePlaceOn"
      />
    </span>
    <span v-show="placeOn === PLACE_ON.TRIANGLE">
      stepRate:
      <input
        type="number"
        v-model="optionsForm.stepRate"
        class="text-gray-800 w-16 mr-3"
        @change="updatePlaceOn"
      />
    </span>
  </p>
  <p>
    设置形状参数：
    <span v-show="[PLACE_ON.CIRCLE, PLACE_ON.RANDOM_CIRCLE].includes(placeOn)"
      >设置中心点和半径
    </span>
    <span v-show="[PLACE_ON.ELLIPSE, PLACE_ON.RANDOM_ELIPSE].includes(placeOn)"
      >设置中心点和短半轴和长半轴
    </span>
    <span
      v-show="[PLACE_ON.RECTANGLE, PLACE_ON.RANDOM_RECTANGLE].includes(placeOn)"
    >
      设置左上角和右下角的顶点
    </span>
    <span
      v-show="[PLACE_ON.TRIANGLE, PLACE_ON.RANDOM_TRIANGLE].includes(placeOn)"
    >
      设置6个参数，分别是三个顶点的x、y
    </span>
    <input
      type="number"
      v-for="(i, index) in shapeForm.slice(0, geoParamLen)"
      :key="index"
      v-model="shapeForm[index]"
      class="text-gray-800 w-16 mr-3"
      @change="changePlaceOn"
    />
  </p>
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import { ref, reactive, computed } from 'vue'
import { PLACE_ON, PlaceOnTextMap, GeoMap, GEO } from '@/utils/enums'

const props = defineProps<{
  items: Phaser.GameObjects.GameObject[]
}>()

const emit = defineEmits<{
  (e: 'changePlaceOn', value: PLACE_ON): void
}>()

// 创建geo所需参数，如圆形需要中心点和半径共3个点
const geoParamLen = computed(() => {
  const geo = GeoMap[placeOn.value]
  switch (geo) {
    case GEO.CIRCLE:
      return 3
    case GEO.ELLIPSE:
      return 4
    case GEO.LINE:
      return 4
    case GEO.RECTANGLE:
      return 4
    case GEO.TRIANGLE:
      return 6
    default:
      return 0
  }
})

const shapeForm = reactive([0, 1, 2, 3, 4, 5])

// PlaceOnXXX 或 RandomXXX 对应的对象
const placeOnItem = ref<AnyPlaceOn>()

// 当前选中的place on 或 random 类型
const placeOn = ref<PLACE_ON>(PLACE_ON.CIRCLE)
// 所有PlaceOnXXX的参数
const optionsForm = reactive({
  startAngle: 0,
  endAngle: 6.28,
  shift: 0,
  stepRate: 1
})

// 当前PlaceOnXXX | RandomXXX的参数
const placeonForm = computed(() => {
  const options: any[] = []
  switch (placeOn.value) {
    case PLACE_ON.CIRCLE:
    case PLACE_ON.ELLIPSE:
      options.push(optionsForm.startAngle, optionsForm.endAngle)
      break
    case PLACE_ON.RECTANGLE:
      options.push(optionsForm.shift)
      break
    case PLACE_ON.TRIANGLE:
      options.push(optionsForm.stepRate)
      break
  }
  return options
})

// 切换place on选项
const changePlaceOn = () => {
  placeOnItem.value = new Phaser.Geom[GeoMap[placeOn.value]](
    ...shapeForm.slice(0, geoParamLen.value)
  )
  updatePlaceOn()
  emit('changePlaceOn', placeOn.value)
}

// 更新图形位置
const updatePlaceOn = () => {
  Phaser.Actions[placeOn.value](
    props.items,
    placeOnItem.value as AllPlaceOn,
    ...placeonForm.value
  )
}

defineExpose({
  changePlaceOn
})
</script>
