<template>
  对齐方式：
  <select v-model="activeAlign" class="text-gray-800" @change="changeAlignTo">
    <option v-for="i in aligns" :key="i" :value="i">{{ i }}</option>
  </select>
  {{ alignsMap[activeAlign] }} 对齐
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  items: Phaser.GameObjects.GameObject[]
}>()

const emit = defineEmits<{
  (e: 'changeAlignTo', align: AlignKey): void
}>()

// 切换对齐方式
const activeAlign = ref<AlignKey>('RIGHT_BOTTOM')
const aligns: AlignKey[] = [
  'TOP_LEFT',
  'TOP_CENTER',
  'TOP_RIGHT',
  'LEFT_TOP',
  'LEFT_CENTER',
  'LEFT_BOTTOM',
  'CENTER',
  'RIGHT_TOP',
  'RIGHT_CENTER',
  'RIGHT_BOTTOM',
  'BOTTOM_LEFT',
  'BOTTOM_CENTER',
  'BOTTOM_RIGHT'
]
// 对齐方式-文字描述 映射
const alignsMap: Record<AlignKey, string> = {
  TOP_LEFT: '上左',
  TOP_CENTER: '上中',
  TOP_RIGHT: '上右',
  LEFT_TOP: '左上',
  LEFT_CENTER: '左中',
  LEFT_BOTTOM: '左下',
  CENTER: '中间',
  RIGHT_TOP: '右上',
  RIGHT_CENTER: '右中',
  RIGHT_BOTTOM: '右下',
  BOTTOM_LEFT: '下左',
  BOTTOM_CENTER: '下中',
  BOTTOM_RIGHT: '下右'
}
// 改变对齐方式
const changeAlignTo = () => {
  Phaser.Actions.AlignTo(props.items, Phaser.Display.Align[activeAlign.value])
  emit('changeAlignTo', activeAlign.value)
}

defineExpose({
  changeAlignTo,
  activeAlign
})
</script>
