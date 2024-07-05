<template>
  <div class="mx-auto flex max-w-xl flex-col items-center space-y-10 p-4">
    <h1 class="mt-10 text-center text-4xl font-bold md:mt-20">Claim POAP</h1>

    <div
      class="flex aspect-square w-2/5 rounded-full border border-black bg-zinc-400 shadow-[4px_4px] shadow-k-shade2"
    >
      <div class="m-4 flex-1 rounded-full bg-zinc-300"></div>
    </div>

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
        >Continue</dot-button
      >
    </div>

    <a href="#">How this works ?</a>
  </div>
</template>
<script setup lang="ts">
const code = ref("");

const isCodeValid = computed(() => code.value.trim().length > 0);
</script>
