import type {
  InjectedAccount,
  InjectedExtension,
  InjectedMetadata,
  InjectedProvider,
  InjectedWindow,
} from "@polkadot/extension-inject/types";
import type { Signer as InjectedSigner } from "@polkadot/api/types";

import { formatAccount } from "@/utils/account";
import type { SubscriptionFn, Wallet, WalletConfig } from "./config";

const DAPP_NAME = ".MEMO";

const logger = createLogger("wallet");

export class BaseDotsamaWallet implements Wallet {
  img = "";
  name = "";
  extensionName = "";
  source = "";
  walletUrl = "";
  guideUrl = "";
  isMobileApp = false;
  isBrowserExtension = false;

  constructor(config?: WalletConfig) {
    if (config) {
      this.img = config.img;
      this.name = config.name;
      this.extensionName = config.extensionName;
      this.source = config.source;
      this.walletUrl = config.walletUrl;
      this.guideUrl = config.guideUrl;
      this.isMobileApp = config.isMobileApp;
      this.isBrowserExtension = config.isBrowserExtension;
    }
  }

  _extension: InjectedExtension | undefined;
  _signer: InjectedSigner | undefined;
  _metadata: InjectedMetadata | undefined;
  _provider: InjectedProvider | undefined;
  // API docs: https://polkadot.js.org/docs/extension/
  get extension() {
    return this._extension;
  }

  // API docs: https://polkadot.js.org/docs/extension/
  get signer() {
    return this._signer;
  }

  get metadata() {
    return this._metadata;
  }

  get provider() {
    return this._provider;
  }

  get installed() {
    const injectedWindow = window as Window & InjectedWindow;
    const injectedExtension = injectedWindow?.injectedWeb3?.[this.source];

    return Boolean(injectedExtension);
  }

  get rawExtension() {
    const injectedWindow = window as Window & InjectedWindow;
    const injectedExtension = injectedWindow?.injectedWeb3?.[this.source];
    return injectedExtension;
  }

  enable = async () => {
    if (!this.installed) {
      return;
    }

    try {
      const injectedExtension = this.rawExtension;
      const rawExtension = await injectedExtension.enable?.(DAPP_NAME);
      if (!rawExtension) {
        return;
      }

      const extension: InjectedExtension = {
        ...rawExtension,
        // Manually add `InjectedExtensionInfo` so as to have a consistent response.
        name: this.extensionName,
        version: injectedExtension.version!,
      };

      this._extension = extension;
      this._signer = extension.signer;
      this._metadata = extension.metadata;
      this._provider = extension.provider;
    } catch (err) {
      logger.error("[ENABLE] Unable to enable :)");
    }
  };

  subscribeAccounts = async (callback: SubscriptionFn) => {
    if (!this._extension) {
      await this.enable();
    }

    if (!this._extension) {
      callback(undefined);
      return null;
    }
    if (!this._extension.accounts.subscribe) {
      return null;
    }
    const unsubscribe = this._extension.accounts.subscribe((accounts: InjectedAccount[]) => {
      const accountsWithWallet = this.accountMap(accounts);
      callback(accountsWithWallet);
    });
    return unsubscribe;
  };

  getAccounts = async (): Promise<ExtendedDotsamaAccount[] | null> => {
    if (!this._extension) {
      await this.enable();
    }

    if (!this._extension) {
      return null;
    }

    const accounts = await this._extension.accounts.get();

    return this.accountMap(accounts);
  };

  getSubstrateAccounts = (accounts: InjectedAccount[]) =>
    accounts.filter((account) => isValidSubstrateAddress(account.address));

  accountMap = (accounts: InjectedAccount[]): ExtendedDotsamaAccount[] =>
    this.getSubstrateAccounts(accounts).map((account) => {
      account.address = formatAccount(account.address);
      return {
        ...account,
        source: this._extension?.name as string,
        // Added extra fields here for convenience
        wallet: this,
        signer: this._extension?.signer,
      };
    });
}

export type ExtendedDotsamaAccount = InjectedAccount & {
  source: string;
  wallet: BaseDotsamaWallet;
  signer?: InjectedSigner;
};
