<template>
  <div
    class="flex"
    :class="vertical ? 'flex-row justify-between' : 'flex-col gap-2'"
  >
    <label class="font-bold text-text-color" :class="{ 'text-k-red': error }"
      >{{ text }} <span v-if="required">*</span></label
    >
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  text: string;
  required?: boolean;
  vertical?: boolean;
  error?: boolean;
}>();
</script>

<style></style>
