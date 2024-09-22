export default function () {
  const config = useRuntimeConfig();

  return {
    prefix: computed(() => (config.public.chain as string) || "ahp"),
  };
}
