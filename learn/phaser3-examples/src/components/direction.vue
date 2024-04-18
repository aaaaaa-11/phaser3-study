<template>
  direction:
  <label for="direction1">
    <input
      type="radio"
      name="direction"
      id="direction1"
      value="1"
      class="text-gray-800"
      :checked="direction === 1"
      @change="changeDirection"
    />1</label
  >
  <label for="direction2">
    <input
      type="radio"
      name="direction"
      id="direction2"
      value="-1"
      :checked="direction === -1"
      class="text-gray-800 ml-3"
      @change="changeDirection"
    />-1</label
  >
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    direction: number
  }>(),
  {
    direction: 1
  }
)

const emit = defineEmits<{
  (e: 'changeDirection', direction: number): void
}>()

const direction = ref(props.direction)

// 改变方向
const changeDirection = (e: Event) => {
  direction.value = +(e.target as HTMLInputElement).value
  emit('changeDirection', direction.value)
}
</script>
<style lang="scss" scoped></style>
