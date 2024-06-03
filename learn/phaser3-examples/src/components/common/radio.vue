<template>
  <label :for="`radio${i}`" v-for="(option, i) in options" :key="option.label">
    <input
      type="radio"
      name="radio"
      :id="`radio${i}`"
      :value="option.value"
      class="text-gray-800"
      :checked="modelValue === option.value"
      @change="toggle"
    />{{ option.label }}</label
  >
</template>
<script setup lang="ts">
interface Option {
  value: string
  label: string
}

defineProps<{
  options: Option[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
  (e: 'change', value: Event): void
}>()

const toggle = (e: Event) => {
  const value = (e.target as HTMLInputElement).value

  emit('update:modelValue', value)
  emit('change', e)
}
</script>
<style lang="scss" scoped></style>
