<template>
  direction:
  <label for="direction1">
    <input
      type="radio"
      name="direction"
      id="direction1"
      value="1"
      class="text-gray-800"
      :checked="modelValue === 1"
      @change="changeDirection"
    />1</label
  >
  <label for="direction2">
    <input
      type="radio"
      name="direction"
      id="direction2"
      value="-1"
      :checked="modelValue === -1"
      class="text-gray-800 ml-3"
      @change="changeDirection"
    />-1</label
  >
</template>
<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    modelValue: number
  }>(),
  {
    modelValue: 1
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
}>()

// 改变方向
const changeDirection = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
}
</script>
<style lang="scss" scoped></style>
