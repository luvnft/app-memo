<template>
  <div class="flex flex-col gap-2">
    <label class="font-bold">{{ text }} <span v-if="required">*</span></label>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  text: string;
  required?: boolean;
}>();
</script>

<style></style>
