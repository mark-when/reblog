<script setup lang="ts">
import type { Node, Event } from "@markwhen/parser";
import { COMPLETION_REGEX } from "@markwhen/parser";
import { DateTime } from "luxon";
import { computed } from "vue";
import { useEventRefs } from "../utilities/useEventRefs";
import { AuthorInfo } from "./AuthorInfo";
import CheckboxBlock from "./CheckboxBlock.vue";
import ImagesBlock from "./ImagesBlock.vue";
import ListItemBlock from "./ListItemBlock.vue";
import Linkified from "./Linkified.vue";
import Squiggle from "../Squiggle.vue";

const props = defineProps<{
  node: Node<Event>;
  url?: string;
  authorInfo: AuthorInfo;
  supplementalLimit?: number;
}>();

const { eventRange } = useEventRefs(computed(() => props.node.value));

const titleText = computed(() => {
  return props.node.value.eventDescription.eventDescription.replace(
    COMPLETION_REGEX,
    (a, b) => a.substring(b.length)
  );
});

const date = computed(() =>
  DateTime.fromISO(eventRange.value!.fromDateTimeIso)
);

const dateText = computed(() => {
  if (
    date.value.hour === 0 &&
    date.value.minute === 0 &&
    date.value.second === 0
  ) {
    return date.value.toISODate();
  }
  return date.value.toFormat("yyyy-MM-dd h:mma").toLowerCase();
});

const ago = computed(() => {
  const now = DateTime.now();
  const dt = date.value;
  const duration = +now < +dt ? dt.diff(now) : now.diff(dt);
  const years = duration.as("years");
  if (years > 1) {
    return `${Math.floor(years)}y`;
  }
  const days = duration.as("days");
  if (days > 1) {
    return Math.floor(days) + "d";
  }
  const hours = duration.as("hours");
  if (hours > 1) {
    return Math.floor(hours) + "h";
  }
  const minutes = duration.as("minutes");
  if (minutes > 1) {
    return Math.floor(minutes) + "m";
  }
  const seconds = duration.as("seconds");
  if (seconds > 10) {
    return Math.floor(seconds) + "s";
  }
  return "now";
});

const mappedSupplemental = computed(() => {
  const mapped = [];
  const sup = props.node.value.eventDescription.supplemental;
  for (let i = 0; i < sup.length; i++) {
    const s = sup[i];
    if (s.type === "text") {
      let isHeader = false;
      // @ts-ignore
      const text = (s.raw as string).replace(/^\w*#+/, () => {
        isHeader = true;
        return "";
      });
      mapped.push({
        bold: isHeader,
        text,
        type: "text",
      });
    } else if (s.type === "image") {
      const images = [sup[i]];
      let next = i + 1;
      while (next < sup.length && sup[next].type === "image") {
        images.push(sup[next]);
        next++;
      }
      i = next - 1;
      mapped.push(images);
    } else {
      mapped.push(s);
    }
  }
  return mapped;
});

const cappedMappedSupplemental = computed(() =>
  props.supplementalLimit
    ? mappedSupplemental.value.slice(0, props.supplementalLimit)
    : mappedSupplemental.value
);

const hasMore = computed(
  () => mappedSupplemental.value.length > cappedMappedSupplemental.value.length
);

const avatarUrl = computed(() => props.authorInfo.avatarUrl);
</script>

<template>
  <div class="flex flex-col gap-[2px] mb-8">
    <div
      class="@6xl:ml-[24rem] @7xl:ml-[30rem] @6xl:w-[40rem] border-t pt-2"
    ></div>
    <Linkified
      class="leading-[1.65rem] hover:underline"
      :class="hasMore ? 'text-3xl font-bold py-1' : 'font-medium'"
      :url="url"
      :bold="false"
      :text="titleText"
    ></Linkified>
    <div class="@6xl:ml-[24rem] @7xl:ml-[30rem] @6xl:w-[40rem] text-sky-700 dark:text-sky-500">
      <Squiggle
        :seed="node.value.eventDescription.eventDescription"
        class="w-12"
        :flatness="mappedSupplemental.length"
      ></Squiggle>
    </div>
    <div
      class="@6xl:ml-[24rem] @7xl:ml-[30rem] @6xl:w-[40rem] flex flex-row mx-4 text-gray-500 dark:text-gray-400 px-1 group text-sm items-center gap-1"
    >
      <!-- <div class="w-2 h-2 rounded-full bg-indigo-700"></div> -->
      <a :href="url" class="group-hover:underline">{{ dateText }}</a>
      <a :href="url" class="ml-auto group-hover:underline">
        {{ ago }}
      </a>
    </div>
    <div class="flex flex-col gap-1 leading-[1.65rem]">
      <template v-for="(sup, index) in cappedMappedSupplemental">
        <ImagesBlock
          :sup="sup"
          v-if="Array.isArray(sup)"
          :linked="url"
        ></ImagesBlock>
        <Linkified
          v-else-if="sup.type === 'text'"
          :text="sup.text"
          :bold="sup.bold"
          :url="url"
        ></Linkified>
        <CheckboxBlock
          v-else-if="sup.type === 'checkbox'"
          :avatar-url="!!avatarUrl"
          :sup="sup"
          :index="index"
        ></CheckboxBlock>
        <ListItemBlock
          :sup="sup"
          :avatar-url="!!avatarUrl"
          v-else-if="sup.type === 'listItem'"
        ></ListItemBlock>
      </template>
      <a
        v-if="hasMore"
        :href="url"
        class="mx-4 @6xl:w-[32rem] @6xl:ml-[24rem] @7xl:ml-[30rem] pl-1 ml-20"
        >...</a
      >
    </div>
    <div
      :class="{
        'pb-8': !!supplementalLimit,
        'pb-32': !supplementalLimit,
      }"
      class="mx-4 @6xl:ml-96 @6xl:w-[40rem] @7xl:ml-[30rem]"
    ></div>
  </div>
</template>

<style scoped>
img {
  width: auto;
  max-height: 20rem;
  min-height: 2rem;
}
</style>
