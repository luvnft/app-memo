const RUNTIME_CONFIG = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  // const { image, name, description, externalUrl, startDate, endDate, quantity, secret, chain, collection } =
  //   await readBody(event);

  const { secret, mint, collection, chain } = await readBody(event);

  const [data, err] = await $fetch(`${RUNTIME_CONFIG.apiUrl}/poaps`, {
    method: "POST",
    body: {
      id: secret,
      chain,
      collection,
      table_ref: `poaps_${secret.toLowerCase()}`,
      mint,
    },
  })
    .then((r) => [r, null])
    .catch((r) => [null, r]);

  if (err) {
    console.error(err);
    throw new Error("An unknown error has occoured");
  }

  return data;
});
