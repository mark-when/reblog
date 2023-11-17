<script setup lang="ts">
import { MarkdownBlock } from "@markwhen/parser";
import { ref } from "vue";

const props = defineProps<{ sup: MarkdownBlock[]; linked?: string }>();

const larger = ref(false);
</script>

<template>
  <div
    class="overflow-scroll flex flex-row noScrollBar px-4 pt-4 pb-6 @6xl:pr-48"
    :style="{
      height: larger ? `min(90vh, 45rem)` : `20rem`,
    }"
    v-if="Array.isArray(sup)"
  >
    <img
      v-for="(i, index2) in sup"
      @click="larger = !larger"
      :src="i.link"
      :alt="i.alt"
      loading="lazy"
      class="rounded-lg cursor-pointer z-10 object-contain object-scale-down shadow-lg"
      :class="{
        '@6xl:ml-[24.25rem] @7xl:ml-[30.25rem] ml-[1.25rem]': index2 === 0,
        'ml-4': index2 !== 0,
      }"
    />
  </div>
</template>

<style scoped></style>
