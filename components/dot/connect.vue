<template>
  <dot-label text="Account">
    <dot-button variant="primary" @click="open">
      {{
        accountStore.hasSelectedAccount ? accountStore.shortAddress : "Connect"
      }}
    </dot-button>
  </dot-label>
</template>

<script lang="ts" setup>
import { useModal } from "vue-final-modal";
import ConnectModal from "./connect-modal.vue";

const accountStore = useAccountStore();

const { open, close } = useModal({
  component: ConnectModal,
  attrs: {
    onConfirm() {
      close();
    },
  },
});
</script>

<style></style>
