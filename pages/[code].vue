<template>
  <div class="mx-auto flex max-w-xl flex-col items-center space-y-10 p-4">
    <h1 class="mt-10 text-center text-4xl font-bold md:mt-20">Claim POAP</h1>

    <div
      class="flex aspect-square w-2/5 rounded-full border border-black bg-zinc-400 shadow-[4px_4px] shadow-k-shade2"
    >
      <div
        v-if="status !== 'success'"
        class="m-4 flex-1 rounded-full bg-zinc-300"
      />
      <img
        v-else
        :src="data.imageSrc"
        alt="poap image"
        class="flex-1 rounded-full object-cover"
      />
    </div>

    <h3 v-if="status === 'success'">{{ data.name }}</h3>
    <h3 v-if="error" class="text-k-red">Couldn't load POAP</h3>

    <div class="flex flex-col space-y-3 self-stretch">
      <client-only>
        <dot-connect />
      </client-only>
      <dot-label text="Or enter address">
        <dot-text-input v-model="address" placeholder="Address" />
      </dot-label>
      <dot-button
        :disabled="!canClaim"
        variant="primary-shadow"
        size="medium"
        @click="claim"
      >
        Claim
      </dot-button>
      <dot-button
        variant="secondary-shadow"
        size="medium"
        @click="$router.push('/')"
      >
        Back
      </dot-button>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();

const accountStore = useAccountStore();

const address = ref("");

const canClaim = computed(
  () => address.value.trim().length > 0 || accountStore.hasSelectedAccount,
);

const { data, status, error } = await useFetch("/api/code", {
  query: { code: route.params.code },
  watch: false,
});

const claim = async () => {
  const _address = address.value || accountStore.selected?.address;
  if (!_address) return;
  await $fetch("/api/claim", {
    method: "POST",
    body: {
      code: route.params.code,
      address: _address,
    },
  });
};
</script>
