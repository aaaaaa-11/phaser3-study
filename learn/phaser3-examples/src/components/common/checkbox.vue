<template>
  <label :for="`radio${i}`" v-for="(option, i) in options" :key="option.label">
    <input
      type="checkbox"
      name="radio"
      :id="`radio${i}`"
      :value="option.value"
      class="text-gray-800"
      :checked="modelValue.includes(option.value)"
      @change="toggle"
    />{{ option.label }}</label
  >
</template>
<script setup lang="ts">
interface Option {
  value: string
  label: string
}

const props = defineProps<{
  options: Option[]
  modelValue: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string[]): void
  (e: 'change', value: Event): void
}>()

const toggle = (e: Event) => {
  const value = (e.target as HTMLInputElement).value

  let checkValue = []
  if (props.modelValue.includes(value)) {
    checkValue = props.modelValue.filter((i) => i !== value)
  } else {
    checkValue = [...props.modelValue, value]
  }

  emit('update:modelValue', checkValue)
  emit('change', e)
}
</script>
<style lang="scss" scoped></style>
