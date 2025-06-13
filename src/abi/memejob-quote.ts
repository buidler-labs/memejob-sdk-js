export default [
  {
    type: "function",
    name: "getAmountOut",
    inputs: [
      { name: "_memeAddress", type: "address", internalType: "address" },
      { name: "_amount", type: "uint256", internalType: "uint256" },
      {
        name: "_txType",
        type: "uint8",
        internalType: "enum IMemeJob.TransactionType",
      },
    ],
    outputs: [{ name: "value", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
];
