import "@polkadot/api-augment";
import type { ApiPromise } from "@polkadot/api";

export async function nextCollectionId(api: ApiPromise) {
  try {
    const result = await api.query.nfts.nextCollectionId();

    return result.unwrap().toNumber();
  } catch (error) {
    console.error("Error getting collection id", error);
    return undefined;
  }
}

export async function latestBlock(api: ApiPromise) {
  try {
    const result = await api.rpc.chain.getHeader();

    return result.number.toNumber();
  } catch (error) {
    console.error("Error getting collection id", error);
    return undefined;
  }
}
