<template>
  <Story title="Dot/Label" auto-props-disabled>
    <Variant title="Default">
      <dot-label text="Switch *" :required="required">
        <dot-switch />
      </dot-label>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
const state = reactive({
  required: false,
});
</script>
