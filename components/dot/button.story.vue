<template>
  <Story title="Dot/Button" auto-props-disabled>
    <Variant title="Default">
      <dot-button
        class="w-1/2"
        :disabled="state.disabled"
        :variant="state.variant"
        @click="logEvent('Click!', $event)"
      >
        {{ state.content }}
      </dot-button>
    </Variant>
    <Variant title="With icon">
      <dot-button
        class="w-1/2"
        :disabled="state.disabled"
        :variant="state.variant"
      >
        {{ state.content }}
        <template #icon>
          <icon name="mdi:chevron-double-down" size="24" />
        </template>
      </dot-button>
    </Variant>
    <template #controls>
      <HstText v-model="state.content" title="Content" />
      <HstSelect
        v-model="state.variant"
        title="Variant"
        :options="['primary', 'secondary', 'danger', 'success', 'warning']"
      />
      <HstCheckbox v-model="state.disabled" title="Disabled" />
    </template>
  </Story>
</template>

<docs lang="md">
# Button documentation

This is a button component.

## Slots

- `default`: The button content.

## Props

- `disabled`: Disables the button.
- `variant`: The button variant.

## Events

- `click`: Emitted when the button is clicked.
</docs>

<script lang="ts" setup>
import { logEvent } from "histoire/client";
import type { BtnVariant } from "./types";

const state = reactive({
  content: "Hello",
  variant: "primary" as BtnVariant,
  disabled: false,
});
</script>

<style></style>
