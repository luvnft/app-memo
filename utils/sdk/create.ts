import type { ApiPromise } from "@polkadot/api";
import { nextCollectionId } from "./query";
import { MEMO_BOT } from "./constants";
import { asBalanceTransferAlive, type Extrinsic } from "@kodadot1/sub-api";

/** @name PalletNftsCollectionConfig (356) */
interface PalletNftsCollectionConfig {
  readonly settings: number;
  readonly maxSupply?: number;
  readonly mintSettings: PalletNftsMintSettings;
}

/** @name PalletNftsMintSettings (359) */
interface PalletNftsMintSettings {
  readonly mintType: { Issuer: null } | { Public: null } | { HolderOf: number };
  readonly price?: number;
  readonly startBlock?: number;
  readonly endBlock?: number;
  readonly defaultItemSettings: number;
}

/**
 * Creates arguments for creating an NFT collection.
 * @param account - The owner's account address.
 * @param maxSupply - Optional maximum supply for the collection.
 * @returns A tuple containing the account and collection configuration.
 */
export function createArgsForNftPallet(
  account: string,
  maxSupply?: number
): [string, PalletNftsCollectionConfig] {
  const config: PalletNftsCollectionConfig = {
    settings: 0,
    maxSupply: maxSupply ?? 0, // Fallback to 0 if undefined
    mintSettings: {
      mintType: { Issuer: null },
      defaultItemSettings: 0,
    },
  };
  return [account, config];
}

/**
 * Creates a new collection using the NFT pallet.
 */
export const createCollection = (api: ApiPromise, owner: string) => {
  const args = createArgsForNftPallet(owner);
  const create = api.tx.nfts.create(...args);
  return create;
};

/**
 * Sets the maximum supply of a collection.
 */
export const setMaxSupply = (
  api: ApiPromise,
  collectionId: string,
  metadata: string
) => {
  const set = api.tx.nfts.setCollectionMetadata(collectionId, metadata);
  return set;
};

/**
 * Team type for setting collection team members.
 */
type Team = {
  issuer: string;
  admin: string;
  freezer: string;
};

/**
 * Sets the team members for a collection.
 */
export const setTeam = (api: ApiPromise, collectionId: string, team: Team) => {
  const set = api.tx.nfts.setTeam(
    collectionId,
    team.issuer,
    team.admin,
    team.freezer
  );
  return set;
};

/**
 * Sets metadata for a collection's max supply.
 */
export const setCollectionMetadata = (
  api: ApiPromise,
  collectionId: string,
  maxSupply: number | bigint
) => {
  const supply = BigInt(maxSupply); // Ensure consistent type
  const set = api.tx.nfts.setCollectionMaxSupply(collectionId, supply);
  return set;
};

/**
 * Builds a batch of extrinsic calls.
 */
export const buildBatch = (api: ApiPromise, calls: Extrinsic[]) => {
  const batch = api.tx.utility.batchAll(calls);
  batch.catch((error) => {
    console.error("Batch failed:", error);
  });
  return batch;
};

/**
 * Creates a balance transfer transaction.
 */
export const transferUs = (api: ApiPromise, amount: number) => {
  const transfer = asBalanceTransferAlive(api, MEMO_BOT, amount);
  return transfer;
};

/**
 * Builds a memo transaction for the next collection.
 */
export const buildMemo = async (
  api: ApiPromise,
  account: string,
  max: number
) => {
  const nextId = await nextCollectionId(api);
  if (!nextId) {
    console.error("nextCollectionId failed to fetch.");
    throw new Error("Could not get next collection id");
  }

  console.log("nextId", nextId.toString());

  const create = createCollection(api, account);
  const setMax = setMaxSupply(api, nextId.toString(), String(max));

  // Optionally add more transactions if needed
  // const metadata = setCollectionMetadata(api, nextId.toString(), max);
  // const team = setTeam(api, nextId.toString(), {
  //   issuer: account,
  //   admin: account,
  //   freezer: account,
  // });

  return [create, setMax];
};
