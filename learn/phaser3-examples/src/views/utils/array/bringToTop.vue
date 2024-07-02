<template>
  arr: {{ arr }}
  <br>
  brignt to top:
  <Select
    :options="
      arr.map((i) => ({
        label: i,
        value: i
      }))
    "
    @change="changeText"
    v-model="topVal"
  />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useGame, { CustomScene } from '@/hooks/game'
import Select from '@/components/common/select.vue'

const arr = reactive(['a', 'b', 'c', 'd', 'e'])

const topVal = ref(arr[0])

let text: Phaser.GameObjects.Text

// 初始化游戏
useGame({
  createFun: function () {
    const self = this as CustomScene
    text = self.add.text(0, 0, arr.join('-'))
    changeText()
  }
})

const changeText = () => {
  Phaser.Utils.Array.BringToTop(arr, topVal.value)
  text.setText(arr.join('-'))
}
</script>
