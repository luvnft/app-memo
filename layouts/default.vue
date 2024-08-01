<template>
  <div
    id="app-base"
    class="relative h-screen min-h-screen bg-background-color pt-10"
  >
    <layout-header />
    <main class="h-full p-4">
      <slot />
    </main>
    <layout-footer />
  </div>
</template>
