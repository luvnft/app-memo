<template>
  <span
    class="inline-flex items-center rounded-full"
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
    @click="!disabled && (model = !model)"
  >
    <input v-model="model" class="peer sr-only" type="checkbox" />
    <span
      class="peer relative h-6 w-11 rounded-full border border-black after:absolute after:start-[1px] after:top-[1px] after:h-5 after:w-5 after:rounded-full after:border after:border-black after:bg-k-grey after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:bg-background-color peer-focus:outline-none rtl:peer-checked:after:-translate-x-full"
      :class="switchClasses"
    />
  </span>
</template>
<script lang="ts" setup>
const model = defineModel({
  type: Boolean,
});

const props = defineProps<{
  disabled: boolean;
}>();

const switchClasses = computed(() => {
  if (!props.disabled) {
    return "bg-background-color peer-checked:bg-k-primary";
  }
  return "bg-k-shade peer-checked:bg-k-pink";
});
</script>
