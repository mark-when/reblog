<script setup lang="ts">
import AuthorSidebar from "./AuthorSidebar.vue";
import { PageInfo } from "../../vue";
import { Timelines, isEventNode } from "@markwhen/parser";
import NodePreview from "./NodePreview.vue";

interface UserPageProps {
  path: string;
  allPages: PageInfo[];
  mw: Timelines;
}

const props = defineProps<UserPageProps>();
</script>

<template>
  <div class="@container">
    <div class="dark:text-slate-200 mx-auto @6xl:relative">
      <AuthorSidebar :path="path" :header="mw.timelines[0].header" />
      <div class="main overflow-scroll mt-5">
        <NodePreview
          v-for="{ nodeInfo: { node }, url } in allPages.filter(
            ({ nodeInfo }) => isEventNode(nodeInfo.node)
          )"
          :node="node"
          :url="url"
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

<style></style>
