<script setup lang="ts">
import { Block, MarkdownBlock } from "@markwhen/parser";
import { toInnerHtml } from "../utilities/html";

const props = defineProps<{ sup: MarkdownBlock; index: number; avatarUrl: boolean }>();
</script>

<template>
  <div
    class="flex flex-row items-center mx-4 @6xl:w-[32rem] @6xl:ml-[24rem] @7xl:ml-[30rem] pl-1"
    :class="{
      '@6xl:ml-[20rem] @7xl:ml-[30rem]': !avatarUrl,
    }"
  >
    <input
      type="checkbox"
      :checked="(sup as Block).value"
      :id="`checkbox_${index}_${(sup as Block).raw}`"
      @click.prevent=""
    />
    <label
      v-html="toInnerHtml((sup as Block).raw)"
      class="ml-2 pointer-events-auto"
      :for="`checkbox_${index}_${(sup as Block).raw}`"
    ></label>
  </div>
</template>

<style scoped></style>
