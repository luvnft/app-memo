<template>
  <footer class="flex w-full justify-center border-t border-k-primary bg-k-primary-light p-2 text-text-color">
    .POAP 2024 {{ name }}
  </footer>
</template>

<script lang="ts" setup>
const { prefix } = usePrefix();
const name = computed(() => (prefix.value === "ahp" ? "Polkadot" : "Kusama"));
</script>
