<template>
  <p>
    旋转rotate方法：

    <Select
      v-model="rotate"
      @change="updateRotate"
      :options="
        Object.values(ROTATE_TYPE).map((i) => ({
          label: RotateTextMap[i],
          value: i
        }))
      "
    />
  </p>
  <p>
    <span v-show="rotate === ROTATE_TYPE.ROTATE">
      <span
        >value:
        <input
          type="number"
          v-model="optionsForm.value"
          class="text-gray-800 w-16 mr-3"
          @change="updateRotate"
      /></span>
      <span>
        step:
        <input
          type="number"
          v-model="optionsForm.step"
          class="text-gray-800 w-16 mr-3"
          @change="updateRotate"
        />
      </span>
      <span>
        index:
        <input
          type="number"
          v-model="optionsForm.index"
          class="text-gray-800 w-16 mr-3"
          @change="updateRotate"
        />
      </span>
      <span>
        <Direction v-model="optionsForm.direction" @change="updateRotate" />
      </span>
    </span>
    <span v-show="rotate !== ROTATE_TYPE.ROTATE">
      <span
        >point.x:
        <input
          type="number"
          v-model="optionsForm.point.x"
          class="text-gray-800 w-16 mr-3"
          @change="updateRotate"
      /></span>
      <span
        >point.y:
        <input
          type="number"
          v-model="optionsForm.point.y"
          class="text-gray-800 w-16 mr-3"
          @change="updateRotate"
      /></span>
      <span
        >angle:
        <input
          type="number"
          v-model="optionsForm.angle"
          class="text-gray-800 w-16 mr-3"
          @change="updateRotate"
      /></span>
    </span>
    <span v-show="rotate === ROTATE_TYPE.ROTATE_AROUND_DISTANCE">
      <span
        >distance:
        <input
          type="number"
          v-model="optionsForm.distance"
          class="text-gray-800 w-16 mr-3"
          @change="updateRotate"
      /></span>
    </span>
  </p>
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import { ref, reactive } from 'vue'
import { ROTATE_TYPE, RotateTextMap } from '@/utils/enums'
import Direction from './direction.vue'
import Select from './common/select.vue'

const props = defineProps<{
  items: Phaser.GameObjects.GameObject[]
  defaultRotate?: ROTATE_TYPE
}>()

const emit = defineEmits<{
  (e: 'updateRotate', value: ROTATE_TYPE): void
}>()

// 当前选中的rotate方法
const rotate = ref<ROTATE_TYPE>(props.defaultRotate || ROTATE_TYPE.ROTATE)
// 所有RotateXXX()的参数
const optionsForm = reactive({
  value: 0.1,
  step: 1,
  index: 0,
  direction: '1',
  point: {
    x: 50,
    y: 50
  },
  angle: 0,
  distance: 0
})

// 更新图形位置
const updateRotate = () => {
  emit('updateRotate', rotate.value)
  switch (rotate.value) {
    case ROTATE_TYPE.ROTATE:
      Phaser.Actions.Rotate(
        props.items,
        optionsForm.value,
        optionsForm.step,
        optionsForm.index,
        +optionsForm.direction
      )
      break
    case ROTATE_TYPE.ROTATE_AROUND:
      Phaser.Actions.RotateAround(
        props.items,
        optionsForm.point,
        optionsForm.angle
      )
      break
    case ROTATE_TYPE.ROTATE_AROUND_DISTANCE:
      Phaser.Actions.RotateAroundDistance(
        props.items,
        optionsForm.point,
        optionsForm.angle,
        optionsForm.distance
      )
  }
}

defineExpose({
  updateRotate
})
</script>
