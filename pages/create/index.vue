<template>
  <div class="mx-auto flex max-w-4xl flex-col space-y-7 px-4 pt-8">
    <h1 class="text-4xl font-extrabold text-text-color">Distribution Tool</h1>

    <div class="grid grid-cols-3 gap-8">
      <div class="col-span-1">
        <dot-image-input />
      </div>
      <div class="col-span-2 space-y-8">
        <dot-label text="POAP title">
          <dot-text-input
            :limit="150"
            type="text"
            placeholder="Lorem ipsum dolor sit"
          />
        </dot-label>
        <dot-label text="POAP description">
          <dot-text-input placeholder="Lorem ipsum dolor sit" />
        </dot-label>
        <dot-label text="Website description">
          <dot-text-input placeholder="https://" />
        </dot-label>
        <div class="grid grid-cols-2 gap-8">
          <dot-label text="Start date">
            <dot-text-input v-model="startDate" type="date" />
          </dot-label>
          <dot-label text="End">
            <dot-text-input v-model="endDate" type="date" />
          </dot-label>
        </div>
        <dot-label text="Quantity">
          <dot-text-input v-model="quantity" type="number" placeholder="0" />
          <div class="flex gap-2">
            <dot-button
              class="flex-1"
              size="small"
              variant="secondary-rounded"
              @click="quantity -= 100"
            >
              -100
            </dot-button>
            <dot-button
              class="flex-1"
              size="small"
              variant="secondary-rounded"
              @click="quantity -= 10"
            >
              -10
            </dot-button>
            <dot-button
              class="flex-1"
              size="small"
              variant="secondary-rounded"
              @click="quantity -= 1"
            >
              -1
            </dot-button>
            <dot-button
              class="flex-1"
              size="small"
              variant="secondary-rounded"
              @click="quantity = 0"
              >0
            </dot-button>
            <dot-button
              class="flex-1"
              size="small"
              variant="secondary-rounded"
              @click="quantity += 1"
            >
              +1
            </dot-button>
            <dot-button
              class="flex-1"
              size="small"
              variant="secondary-rounded"
              @click="quantity += 10"
            >
              +10
            </dot-button>
            <dot-button
              class="flex-1"
              size="small"
              variant="secondary-rounded"
              @click="quantity += 100"
            >
              +100
            </dot-button>
          </div>
        </dot-label>
        <dot-label text="POAP Secret">
          <dot-text-input placeholder="event2024" />
        </dot-label>
      </div>
    </div>
    <dot-button size="large" variant="primary-shadow" class="w-full">
      Create
    </dot-button>
  </div>
</template>

<script lang="ts" setup>
const startDate = ref(new Date());
const endDate = ref(new Date());
const quantity = ref(0);
</script>
