export default [
  {
    type: "function",
    name: "memeJob",
    inputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "symbol", type: "string", internalType: "string" },
      { name: "memo", type: "string", internalType: "string" },
      { name: "referrer", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "distributeRewards", type: "bool", internalType: "bool" },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "payable",
  },
];
