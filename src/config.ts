/**
 * Memejob Deployment addresses and contract IDs.
 */
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

/** Default token creation fee in HBAR units. */
export const TOKEN_CREATION_FEE = 10;

/** Number of decimals supported by memejob tokens. */
export const TOKEN_DECIMALS = 8;

/** Zero address used as a default or null Ethereum address. */
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
