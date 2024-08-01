<template>
  <nav>
    <ul class="flex w-full justify-evenly gap-4">
      <li
        v-for="link in links"
        :key="link.name"
        class="hover:bg-primary/10 cursor-pointer transition ease-in-out"
      >
        <nuxt-link :to="link.href">
          <span class="flex items-center gap-2">
            {{ link.name }}
            <icon :name="link.icon" />
          </span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
const links = [
  { name: "Claim", icon: "mdi:hand-back-right", href: "/claim" },
  {
    name: "Distribute",
    icon: "mdi:credit-card-edit-outline",
    href: "/distribute",
  },
];
</script>
<style>
a.router-link-exact-active {
  @apply !text-white;
}
</style>
