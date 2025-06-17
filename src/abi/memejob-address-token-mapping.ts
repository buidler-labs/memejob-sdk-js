export default [
  {
    type: "function",
    name: "addressToMemeTokenMapping",
    inputs: [{ name: "token", type: "address", internalType: "address" }],
    outputs: [
      { name: "tokenAddress", type: "address", internalType: "address" },
      { name: "creatorAddress", type: "address", internalType: "address" },
      { name: "fundsRaised", type: "uint256", internalType: "uint256" },
      { name: "tokensSold", type: "uint256", internalType: "uint256" },
      { name: "firstBuyer", type: "address", internalType: "address" },
      { name: "distributeRewards", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
];
