//AbiItem: 스마트 컨트랙의 인터페이스가 정의된 파일
import { AbiItem } from "web3-utils";
import Web3 from "web3";

const mintKallosTokenAbi: AbiItem[] = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
<<<<<<< HEAD
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
=======
>>>>>>> 635723131f3a768170a6e5b4bbc84a7a1eb2009d
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
<<<<<<< HEAD
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
    ],
    name: "mintKallosToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
=======
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "kallosTypes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "mintKallosToken",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
>>>>>>> 635723131f3a768170a6e5b4bbc84a7a1eb2009d
    type: "function",
  },
  {
    inputs: [],
<<<<<<< HEAD
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
=======
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
>>>>>>> 635723131f3a768170a6e5b4bbc84a7a1eb2009d
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
<<<<<<< HEAD
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
=======
>>>>>>> 635723131f3a768170a6e5b4bbc84a7a1eb2009d
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
<<<<<<< HEAD
=======
    inputs: [],
    name: "saleKallosToken",
    outputs: [
      {
        internalType: "contract SaleKallosToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
>>>>>>> 635723131f3a768170a6e5b4bbc84a7a1eb2009d
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
<<<<<<< HEAD
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
=======
        name: "tokenId",
>>>>>>> 635723131f3a768170a6e5b4bbc84a7a1eb2009d
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
<<<<<<< HEAD
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenURIs",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
=======
>>>>>>> 635723131f3a768170a6e5b4bbc84a7a1eb2009d
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
<<<<<<< HEAD
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
=======
>>>>>>> 635723131f3a768170a6e5b4bbc84a7a1eb2009d
];
const saleKallosTokenAbi: AbiItem[] = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_mintKallosTokenAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getOnSaleKallosToken",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_kallosTokenId",
        type: "uint256",
      },
<<<<<<< HEAD
    ],
    name: "getTokenPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
=======
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "setForSaleKallosToken",
    outputs: [],
    stateMutability: "nonpayable",
>>>>>>> 635723131f3a768170a6e5b4bbc84a7a1eb2009d
    type: "function",
  },
  {
    inputs: [
      {
<<<<<<< HEAD
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "kallosTokenPrices",
=======
        internalType: "address",
        name: "_mintKallosTokenAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_kallosTokenId",
        type: "uint256",
      },
    ],
    name: "getKallosTokenPrice",
>>>>>>> 635723131f3a768170a6e5b4bbc84a7a1eb2009d
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
<<<<<<< HEAD
    name: "mintKallosTokenAddress",
    outputs: [
      {
        internalType: "contract MintKallosToken",
        name: "",
        type: "address",
=======
    name: "getOnSaleKallosTokenArrayLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
>>>>>>> 635723131f3a768170a6e5b4bbc84a7a1eb2009d
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
<<<<<<< HEAD
    name: "onSaleKallosToken",
=======
    name: "kallosTokenPrices",
>>>>>>> 635723131f3a768170a6e5b4bbc84a7a1eb2009d
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
<<<<<<< HEAD
    inputs: [
      {
        internalType: "uint256",
        name: "_kallosTokenId",
        type: "uint256",
      },
    ],
    name: "purchaseKallosToken",
    outputs: [],
    stateMutability: "payable",
=======
    inputs: [],
    name: "mintKallosTokenAddress",
    outputs: [
      {
        internalType: "contract MintKallosToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
>>>>>>> 635723131f3a768170a6e5b4bbc84a7a1eb2009d
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
<<<<<<< HEAD
        name: "_kallosTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "setForSaleKallosToken",
    outputs: [],
    stateMutability: "nonpayable",
=======
        name: "",
        type: "uint256",
      },
    ],
    name: "onSaleKallosTokenArray",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
>>>>>>> 635723131f3a768170a6e5b4bbc84a7a1eb2009d
    type: "function",
  },
];

const getKallosTokenAbi: AbiItem[] = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_mintKallosToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_saleKallosToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenOwner",
        type: "address",
      },
    ],
    name: "getKallosTokens",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
        ],
        internalType: "struct GetKallosToken.KallosTokenData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSaleKallosTokens",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
        ],
        internalType: "struct GetKallosToken.KallosTokenData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintKallosToken",
    outputs: [
      {
        internalType: "contract MintKallosToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "saleKallosToken",
    outputs: [
      {
        internalType: "contract SaleKallosToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const mintKallosTokenAddress = "0x45Af8D9c230237a6B413B5cf47CF93Eed107C53C";

export const saleKallosTokenAddress =
  "0x7914C75227c4c742cbD3d385Be2e3e46109cD842";

export const getKallosTokenAddress =
  "0xBa04092057010b729fc55aD2aaCF31dafF82b70c";

declare global {
  interface Window {
    ethereum: any;
  }
}

//web3 연결
export const web3 = new Web3(
  typeof window !== "undefined" ? window.ethereum : null
);
export const mintKallosTokenContract = new web3.eth.Contract(
  mintKallosTokenAbi,
  mintKallosTokenAddress
);
export const saleKallosTokenContract = new web3.eth.Contract(
  saleKallosTokenAbi,
  saleKallosTokenAddress
);

export const getKallosTokenContract = new web3.eth.Contract(
  getKallosTokenAbi,
  getKallosTokenAddress
);
