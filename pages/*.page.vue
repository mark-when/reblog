<script setup lang="ts">
import { usePageContext } from "../renderer/usePageContext";

const pageContext = usePageContext();
</script>

<template>
  <div>hello</div>
  <div>{{ pageContext.node }}</div>
</template>

<style scoped></style>
