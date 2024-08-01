<template>
  <header
    class="glass-blur border-primary fixed left-0 top-0 flex h-[60px] w-full items-center justify-between border-b p-2 px-4"
  >
    <nuxt-link to="/">
      <h1 class="text-2xl dark:text-white">.POAP</h1>
    </nuxt-link>
    <div class="flex-end flex items-center gap-4">
      <layout-nav />
      <client-only>
        <dot-connect size="small">Connect</dot-connect>
      </client-only>
    </div>
  </header>
</template>
<style scoped>
.glass-blur {
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.2px);
  -webkit-backdrop-filter: blur(10.2px);
}
</style>
