<template>
  <div class="mx-auto flex max-w-xl flex-col items-center space-y-10 p-4">
    <h1 class="mt-10 text-center text-4xl font-bold md:mt-20">.claim</h1>

    <div class="flex aspect-square w-2/5 rounded-full border border-black bg-zinc-400 shadow-[4px_4px] shadow-k-shade2">
      <div v-if="status !== 'success'" class="m-4 flex-1 rounded-full bg-zinc-300" />
      <img v-else :src="data?.image" alt="poap image" class="flex-1 rounded-full object-cover" />
    </div>

    <h3 v-if="status === 'success'">{{ data?.name }}</h3>

    <div class="flex flex-col space-y-1 self-stretch">
      <dot-label text="Enter MEMO Code" class="flex-1">
        <form class="flex space-x-4" @submit.prevent="onSubmit()">
          <dot-text-input v-model="code" :error="errorMessage" placeholder="event2024" />
          <div>
            <dot-button variant="tertiary" size="large" @click="open()">
              <template #icon>
                <icon name="mdi:qrcode" size="24" />
              </template>
            </dot-button>
          </div>
        </form>
      </dot-label>
      <dot-button
        :disabled="!isCodeValid || status === 'pending'"
        variant="primary"
        size="large"
        @click="continueClaim"
      >
        {{ status === "pending" ? "Searching ..." : "Continue" }}
      </dot-button>
    </div>

    <a href="#">How this works ?</a>
  </div>
</template>
<script setup lang="ts">
import QRScannerModal from "~/components/dot/qr-scanner-modal.vue";
import { useModal } from "vue-final-modal";
import { parseClaimString } from "~/utils/scanner";

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
    router.push(`/claim/${code.value}`);
  }
};

const onSubmit = () => continueClaim();

const errorMessage = computed(() => (error.value ? "Couldn't load MEMO" : undefined));

const { open } = useModal({
  component: QRScannerModal,
  attrs: {
    onScan(data: string) {
      const parsedData = parseClaimString(data);
      code.value = parsedData;
    },
  },
});
</script>
