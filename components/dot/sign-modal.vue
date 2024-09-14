<template>
  <VueFinalModal
    modal-id="sign-modal"
    class="flex items-center justify-center"
    content-class="flex w-3/4 sm:w-2/3 md:w-1/2 xl:w-1/4 flex-col p-6 gap-4 bg-background-color rounded-2xl border border-background-color-inverse"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div class="flex items-center justify-between pb-1">
      <h1 class="text-xl font-semibold text-text-color">Confirm creation</h1>
      <button @click="closeModal()">
        <Icon name="mdi:close" size="32" class="text-text-color" />
      </button>
    </div>

    <hr class="-mx-6" />

    <template v-if="accountStore.hasSelectedAccount">
      <p class="mt-2 text-text-color opacity-70">Connected as</p>

      <div class="flex items-center gap-3">
        <div class="h-7 w-7 rounded-full border-2 border-border-color"></div>
        <p class="text-text-color">{{ currentAccount?.meta.name }}</p>
      </div>
    </template>

    <client-only v-else>
      <dot-connect />
    </client-only>

    <hr class="my-3" />

    <template v-if="!isSigning">
      <div class="flex items-center gap-5">
        <div class="h-20 w-20 rounded-full border-2 border-border-color"></div>
        <div class="flex flex-col gap-2">
          <h1 class="text-xl text-text-color">{{ props.name }}</h1>
          <p class="text-sm text-text-color opacity-70">Network: PolkadotHub</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <p class="text-sm text-text-color">Event Start</p>
        <p class="text-right text-sm text-text-color">{{ props.startDate.toISOString().split("T").at(0) }}</p>
        <p class="text-sm text-text-color">Event End</p>
        <p class="text-right text-sm text-text-color">{{ props.endDate.toISOString().split("T").at(0) }}</p>
        <p class="text-sm text-text-color">Claim Code</p>
        <p class="text-right text-sm font-bold text-text-color">{{ props.secret }}</p>
        <p class="text-sm text-text-color">Amount</p>
        <p class="text-right text-sm font-bold text-text-color">{{ props.quantity }}</p>
      </div>

      <hr class="-mx-6 my-3" />

      <div class="grid grid-cols-2 gap-3">
        <p class="text-sm text-text-color">Total Deposit + Fees</p>
        <p class="text-right text-sm text-text-color">
          <span class="text-xs text-text-color opacity-60">$0.980</span>
          <span class="ml-2 font-bold text-text-color">1 DOT</span>
        </p>
        <p class="text-sm text-text-color">Free Minting Deposit</p>
        <p class="text-right text-sm text-text-color">24 x 0.04 DOT</p>
        <p class="text-sm text-text-color">Fees</p>
        <p class="text-right text-sm text-text-color">0.02 DOT</p>
      </div>

      <dot-button :disabled="!canSign" variant="primary" size="large" @click="sign()"> Proceed to signing </dot-button>
    </template>

    <template v-else>
      <p class="text-text-color">Signing ...</p>
    </template>
  </VueFinalModal>
</template>

<script lang="ts" setup>
import { VueFinalModal, useVfm } from "vue-final-modal";
import { useAccountStore } from "~/stores/account";

const props = defineProps<{
  name: string;
  image: File;
  startDate: Date;
  endDate: Date;
  quantity: number;
  secret: string;
}>();

const accountStore = useAccountStore();
const currentAccount = computed(() => accountStore.selected);

const canSign = computed(() => accountStore.hasSelectedAccount);
const isSigning = ref(false);

function sign() {
  isSigning.value = true;

  setTimeout(() => {
    isSigning.value = false;
  }, 1000);
}

const vfm = useVfm();
const closeModal = () => vfm.close("sign-modal");
</script>
