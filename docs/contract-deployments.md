# Contract Deployments

The SDK provides a default export containing pre-configured contract deployment details for both mainnet and testnet environments.

These values include:

- The Hedera Contract ID, used for NativeAdapter operations.
- The EVM-compatible address, for interacting via EvmAdapter

## Usage

You can directly import the deployment configuration from the SDK:

```typescript
import { CONTRACT_DEPLOYMENTS } from "@buidlerlabs/memejob-sdk-js";
import { ContractId } from "@hashgraph/sdk";

// Retrieve the contract ID for testnet
const contractId = ContractId.fromString(
  CONTRACT_DEPLOYMENTS.testnet.contractId
);

// You can also access the EVM-compatible address
const evmAddress = CONTRACT_DEPLOYMENTS.testnet.evmAddress;
```

## Configuration

The `CONTRACT_DEPLOYMENTS` object exposes deployment addresses for each supported network:

```typescript
export const CONTRACT_DEPLOYMENTS = {
  /** Mainnet deployment */
  mainnet: {
    /** Contract ID */
    contractId: "0.0.7891970",
    /** EVM-compatible contract address */
    evmAddress: "0x950230ea77dc168df543609c2349c87dea57e876",
  },
  /** Testnet deployment */
  testnet: {
    /** Contract ID */
    contractId: "0.0.5271847",
    /** EVM-compatible contract address */
    evmAddress: "0xa3bf9adec2fb49fb65c8948aed71c6bf1c4d61c8",
  },
};
```
