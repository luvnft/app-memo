const RUNTIME_CONFIG = useRuntimeConfig();

export default defineEventHandler(() => {
  return `OK - ${RUNTIME_CONFIG.apiUrl}`;
});
