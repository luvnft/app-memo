<template>
  <input
    :id="imageInputId"
    hidden
    type="file"
    accept="image/jpeg, image/png, image/gif, image/tiff, image/webp"
    @change="previewImage"
  />

  <label :for="imageInputId">
    <div
      class="bg-k-primary/5 group relative aspect-square cursor-pointer border-2 border-dashed border-k-primary shadow-[6px_6px] shadow-k-primary hover:border-background-color-inverse hover:shadow-background-color-inverse"
    >
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <template v-if="previewImageSrc">
          <img
            :src="previewImageSrc"
            alt="submitted image preview"
            class="pointer-events-none aspect-square flex-1 object-cover p-4"
          />

          <div
            class="pointer-events-none absolute inset-0 hidden items-center justify-center bg-black/40 backdrop-blur-lg group-hover:flex"
          >
            <h1 class="px-4 text-center text-k-primary">
              Choose a different artwork
            </h1>
          </div>
        </template>

        <template v-else>
          <icon name="mdi:image" class="text-k-primary" size="64" />
          <p class="mt-2 text-center font-bold">Drop your artwork</p>
        </template>
      </div>
    </div>
  </label>
</template>

<script lang="ts" setup>
const imageInputId = crypto.randomUUID() as string;

const previewImageSrc = ref("");

function previewImage(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input?.files?.[0];

  if (!file) {
    return;
  }

  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    previewImageSrc.value = String(e.target?.result) || "";
  };
  fileReader.readAsDataURL(file);
}
</script>
