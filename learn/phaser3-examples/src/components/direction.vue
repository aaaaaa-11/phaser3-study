<template>
  direction:
  <Radio
    :options="[
      {
        label: '1',
        value: '1'
      },
      {
        label: '-1',
        value: '-1'
      }
    ]"
    v-model="direction"
    @change="changeDirection"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Radio from './common/radio.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
  }>(),
  {
    modelValue: '1'
  }
)

const direction = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: Event): void
}>()

// 改变方向
const changeDirection = (e: Event) => {
  emit('change', e)
}
</script>
<style lang="scss" scoped></style>
