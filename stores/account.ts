import { defineStore } from "pinia";
import type { Account } from "~/types/web3";

interface StoreState {
  accounts: Account[];
  selected: Account | null;
}

export const useAccountStore = defineStore({
  id: "account",
  state: (): StoreState => ({
    accounts: [],
    selected: null,
  }),
  actions: {
    setAccounts(accounts: Account[]) {
      this.accounts = accounts;
    },
    selectAccount(account: Account) {
      this.selected = account;
    },
  },

  getters: {
    hasSelectedAccount: (state) => !!state.selected,
    shortAddress: (state) => {
      if (!state.selected) return "";
      return addressShortener(state.selected.address);
    },
  },
});
