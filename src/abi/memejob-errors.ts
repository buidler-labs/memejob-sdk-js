export default [
  { type: "error", name: "FailedToTransferHbar", inputs: [] },
  { type: "error", name: "FailedToTransferReferralReward", inputs: [] },
  { type: "error", name: "FundingGoalAlreadyReached", inputs: [] },
  { type: "error", name: "FundingGoalNotReached", inputs: [] },
  { type: "error", name: "InsufficientFunds", inputs: [] },
  { type: "error", name: "InsufficientTokenAllowance", inputs: [] },
  { type: "error", name: "InvalidTokenAmount", inputs: [] },
  { type: "error", name: "InvalidTransactionType", inputs: [] },
  { type: "error", name: "NotEnoughTokens", inputs: [] },
  {
    type: "error",
    name: "PRBMath_MulDiv18_Overflow",
    inputs: [
      { name: "x", type: "uint256", internalType: "uint256" },
      { name: "y", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "PRBMath_MulDiv_Overflow",
    inputs: [
      { name: "x", type: "uint256", internalType: "uint256" },
      { name: "y", type: "uint256", internalType: "uint256" },
      { name: "denominator", type: "uint256", internalType: "uint256" },
    ],
  },
  {
    type: "error",
    name: "PRBMath_UD60x18_Exp2_InputTooBig",
    inputs: [{ name: "x", type: "uint256", internalType: "UD60x18" }],
  },
  {
    type: "error",
    name: "PRBMath_UD60x18_Log_InputTooSmall",
    inputs: [{ name: "x", type: "uint256", internalType: "UD60x18" }],
  },
  {
    type: "error",
    name: "SafeAssociationFailed",
    inputs: [{ name: "responseCode", type: "int256", internalType: "int256" }],
  },
  {
    type: "error",
    name: "SafeCreateFungibleTokenFailed",
    inputs: [{ name: "responseCode", type: "int256", internalType: "int256" }],
  },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [{ name: "token", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "SafeMintFailed",
    inputs: [{ name: "responseCode", type: "int256", internalType: "int256" }],
  },
  {
    type: "error",
    name: "SafeTransferFailed",
    inputs: [{ name: "responseCode", type: "int256", internalType: "int256" }],
  },
  { type: "error", name: "SelfReferralNotAllowed", inputs: [] },
  { type: "error", name: "TooManyReferrals", inputs: [] },
  { type: "error", name: "UnknownToken", inputs: [] },
];
