<template>
  <div class="mx-auto flex max-w-xl flex-col items-center space-y-10 p-4">
    <h1 class="mt-10 text-center text-4xl font-bold md:mt-20">Claim POAP</h1>

    <div class="flex aspect-square w-2/5 rounded-full border border-black bg-zinc-400 shadow-[4px_4px] shadow-k-shade2">
      <div v-if="status !== 'success'" class="m-4 flex-1 rounded-full bg-zinc-300" />
      <img v-else :src="data.imageSrc" alt="poap image" class="flex-1 rounded-full object-cover" />
    </div>

    <h3 v-if="status === 'success'">{{ data.name }}</h3>
    <h3 v-if="error" class="text-k-red">Couldn't load POAP</h3>

    <div class="flex flex-col space-y-3 self-stretch">
      <template v-if="!claimed">
        <div class="flex rounded-full border-2 border-border-color p-2 shadow-text-color">
          <button
            class="flex-1 rounded-full py-2 text-text-color"
            :class="{
              'bg-background-color-inverse text-text-color-inverse': showAddressInput,
            }"
            @click="showAddressInput = true"
          >
            Enter address
          </button>
          <button
            class="flex-1 rounded-full py-2 text-text-color"
            :class="{
              'bg-background-color-inverse text-text-color-inverse': !showAddressInput,
            }"
            @click="showAddressInput = false"
          >
            Connect wallet
          </button>
        </div>

        <dot-label v-if="showAddressInput" text="Enter DOT address">
          <form @submit.prevent="onSubmit()">
            <dot-text-input v-model="manualAddress" placeholder="Address" />
          </form>
        </dot-label>

        <client-only v-if="!showAddressInput">
          <dot-label text="Account">
            <dot-connect />
          </dot-label>
        </client-only>

        <dot-label v-if="claimFailed" :error="true" text="You already claimed this POAP" />

        <dot-button :disabled="!canClaim || isClaiming" variant="primary" size="medium" @click="claim">
          Claim
        </dot-button>

        <div
          class="flex h-10 rounded-full bg-stone-600/15 p-1"
          :class="{
            'opacity-100': isClaiming,
            'opacity-0': !isClaiming,
          }"
        >
          <div
            class="flex items-center justify-end rounded-full bg-k-primary transition-all duration-[60000ms] ease-linear"
            :style="`width: ${isClaiming ? '100%' : '0%'};`"
          >
            <Icon name="mdi:chevron-right" class="animate-pulse text-white animate-duration-[1200ms]" size="28" />
            <Icon
              name="mdi:chevron-right"
              class="animate-pulse text-white animate-delay-[400ms] animate-duration-[1200ms]"
              size="28"
            />
            <Icon
              name="mdi:chevron-right"
              class="animate-pulse text-white animate-delay-[800ms] animate-duration-[1200ms]"
              size="28"
            />
          </div>
        </div>
      </template>

      <template v-else>
        <dot-label text="POAP claimed successfully 🥳">
          <a :href="claimed" class="block w-full">
            <dot-button class="w-full" variant="primary" size="large">Check your POAP at KodaDot</dot-button>
          </a>
        </dot-label>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { isAddress } from "@polkadot/util-crypto";

const route = useRoute();
const accountStore = useAccountStore();
const manualAddress = ref("");
const showAddressInput = ref(true);

const address = computed(() => (showAddressInput.value ? manualAddress.value : accountStore.selected?.address));

const canClaim = computed(() => isAddress(address.value));

const { data, status, error } = await useFetch("/api/code", {
  query: { code: route.params.code },
  watch: false,
});

const claimFailed = ref(false);
const claimed = ref<null | string>(null);
const isClaiming = ref(false);
onMounted(() => {
  isClaiming.value = true;
});

const onSubmit = () => claim();

const claim = async () => {
  if (!address.value) return;
  if (!canClaim.value) return;

  try {
    claimFailed.value = false;
    isClaiming.value = true;

    const data = await $fetch("/api/claim", {
      method: "POST",
      body: {
        code: route.params.code,
        address: address.value,
      },
    });

    setTimeout(() => {
      const url = `https://kodadot.xyz/${data.chain}/gallery/${data.collection}-${data.sn}`;
      claimed.value = url;
      isClaiming.value = false;
    }, 60_000);
  } catch (error) {
    claimFailed.value = true;
    isClaiming.value = false;
  }
};
</script>
