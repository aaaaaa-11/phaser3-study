<template>
  <div class="home-page px-4 py-2 overflow-auto max-h-screen">
    <ul
      class="flex flex-wrap text-center text-xl font-bold"
      v-if="!showExample"
    >
      <li
        class="w-28 h-[3rem] leading-[3rem] ml-4 mt-2 bg-indigo-300 rounded-md hover:bg-indigo-400 transition-colors duration-500 cursor-pointer"
        v-for="example in examples"
        :key="example.path"
        @click="toggleChildren(example)"
      >
        {{ example.name }}
      </li>
    </ul>
    <ul class="text-l mr-4" v-if="!showExample && activeItem?.children">
      <li
        class="h-[2.5rem] leading-[2.5rem] ml-4 mt-2 px-2 bg-indigo-300 rounded-e-md hover:bg-indigo-400 transition-colors duration-500 cursor-pointer"
        v-for="exampleItem in activeItem.children"
        :key="exampleItem.path"
        @click="goPage(exampleItem)"
      >
        {{ exampleItem.name }}
      </li>
    </ul>
    <div class="example-page" v-if="showExample">
      <div class="flex mb-3">
        <button
          class="px-3 mr-3 bg-indigo-300 rounded h-[3rem] leading-[3rem]"
          @click="goBack"
        >
          back
        </button>
        <div id="game"></div>
      </div>
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { exampleRoutes } from '../router/examplesRoute'
import { firstUpCase } from '../utils/format'

interface ListItem {
  path: string
  name: string
  children?: ListItem[]
}

const route = useRoute()

const activeItem = ref<ListItem>()
// example列表
const examples: ListItem[] = exampleRoutes.map((i) => {
  return {
    path: i.path,
    name: firstUpCase(i.name),
    children: i.children.map((c) => ({
      path: c.path,
      name: c.name as string
    }))
  }
})
// 显示子列表
const toggleChildren = (item: ListItem) => {
  if (activeItem.value?.name !== item.name) {
    showExample.value = false
  }
  activeItem.value = activeItem.value
    ? activeItem.value?.name !== item.name
      ? item
      : undefined
    : item
}

const showExample = ref<boolean>(false)

watch(
  () => route.path,
  (val) => {
    const routeMatched = route.matched
    const secondPath = routeMatched?.[1]?.path
    if (secondPath) {
      const active = examples.find((i) => i.path === secondPath)
      activeItem.value = active
      const thirdPath = routeMatched?.[2]?.path
      if (thirdPath) {
        showExample.value = true
      } else {
        showExample.value = false
      }
    } else {
      showExample.value = false
    }
  },
  {
    immediate: true
  }
)

// 跳转案例页面
const router = useRouter()
const goPage = (item: ListItem) => {
  router.push(item.path)
}

const goBack = () => {
  router.go(-1)
}
</script>
