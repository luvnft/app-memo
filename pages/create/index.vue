<template>
  <form class="mx-auto flex max-w-4xl flex-col space-y-7 px-4 pt-8" @submit="onSubmit">
    <h1 class="text-4xl font-extrabold text-text-color">Distribution Tool</h1>

    <div class="grid grid-cols-3 gap-8">
      <div class="col-span-1">
        <dot-image-input v-model="image" :error="imageError" />
      </div>
      <div class="col-span-2 space-y-3">
        <dot-label text="POAP title">
          <dot-text-input
            v-model="title"
            :limit="150"
            type="text"
            placeholder="XYZ Event Collection"
            :error="titleError"
          />
        </dot-label>
        <dot-label text="POAP description">
          <dot-text-area
            v-model="description"
            :limit="150"
            placeholder="Describe your POAP. These description will be displayed for all POAP users."
            :error="descriptionError"
          />
        </dot-label>
        <dot-label text="Website address">
          <dot-text-input v-model="websiteAddress" placeholder="https://" :error="websiteAddressError" />
        </dot-label>
        <div class="grid grid-cols-2 gap-8">
          <dot-label text="Start date">
            <dot-text-input v-model="startDate" type="date" :error="startDateError || localStartDateError" />
          </dot-label>
          <dot-label text="End">
            <dot-text-input v-model="endDate" type="date" :error="endDateError || localEndDateError" />
          </dot-label>
        </div>
        <dot-label text="Quantity">
          <dot-text-input v-model.number="quantity" type="number" placeholder="0" :error="quantityError" />
          <div class="flex gap-2">
            <dot-button class="flex-1" size="small" variant="secondary-rounded" @click="quantity -= 100">
              -100
            </dot-button>
            <dot-button class="flex-1" size="small" variant="secondary-rounded" @click="quantity -= 10">
              -10
            </dot-button>
            <dot-button class="flex-1" size="small" variant="secondary-rounded" @click="quantity -= 1"> -1 </dot-button>
            <dot-button class="flex-1" size="small" variant="secondary-rounded" @click="quantity = 0">0 </dot-button>
            <dot-button class="flex-1" size="small" variant="secondary-rounded" @click="quantity += 1"> +1 </dot-button>
            <dot-button class="flex-1" size="small" variant="secondary-rounded" @click="quantity += 10">
              +10
            </dot-button>
            <dot-button class="flex-1" size="small" variant="secondary-rounded" @click="quantity += 100">
              +100
            </dot-button>
          </div>
        </dot-label>
        <dot-label text="POAP Secret">
          <dot-text-input placeholder="event2024" />
        </dot-label>
      </div>
    </div>
    <dot-button :disabled="!isSubmittable" size="large" submit variant="primary-shadow" class="w-full">
      Create
    </dot-button>
  </form>
</template>

<script lang="ts" setup>
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";

const validationSchema = toTypedSchema(
  zod.object({
    image: zod.instanceof(File).refine((value) => value.size < 5 * 1024 * 1024, {
      message: "Image size must be less than 5MB",
    }),
    title: zod.string({ message: "Title is required" }).min(1, { message: "Title is required" }),
    description: zod.string().optional(),
    websiteAddress: zod.string().url({ message: "URL has invalid format" }).optional(),
    startDate: zod.date({ message: "Start date is required" }),
    endDate: zod.date({ message: "End date is required" }),
    quantity: zod.number({ message: "Quantity is required" }).positive({ message: "Quantity must be positive" }),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema,
  initialValues: {
    quantity: 1,
  },
});

const { value: image, errorMessage: imageError } = useField<File>("image");
const { value: title, errorMessage: titleError } = useField<string>("title");
const { value: description, errorMessage: descriptionError } = useField<string>("description");
const { value: websiteAddress, errorMessage: websiteAddressError } = useField<string>("websiteAddress");
const { value: startDate, errorMessage: startDateError } = useField<Date>("startDate");
const localStartDateError = ref<string>("");
const { value: endDate, errorMessage: endDateError } = useField<Date>("endDate");
const localEndDateError = ref<string>("");
const { value: quantity, errorMessage: quantityError } = useField<number>("quantity");

// As `refine` doesnt work with `toTypedSchema` we need to do this manually
watch([startDate, endDate], ([startDate, endDate]) => {
  if (startDate > endDate) {
    localStartDateError.value = "Start date must be before end date";
    localEndDateError.value = "End date must be after start date";
  } else {
    localStartDateError.value = "";
    localEndDateError.value = "";
  }
});

const logger = createLogger("CreatePage");

const onSubmit = handleSubmit(({ description, endDate, image, quantity, startDate, title, websiteAddress }) => {
  if (localStartDateError.value || localEndDateError.value) {
    return;
  }
  logger.success({
    description,
    endDate,
    quantity,
    startDate,
    image,
    title,
    websiteAddress,
  });
});

const isSubmittable = computed(
  () =>
    image.value &&
    title.value &&
    startDate.value &&
    endDate.value &&
    quantity.value &&
    !localStartDateError.value &&
    !localEndDateError.value &&
    !Object.keys(errors.value).length,
);
</script>
