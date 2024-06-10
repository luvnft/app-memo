<template>
  <button
    class="rounded border border-primary p-4 uppercase transition ease-in-out"
    :disabled="disabled"
    :class="{
      'cursor-not-allowed bg-disabled hover:bg-disabled/50': disabled,
      'cursor-pointer bg-white hover:bg-primary/20': !disabled,
    }"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  disabled?: boolean;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>

<style></style>
