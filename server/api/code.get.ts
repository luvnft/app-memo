import { $purify as purify } from "@kodadot1/minipfs";

const RUNTIME_CONFIG = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const [data, err] = await fetch(
    `${RUNTIME_CONFIG.apiUrl}/poaps/${query.code}`,
  )
    .then((r) => r.json())
    .then((r) => [r, null])
    .catch((r) => [null, r]);

  if (err) {
    throw new Error("An unknown error has occoured");
  }

  return {
    ...data,
    imageSrc: purify(data?.image).at(0),
  };
});
