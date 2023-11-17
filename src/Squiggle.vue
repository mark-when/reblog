<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ seed: string; flatness: number }>();
const h = (s: string) =>
  s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
const r1 = computed(() => h(props.seed.substring(0, 2)) % 2 === 0);
const r2 = computed(() => h(props.seed.substring(2)) % 2 === 0);

const minY = computed(() => 1 - Math.min(1, 2 / props.flatness));
const maxY = computed(() => 1 + Math.min(1, 2 / props.flatness));
</script>

<template>
  <svg
    :viewbox="r1 && !r2 ? `-4 -2 25 6` : `-2 -2 25 6`"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    :style="r1 ? 'transform: rotate(180deg)' : ''"
  >
    <path
      :d="`M 0 ${maxY} 
      C 1.1818 ${maxY} 1.9139 ${minY} 3.4314 ${minY} 
      C 4.9488 ${minY} 5.6604 ${maxY} 7.1779 ${maxY} 
      C 8.6953 ${maxY} 9.1976 ${minY} 10.7151 ${minY}
      C 12.2325 ${minY} 12.9441 ${maxY} 14.4616 ${maxY} 
      C 15.979 ${maxY} 16.4813 ${minY} 17.9987 ${minY} ${
        r2 ? `C 19.5162 ${minY} 20.2278 ${maxY} 21.7453 ${maxY}` : ''
      }`"
    ></path>
  </svg>
</template>

<style scoped></style>
