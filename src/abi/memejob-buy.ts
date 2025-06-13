export default [
  {
    type: "function",
    name: "buyJob",
    inputs: [
      { name: "memeAddress", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
      { name: "referrer", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
];
