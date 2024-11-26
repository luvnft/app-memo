const logger = createLogger("middleware:user.global");
export default defineNuxtRouteMiddleware(() => {
  const accountStore = useAccountStore();
  if (accountStore.hasSelectedAccount) {
    return;
  }
  const account = localStorage.getItem("account");
  if (account) {
    try {
      accountStore.selectAccount(JSON.parse(account));
    } catch (e) {
      logger.error(e);
    }
  }
});
