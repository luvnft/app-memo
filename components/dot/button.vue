<template>
  <button
    class="dot-button"
    :disabled="disabled"
    :class="btnClasses"
    @click="$emit('click')"
  >
    <slot class="icon" name="icon" />
    <slot />
  </button>
</template>

<script lang="ts" setup>
import type { BtnVariant } from "./types";

defineEmits<{
  (e: "click"): void;
}>();

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    variant?: BtnVariant;
  }>(),
  {
    disabled: false,
    variant: "primary",
  },
);

const btnClasses = computed(() => {
  if (props.disabled) {
    return "bg-disabled text-white cursor-not-allowed";
  }
  return {
    "bg-primary text-white": props.variant === "primary",
    "bg-white border border-primary": props.variant === "secondary",
    "bg-danger  text-white": props.variant === "danger",
    "bg-success text-white": props.variant === "success",
    "bg-warning text-white": props.variant === "warning",
  };
});
</script>

<style scoped>
.dot-button {
  @apply relative flex cursor-pointer items-center justify-center gap-1 rounded p-4 font-bold uppercase transition ease-in-out hover:bg-opacity-90;
}
.dot-button::before {
  content: " ";
  z-index: -1;
  @apply absolute left-1 top-1 h-full w-full rounded bg-black p-4 transition ease-in-out;
  transition:
    left 0.2s,
    top 0.2s;

  &:hover {
    @apply left-0.5 top-0.5;
  }
}
.dot-button .icon {
  @apply ml-2;
}
</style>
