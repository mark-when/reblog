<script setup lang="ts">
import AuthorSidebar from "./AuthorSidebar.vue";
import { PageInfo } from "../../vue";
import { Event, Node, Timelines, isEventNode } from "@markwhen/parser";
import NodePreview from "./NodePreview.vue";
import NodeVue from "./Node.vue";

interface UserPageProps {
  path: string;
  allPages: PageInfo[];
  mw: Timelines;
  ours?: PageInfo;
}
const props = defineProps<UserPageProps>();
</script>

<template>
  <div class="@container">
    <div class="dark:text-slate-200 mx-auto @6xl:relative">
      <AuthorSidebar :path="path" :header="mw.timelines[0].header" />
      <div class="main overflow-scroll mt-8">
        <NodeVue
          v-if="ours"
          :node="(ours.node as Node<Event>)"
          :authorInfo="{
            name: mw.timelines[0].header.name,
            avatarUrl: mw.timelines[0].header.avatar?.url,
          }"
        ></NodeVue>
        <NodePreview
          v-else
          v-for="{ node, url } in allPages.filter((p) => isEventNode(p.node))"
          :node="(node as Node<Event>)"
          :url="`/${url}`"
          :authorInfo="{
            name: mw.timelines[0].header.name,
            avatarUrl: mw.timelines[0].header.avatar?.url,
          }"
          :supplementalLimit="2"
        ></NodePreview>
      </div>
    </div>
  </div>
</template>

<style>
body {
  @apply bg-stone-50 dark:bg-sky-950;
}
</style>
