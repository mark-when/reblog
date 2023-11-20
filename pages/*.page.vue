<template>
  <UserPage v-bind="props"></UserPage>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { usePageContext } from "../renderer/usePageContext";
import UserPage from "../src/User/UserPage.vue";

const props = computed(() => {
  const context = usePageContext();
  return {
    path: "/",
    allPages: context.allPages,
    mw: context.mw,
    ours: context.ours,
  };
});
</script>
