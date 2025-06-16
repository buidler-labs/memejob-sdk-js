import type { AccountId, ContractId, TokenId } from "@hashgraph/sdk";
import { isAddress } from "viem";

/**
 * Converts a Hedera AccountId, TokenId, or ContractId to its EVM-compatible address string.
 * @param value - Hedera AccountId, TokenId, or ContractId
 * @returns EVM address string prefixed with '0x'
 */
export function toEvmAddress(
  value: AccountId | TokenId | ContractId
): `0x${string}` {
  return `0x${value.toSolidityAddress()}`;
}

/**
 * Checks if a given Hedera AccountId, TokenId, or ContractId corresponds to a valid non-zero EVM address.
 * @param value - Hedera AccountId, TokenId, or ContractId
 * @returns True if the address is valid and not zero-prefixed, false otherwise
 */
export function isEvmAddress(value: AccountId | TokenId | ContractId) {
  const address = `0x${value.toSolidityAddress()}`;

  return !address.startsWith("0x0000000000") && isAddress(address);
}

/**
 * Checks if a given value is a native Hedera address format (e.g., 0.0.x).
 * @param value - Hedera AccountId, TokenId, or ContractId
 * @returns True if the value matches native Hedera address pattern, false otherwise
 */
export function isNativeAddress(value: AccountId | TokenId | ContractId) {
  return /0\.0\.\d+/i.test(value.toString());
}
