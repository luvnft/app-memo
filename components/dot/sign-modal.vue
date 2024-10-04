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

    <template v-if="!isLoading">
      <div class="flex items-center gap-5">
        <div class="h-20 w-20 rounded-full border-2 border-border-color"></div>
        <div class="flex flex-col gap-2">
          <h1 class="text-xl text-text-color">{{ props.name }}</h1>
          <p class="text-sm text-text-color opacity-70">Network: {{ chainName }}</p>
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
          <span class="ml-2 font-bold text-text-color">{{ totalDeposit }} {{ properties.symbol }}</span>
        </p>

        <button class="col-span-2 flex items-center gap-2" @click="showBreakdown = !showBreakdown">
          <p class="text-xs text-text-color opacity-50">Breakdown</p>
          <Icon :name="`mdi:chevron-${showBreakdown ? 'up' : 'down'}`" size="20" class="text-text-color opacity-50" />
        </button>

        <template v-if="showBreakdown">
          <p class="text-sm text-text-color">Collection Deposit</p>
          <p class="text-right text-sm text-text-color">{{ depositForCollection }} {{ properties.symbol }}</p>
          <p class="text-sm text-text-color">Free Minting Deposit</p>
          <p class="text-right text-sm text-text-color">
            {{ props.quantity }} x {{ depositPerItem }} {{ properties.symbol }}
          </p>
          <p class="text-sm text-text-color">Fees</p>
          <p class="text-right text-sm text-text-color">0.02 {{ properties.symbol }}</p>
        </template>
      </div>

      <dot-button :disabled="!isLogIn" variant="primary" size="large" @click="sign()"> Proceed to signing </dot-button>
    </template>

    <template v-else>
      <p class="text-text-color">Signing ...</p>
    </template>
  </VueFinalModal>
</template>

<script lang="ts" setup>
import { VueFinalModal, useVfm } from "vue-final-modal";
import { useAccountStore } from "@/stores/account";
import { createArgsForNftPallet } from "@/utils/sdk/create";
import useAuth from "~/composables/useAuth";
import { nextCollectionId } from "~/utils/sdk/query";
import { collectionDeposit, itemDeposit, MEMO_BOT, metadataDeposit } from "~/utils/sdk/constants";
import { onApiConnect } from "@kodadot1/sub-api";
import { getChainName } from "~/utils/chain.config";

const props = defineProps<{
  name: string;
  image: File;
  startDate: Date;
  endDate: Date;
  quantity: number;
  secret: string;
}>();

const { apiInstance } = useApi();
const { howAboutToExecute, status, isError: _isError, isLoading } = useMetaTransaction();
const { accountId, isLogIn } = useAuth();
const { prefix } = usePrefix();

const properties = chainAssetOf(prefix.value);
const chainName = getChainName(prefix.value);
const depositPerItem = ref(0);
const depositForCollection = ref(0);
const totalDeposit = computed(() => depositPerItem.value * props.quantity + depositForCollection.value);

const accountStore = useAccountStore();
const currentAccount = computed(() => accountStore.selected);

onApiConnect(prefix.value, async (api) => {
  const collectionFee = collectionDeposit(api);
  const itemFee = itemDeposit(api);
  const metadataFee = metadataDeposit(api);
  const decimals = Number(`1e${properties.decimals}`);
  depositForCollection.value = (collectionFee + metadataFee) / decimals;
  depositPerItem.value = itemFee / decimals;
});

const showBreakdown = ref(false);

async function sign() {
  if (!accountId.value) {
    console.error("No account selected");
    return;
  }
  const api = await apiInstance.value;

  const createArgs = createArgsForNftPallet(accountId.value, props.quantity);
  const nextId = await nextCollectionId(api);

  if (!nextId) {
    console.error("No next collection id");
    return;
  }

  // const args = buildMemo(api, accountId.value, props.quantity);

  const cb = api.tx.utility.batchAll;
  const args = [
    [
      api.tx.nfts.create(...createArgs),
      // api.tx.nfts.setCollectionMetadata(
      //   nextId,
      //   fromCollection.metadata,
      // ),
      api.tx.nfts.setTeam(nextId, MEMO_BOT, accountId.value, accountId.value),
    ],
  ];
  // const cb = api.tx.utility.batchAll;
  await howAboutToExecute(accountId.value, cb, args);
}

watch(status, (status) => {
  if (status === TransactionStatus.Finalized) {
    // call API
    // closeModal();
  }
});

const vfm = useVfm();
const closeModal = () => vfm.close("sign-modal");
</script>
