// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintKallosToken is ERC721Enumerable, Ownable {
    constructor(string memory _name, string memory _symbol)
        ERC721("kallos", "KLS")
    {}

    mapping(uint256 => string) public tokenURIs;

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "https://ipfs.infura.io/ipfs/",
                    tokenURIs[_tokenId]
                )
            );
    }

    function mintKallosToken(string memory _tokenURI) public onlyOwner {
        uint256 tokenId = totalSupply() + 1;

        tokenURIs[tokenId] = _tokenURI;

        _mint(owner(), tokenId);
    }
}
