<template>
  <VueFinalModal
    class="flex items-center justify-center"
    content-class="flex w-3/4 md:w-2/5 flex-col p-6 gap-4 bg-background-color rounded-2xl border border-background-color-inverse"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1 class="text-2xl font-semibold text-text-color">Select account</h1>
    <div class="flex flex-col gap-2">
      <div class="mb-4 flex flex-col gap-3">
        <dot-button
          v-for="account in accountStore.accounts"
          :key="account.address"
          class="flex w-full"
          :variant="selectedAccount?.address === account.address ? 'primary' : 'tertiary'"
          @click="selectedAccount = account"
        >
          <div class="flex flex-1 flex-col items-start gap-1 px-4 py-1">
            <h2 class="font-bold">{{ account.meta.name }}</h2>
            <p class="text-xs">
              {{ addressShortener(account.address, 10, -10) }}
            </p>
          </div>
        </dot-button>
      </div>
      <div class="flex justify-end gap-2">
        <dot-button variant="tertiary" @click="emit('confirm')"> Cancel </dot-button>
        <dot-button :disabled="!selectedAccount" variant="primary" @click="saveAndClose"> Confirm </dot-button>
      </div>
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

<style>
* {
  font-family: "Unbounded", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
