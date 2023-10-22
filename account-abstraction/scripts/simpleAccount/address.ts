import { ethers } from "ethers";
import { Presets } from "userop";
// @ts-ignore
import config from "../../config.json";

export default async function main(sgk: string) {
  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    new ethers.Wallet(sgk), // sgk = signingKey
    config.rpcUrl,
  );
  const address = simpleAccount.getSender();

  console.log(`SimpleAccount address: ${address}`);
  return address;
}
