<template>
  <main class="flex flex-col bg-bg-persistent">
    <section
      class="relative flex h-[65vh] flex-col items-center justify-center gap-10"
      :style="{
        backgroundImage: `url(${landingBackground})`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <p class="text-4xl !text-white md:text-7xl">Your memories,<br />forever onchain</p>
      <div class="flex flex-row gap-5">
        <dot-button size="large" variant="primary" class="px-10 sm:px-20" @click="router.push('/claim')">
          Claim
        </dot-button>
        <dot-button size="large" variant="tertiary-light" class="px-10 sm:px-20" @click="router.push('/create')">
          Create
        </dot-button>
      </div>
      <div class="flex flex-col items-center gap-3">
        <p class="!text-white">Powered by</p>
        <img :src="polkadotLogo" alt="polkadot logo" class="h-10" />
      </div>
    </section>

    <section class="mx-10 flex min-h-[40vh] flex-col justify-between gap-7 rounded-2xl bg-white p-10">
      <p class="max-w-full text-4xl !text-black sm:max-w-[66%] md:text-6xl">
        Capture your unforgettable moments as digital badges on the Polkadot network.
      </p>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div class="flex items-center justify-start">
          <p class="!text-black">Turn milestones into digital memories</p>
        </div>
        <div class="flex hidden justify-end">
          <dot-button class="w-full sm:w-auto" variant="tertiary-dark" size="large">Learn more</dot-button>
        </div>
      </div>
    </section>

    <section class="m-10 flex min-h-[50vh] flex-col">
      <p class="m-6 text-3xl !text-white">How Dotmemo Works</p>

      <div class="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        <div class="flex flex-col gap-2 rounded-3xl bg-bg-card p-8 sm:p-12">
          <div class="mb-16 h-16 w-16 rounded-full bg-k-primary"></div>
          <p class="text-2xl font-bold !text-white">Claim</p>
          <p class="!text-white">
            Receive a digital badge for attending or participating in special events, all securely stored on the
            Polkadot network.
          </p>
        </div>

        <div class="flex flex-col gap-2 rounded-3xl bg-bg-card p-8 sm:p-12">
          <div class="mb-16 h-16 w-16 rounded-full bg-k-primary"></div>
          <p class="text-2xl font-bold !text-white">Create</p>
          <p class="!text-white">
            Organizers can create unique badges to distribute at their events, giving attendees a tangible way to
            commemorate their experiences.
          </p>
        </div>

        <div class="flex flex-col gap-2 rounded-3xl bg-bg-card p-8 sm:p-12">
          <div class="mb-16 h-16 w-16 rounded-full bg-k-primary"></div>
          <p class="text-2xl font-bold !text-white">Share & Showcase</p>
          <p class="!text-white">
            Show off your achievements by sharing your badges on social media or displaying them in your digital wallet.
          </p>
        </div>
      </div>
    </section>

    <section class="m-10 flex min-h-[40vh] flex-col gap-7 rounded-2xl bg-white p-10">
      <p class="text-4xl !text-black md:text-6xl">Featured</p>

      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div v-for="collection in collections" :key="collection.id" class="flex flex-col items-center gap-2">
          <div class="aspect-square w-full rounded-xl bg-stone-300">
            <img
              :src="$purifyOne(collection.image, 'kodadot')"
              alt="collection image"
              class="rounded-xl object-cover"
            />
          </div>
          <p class="text-xl font-bold text-black">{{ collection.name }}</p>
          <a :href="kodaUrl(collection.id)">View on KodaDot</a>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import polkadotLogo from "@/assets/images/Polkadot.png";
import landingBackground from "@/assets/images/landing-background.png";
import { getClient } from "@kodadot1/uniquery";
import { $purifyOne } from "@kodadot1/minipfs";
definePageMeta({
  layout: "landing",
});

const router = useRouter();

const { prefix } = usePrefix();
const collections = ref([]);

const client = getClient(prefix.value);
const ids = computed(() => (prefix.value === "ahp" ? ["1", "13", "163", "171"] : ["67", "167", "287", "477"]));
const query = client.collectionByIdIn(ids.value);
const result = await client.fetch(query);

collections.value = result.data.collections;

const kodaUrl = (id: string) => `https://kodadot.xyz/${prefix.value}/collection/${id}`;
</script>
