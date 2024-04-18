<template>
  <label for="runing">
    <input
      type="checkbox"
      id="runing"
      class="text-gray-800"
      :checked="runingState"
      @input="changeState"
    />持续运行</label
  >
</template>
<script setup lang="ts">
import {} from 'vue'

withDefaults(
  defineProps<{
    runingState: boolean
  }>(),
  {
    runingState: false
  }
)

const emit = defineEmits<{
  (e: 'update:runingState', runingState: boolean): void
}>()

const changeState = (e: Event) => {
  emit('update:runingState', (e.target as HTMLInputElement).checked)
}
</script>
<style lang="scss" scoped></style>
