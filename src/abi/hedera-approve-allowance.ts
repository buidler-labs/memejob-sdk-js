export default [
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "response",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
