import { AccountId, ContractId, TokenId } from "@hashgraph/sdk";
import { isAddress } from "viem";

export function toEvmAddress(
  value: AccountId | TokenId | ContractId
): `0x${string}` {
  return `0x${value.toSolidityAddress()}`;
}

export function isEvmAddress(value: AccountId | TokenId | ContractId) {
  const address = `0x${value.toSolidityAddress()}`;

  return !address.startsWith("0x0000000000") && isAddress(address);
}

export function isNativeAddress(value: AccountId | TokenId | ContractId) {
  return /0\.0\.\d+/i.test(value.toString());
}
