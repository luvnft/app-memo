<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="flex w-1/2 flex-col p-4 gap-4 bg-background-color border border-background-color-inverse"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1 class="text-2xl text-text-color">Select account</h1>
    <div class="flex flex-col gap-2">
      <div class="mb-4">
        <dot-button
          v-for="account in accountStore.accounts"
          :key="account.address"
          class="w-full"
          :variant="
            selectedAccount?.address === account.address
              ? 'primary'
              : 'secondary'
          "
          @click="selectedAccount = account"
        >
          {{ account.meta.name }} [{{ addressShortener(account.address) }}]
        </dot-button>
      </div>
      <dot-button
        :disabled="!selectedAccount"
        variant="primary"
        @click="saveAndClose"
      >
        Confirm
      </dot-button>
      <dot-button variant="secondary" @click="emit('confirm')">
        Cancel
      </dot-button>
    </div>
  </VueFinalModal>
</template>

<script lang="ts" setup>
import { VueFinalModal } from "vue-final-modal";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { useAccountStore } from "~/stores/account";
import type { Account } from "~/types/web3";

const emit = defineEmits<{
  (e: "confirm"): void;
}>();

const accountStore = useAccountStore();
onMounted(async () => {
  await web3Enable("dotpoap dapp");
  accountStore.setAccounts(await web3Accounts());
});

const selectedAccount = ref<Account | null>(null);

const saveAndClose = () => {
  if (selectedAccount.value) {
    accountStore.selectAccount(selectedAccount.value);
    emit("confirm");
  }
};
</script>
