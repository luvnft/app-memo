<template>
  <header
    class="border-primary fixed left-0 top-0 flex h-[60px] w-full items-center justify-between border-b bg-white/[0.12] p-2 px-4 shadow-[0_4px_30px] shadow-black/[0.1] backdrop-blur-[10.2px]"
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
