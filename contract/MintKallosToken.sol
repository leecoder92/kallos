// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintKallosToken is ERC721Enumerable, Ownable {
    constructor(string memory _name, string memory _symbol) ERC721("kallos", "") {}
    
    mapping(uint => string) public tokenURIs;

    function tokenURI(uint _tokenId) override public view returns (string memory) {
        return string(
            abi.encodePacked(tokenURIs[_tokenId])
        );
    }

    function mintKallosToken(string memory _tokenURI) public onlyOwner {
        uint tokenId = totalSupply() + 1;

        tokenURIs[tokenId] = _tokenURI;
        
        _mint(owner(), tokenId);
    }
}