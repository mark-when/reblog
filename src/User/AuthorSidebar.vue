<script setup lang="ts">
import Logo from "../logo.vue";
import { toInnerHtml } from "../utilities/html";
const props = defineProps<{ header: any; path: string }>();
</script>

<template>
  <div
    class="sidebar px-4 @6xl:absolute @6xl:w-80 @6xl:ml-16 @6xl:pt-0 pt-2 pb-4 rounded @6xl:h-full"
  >
    <div class="sticky top-8 flex flex-col gap-4">
      <a href="/"> <Logo class="h-10 w-10"></Logo></a>
      <div class="flex flex-col gap-2">
        <a class="text-3xl font-black" :href="path">
          {{ header?.re?.title || header?.title }}
        </a>
        <div
          class="author flex flex-row items-center gap-2 pt-0"
          v-if="header?.re?.author || header?.author"
        >
          <a
            v-if="header?.re?.author?.avatar || header?.author?.avatar"
            :href="path"
          >
            <img
              :src="header.re?.author?.avatar || header.author?.avatar"
              class="rounded-full w-12 bg-slate-100/50"
            />
          </a>
          <div class="flex flex-col">
            <a class="font-bold" :href="path">
              {{ header?.re?.author?.name || header?.author?.name }}
            </a>
            <a class="" :href="path">{{ path.replace(/^\//, "@") }}</a>
          </div>
        </div>
        <div
          class="font-medium whitespace-pre"
          v-html="
            toInnerHtml(header?.re?.description || header?.description || '')
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
