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
      <dot-label text="Enter POAP Code" class="flex-1">
        <div class="flex space-x-3">
          <dot-text-input
            v-model="code"
            placeholder="CODE · SVv43nF...9a33jA"
          />
          <dot-button variant="secondary" size="small">
            <template #icon>
              <icon name="mdi:qrcode" size="24" />
            </template>
          </dot-button>
        </div>
      </dot-label>
      <dot-button
        :disabled="!isCodeValid"
        variant="primary-shadow"
        size="medium"
        @click="continueClaim"
      >
        Continue
      </dot-button>
    </div>

    <a href="#">How this works ?</a>
  </div>
</template>
<script setup lang="ts">
const code = ref("");

const isCodeValid = computed(() => code.value.trim().length > 0);

const { data, status, refresh, error } = await useFetch("/api/code", {
  query: { code },
  immediate: false,
  watch: false,
});
const router = useRouter();
const continueClaim = async () => {
  await refresh();
  if (status.value === "success") {
    router.push(`/${code.value}`);
  }
};
</script>
