<template>
  <div class="flex h-screen w-full flex-col items-center gap-4 p-4">
    <h1>Welcome to .POAP (App url: {{ $config.public.appUrl }})</h1>
    <div class="flex w-1/2 flex-col gap-2 rounded-lg bg-gray-300 p-4 shadow">
      <h2 v-if="pending">Loading...</h2>
      <h2 v-else>Status: {{ data }}</h2>
      <button class="w-full bg-blue-300 p-2" @click="refresh">
        <icon name="mdi:reload" size="24" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createLogger } from "~/utils/use-logger";

const logger = createLogger("index");
logger.info("Hello here");

const { data, pending, refresh } = useFetch("/api/health");
</script>
