import type { ApiPromise } from "@polkadot/api";
import type { SubmittableExtrinsic } from "@polkadot/api/types";

function createArgsForNftPallet(
  account: string,
  maxSupply?: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): [string, any] {
  const config = {
    settings: 0,
    maxSupply,
    mintSettings: {
      mintType: { Issuer: null },
      defaultItemSettings: 0,
    },
  };
  return [account, config];
}

export const createCollection = (api: ApiPromise, owner: string) => {
  const args = createArgsForNftPallet(owner);
  const create = api.tx.nfts.create(...args);
  return create;
};

export const setMaxSupply = (api: ApiPromise, collectionId: string, maxSupply: string | number | bigint) => {
  const set = api.tx.nfts.setCollectionMaxSupply(collectionId, maxSupply);
  return set;
};

export type Extrinsic = SubmittableExtrinsic<"promise">;
export const buildBatch = (api: ApiPromise, calls: Extrinsic[]) => {
  const batch = api.tx.utility.batchAll(calls);
  return batch;
};
