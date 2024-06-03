<template>
  <div class="not-found">
    <h2 class="text-center mt-20 text-2xl">There's Nothing at all.</h2>
    <p class="text-center mt-5 cursor-pointer" @click="router.replace('/')">
      go back to home.
    </p>
  </div>
</template>
<script setup lang="ts">
import {} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<style lang="scss" scoped></style>
