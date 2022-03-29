// SPDX-License-Identifier: MIT

// 컴파일러 버전
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./SaleKallosToken.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MintKallosToken is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _kallosTokenIds;

    constructor() ERC721("kallos", "kal") {}


    SaleKallosToken public saleKallosToken;

    mapping(uint256 => uint256) public kallosTypes;

    struct KallosTokenData {
        uint256 kallosTokenId;
        uint256 kallosType;
        uint256 kallosPrice;
        
    }

    function mintKallosToken(string memory tokenURI) public returns (uint256) {

        _kallosTokenIds.increment();
        uint256 newItemId = _kallosTokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    // function getKallosToken(address _kallosTokenOwner)
    //     public
    //     view
    //     returns (KallosTokenData[] memory)
    // {
    //     uint256 balanceLength = balanceOf(_kallosTokenOwner);

    //     require(balanceLength != 0, "Owner did not have token");

    //     KallosTokenData[] memory kallosTokenData = new KallosTokenData[](
    //         balanceLength
    //     );

    //     for (uint256 i = 0; i < balanceLength; i++) {
    //         uint256 kallosTokenId = tokenOfOwnerByIndex(_kallosTokenOwner, i);
    //         uint256 kallosType = kallosTypes[kallosTokenId];
    //         uint256 kallosPrice = saleKallosToken.getKallosTokenPrice(
    //             kallosTokenId
    //         );

    //         kallosTokenData[i] = KallosTokenData(
    //             kallosTokenId,
    //             kallosType,
    //             kallosPrice
    //         );
    //     }
    //     return kallosTokenData;
    // }

    // function setSaleKallosToken(address _saleKallosToken) public {
    //     saleKallosToken = SaleKallosToken(_saleKallosToken);
    // }
}