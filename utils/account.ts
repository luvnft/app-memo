import { encodeAddress } from "@polkadot/util-crypto";

export const toDefaultAddress = (address: string) => {
  // const address = accountToAddress(account)
  if (/^5/.test(address)) {
    return address;
  }
  return encodeAddress(address);
};
