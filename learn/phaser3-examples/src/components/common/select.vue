<template>
  <select v-model="value" class="text-gray-800" @change="change">
    <option v-for="option in options" :key="option.label" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts" generic="T extends any">
import { computed } from 'vue'

interface Option<T> {
  label: string
  value: T
}

const props = withDefaults(
  defineProps<{
    options: Option<T>[]
    modelValue: T
  }>(),
  {
    options: () => []
  }
)

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void
  (e: 'change', value: any): void
}>()

const change = (e: Event) => {
  emit('change', e)
}
</script>
