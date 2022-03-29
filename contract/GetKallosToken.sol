// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "MintKallosToken.sol";
import "SaleKallosToken.sol";

contract GetKallosToken {
    MintKallosToken public mintKallosToken;
    SaleKallosToken public saleKallosToken;

    constructor(address _mintKallosToken, address _saleKallosToken) {
        mintKallosToken = MintKallosToken(_mintKallosToken);
        saleKallosToken = SaleKallosToken(_saleKallosToken);
    }

    struct KallosTokenData {
        uint256 id;
        string uri;
        uint256 price;
    }

    function getKallosTokens(address _tokenOwner)
        public
        view
        returns (KallosTokenData[] memory)
    {
        uint256 balanceLength = mintKallosToken.balanceOf(_tokenOwner);

        require(balanceLength != 0, "Token owner did not have token.");

        KallosTokenData[] memory kallosTokens = new KallosTokenData[](
            balanceLength
        );

        for (uint256 i = 0; i < balanceLength; i++) {
            uint256 tokenId = mintKallosToken.tokenOfOwnerByIndex(
                _tokenOwner,
                i
            );
            string memory tokenURI = mintKallosToken.tokenURI(tokenId);
            uint256 tokenPrice = saleKallosToken.getTokenPrice(tokenId);

            kallosTokens[i] = KallosTokenData(tokenId, tokenURI, tokenPrice);
        }

        return kallosTokens;
    }

    function getSaleKallosTokens()
        public
        view
        returns (KallosTokenData[] memory)
    {
        uint256[] memory onSaleKallosToken = saleKallosToken
            .getOnSaleKallosToken();

        require(onSaleKallosToken.length > 0, "Not exist on sale token.");

        KallosTokenData[] memory onSaleTokens = new KallosTokenData[](
            onSaleKallosToken.length
        );

        for (uint256 i = 0; i < onSaleKallosToken.length; i++) {
            uint256 tokenId = onSaleKallosToken[i];
            string memory tokenURI = mintKallosToken.tokenURI(tokenId);
            uint256 tokenPrice = saleKallosToken.getTokenPrice(tokenId);

            onSaleTokens[i] = KallosTokenData(tokenId, tokenURI, tokenPrice);
        }

        return onSaleTokens;
    }
}
