<template>
  <span
    class="flex w-full items-center justify-between gap-2 border px-3 py-3"
    :class="wrapperClasses"
  >
    <slot name="prefix" class="max-w-20" />
    <input
      v-model="model"
      :placeholder="placeholder"
      type="text"
      :class="inputClasses"
      class="h-full w-full focus:outline-none focus:ring-0"
    />
    <slot name="suffix" />
  </span>
</template>

<script lang="ts" setup>
const model = defineModel({
  type: String,
});

const props = defineProps<{
  placeholder?: string;
  error?: boolean;
}>();

const wrapperClasses = computed(() => {
  if (props.error) {
    return "border-k-red";
  }
  return "border-k-grey";
});

const inputClasses = computed(() => {
  if (props.error) {
    return "placeholder:text-k-red";
  }
  return "placeholder:text-placeholder-color";
});
</script>
