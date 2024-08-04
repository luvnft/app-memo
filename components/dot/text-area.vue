<template>
  <span
    class="relative flex w-full items-center justify-between gap-2 border focus-within:border-k-primary focus-within:bg-k-primary-light"
    :class="wrapperClasses"
  >
    <textarea
      ref="textarea"
      v-model="model"
      :placeholder="placeholder"
      :class="inputClasses"
      :maxlength="limit"
      class="min-h-20 min-w-0 flex-1 resize-y bg-transparent p-3 text-text-color focus:outline-none focus:ring-0"
    >
    </textarea>

    <span
      v-if="Number.isInteger(limit)"
      class="absolute -top-5 right-0 text-xs text-text-color"
    >
      {{ model?.length ?? 0 }} / {{ limit }}
    </span>
  </span>
</template>

<script lang="ts" setup>
import { useTextareaAutosize } from "@vueuse/core";

const { textarea } = useTextareaAutosize();

const model = defineModel<string>();

const props = defineProps<{
  placeholder?: string;
  error?: boolean;
  limit?: number;
}>();

const wrapperClasses = computed(() => {
  if (props.error) {
    return "border-k-red";
  }
  return "border-border-color";
});

const inputClasses = computed(() => {
  if (props.error) {
    return "placeholder:text-k-red";
  }
  return "placeholder:text-text-color/60";
});
</script>
