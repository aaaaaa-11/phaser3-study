<template>
  <p>
    offset: x:
    <input
      type="number"
      v-model="offsetX"
      class="text-gray-800 w-28 mr-3"
      @change="changeAlignOffset"
    />
    y:
    <input
      type="number"
      v-model="offsetY"
      class="text-gray-800 w-28 mr-3"
      @change="changeAlignOffset"
    />
  </p>
</template>

<script setup lang="ts">
import Phaser from 'phaser'
import { ref } from 'vue'

const props = defineProps<{
  items: Phaser.GameObjects.GameObject[]
  activeAlign: AlignKey
}>()

// 偏移量
const offsetX = ref(0)
const offsetY = ref(0)

// 改变偏移量
const changeAlignOffset = () => {
  Phaser.Actions.AlignTo(
    props.items,
    Phaser.Display.Align[props.activeAlign],
    offsetX.value,
    offsetY.value
  )
}

defineExpose({
  changeAlignOffset,
  offsetX,
  offsetY
})
</script>
