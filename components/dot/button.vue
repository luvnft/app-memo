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
import type { BtnSize, BtnVariant } from "./types";

defineEmits<{
  (e: "click"): void;
}>();

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    variant?: BtnVariant;
    size?: BtnSize;
  }>(),
  {
    disabled: false,
    variant: "primary-shadow",
    size: "small",
  },
);

const SIZE_CLASSES: Record<BtnSize, string> = {
  small: "text-sm px-4 py-1",
  medium: "px-4 py-2",
  large: "text-lg px-5 py-3",
};

const VARIANT_CLASSES: Record<BtnVariant, string> = {
  "primary-shadow": `
      bg-k-primary hover:bg-background-color text-black hover:text-text-color border border-border-color
      disabled:bg-disabled disabled:text-neutral-7 disabled:opacity-50
      shadow-text-color hover:shadow-text-color  shadow-[4px_4px] hover:shadow-[2px_2px]
    `,
  "secondary-shadow": `
      bg-background-color text-text-color border border-border-color hover:bg-k-accent-hover
      disabled:bg-disabled disabled:text-neutral-7 disabled:opacity-50
      shadow-text-color hover:shadow-text-color  shadow-[4px_4px] hover:shadow-[2px_2px]
    `,
  primary: `
      bg-k-primary hover:bg-background-color text-black hover:text-text-color border border-border-color
      disabled:bg-disabled disabled:text-neutral-7 disabled:opacity-50
    `,
  secondary: `
      bg-background-color text-text-color border border-border-color hover:bg-k-accent-hover
      disabled:bg-disabled disabled:text-neutral-7 disabled:opacity-50
    `,
  "primary-rounded": `
      bg-k-primary hover:bg-background-color text-black hover:text-text-color border border-border-color rounded-full
      disabled:bg-disabled disabled:text-neutral-7 disabled:opacity-50
    `,
  "secondary-rounded": `
      bg-background-color text-text-color border border-border-color hover:bg-k-accent-hover rounded-full 
      disabled:bg-disabled disabled:text-neutral-7 disabled:opacity-50
    `,
};

const btnClasses = computed(() => {
  const baseClasses = props.disabled ? "cursor-not-allowed" : "cursor-pointer";

  const size = SIZE_CLASSES[props.size];

  const variant = VARIANT_CLASSES[props.variant];

  return `${baseClasses} ${size} ${variant}`;
});
</script>

<style scoped>
.dot-button {
  @apply inline-flex items-center justify-center gap-1 transition ease-in-out;
}
.dot-button .icon {
  @apply ml-2;
}
</style>
