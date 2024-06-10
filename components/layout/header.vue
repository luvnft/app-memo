<template>
  <header
    class="flex w-full items-center border-b border-primary bg-primary/5 p-2 px-4"
  >
    <h1 class="text-2xl">.POAP</h1>
    <layout-nav />
    <p-button>Connect</p-button>
    <select v-model="colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  </header>
</template>
<script setup lang="ts">
const colorMode = useColorMode();
</script>
