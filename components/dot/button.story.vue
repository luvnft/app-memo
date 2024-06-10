<template>
  <Story title="Dot/Button">
    <Variant title="Default">
      <dot-button class="w-full" @click="logEvent('Click!', $event)">
        {{ state.content }}
      </dot-button>
      <template #controls>
        <HstText v-model="state.content" title="Content" />
      </template>
    </Variant>
    <Variant title="Disabled">
      <dot-button class="w-full" disabled>{{ state.content }}</dot-button>
      <template #controls>
        <HstText v-model="state.content" title="Content" />
      </template>
    </Variant>
  </Story>
</template>

<docs lang="md">
# Button documentation

This is a button component.

## Slots

- `default`: The button content.

## Props

- `disabled`: Disables the button.

## Events

- `click`: Emitted when the button is clicked.
</docs>

<script lang="ts" setup>
import { logEvent } from "histoire/client";

const state = reactive({
  content: "Hello",
});
</script>

<style></style>
