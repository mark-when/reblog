<script setup lang="ts">
import type { MarkdownBlock, Block } from "@markwhen/parser";

const props = defineProps<{ avatarUrl: boolean; sup: MarkdownBlock }>();
</script>

<template>
  <div
    class="flex flex-row items-center mx-4 @6xl:2rem] @6xl:ml-[24rem] @7xl:ml-[30rem] pl-1"
    :class="{
      '@6xl:ml-[20rem]  @7xl:ml-[30rem]': !avatarUrl,
    }"
  >
    <li v-html="(sup as Block).raw"></li>
  </div>
</template>
