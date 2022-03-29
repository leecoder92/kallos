// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "MintKallosToken.sol";

contract SaleKallosToken {
    MintKallosToken public mintKallosTokenAddress;

    constructor(address _mintKallosTokenAddress) {
        mintKallosTokenAddress = MintKallosToken(_mintKallosTokenAddress);
    }

    mapping(uint256 => uint256) public kallosTokenPrices;

    uint256[] public onSaleKallosToken;

    function setForSaleKallosToken(uint256 _kallosTokenId, uint256 _price)
        public
    {
        address kallosTokenOwner = mintKallosTokenAddress.ownerOf(
            _kallosTokenId
        );

        require(
            kallosTokenOwner == msg.sender,
            "Caller is not kallosToken owner."
        );
        require(_price > 0, "Price is zero is lower.");
        require(
            kallosTokenPrices[_kallosTokenId] == 0,
            "This kallos token is already on sale."
        );
        require(
            mintKallosTokenAddress.isApprovedForAll(kallosTokenOwner, address(this)),
            "Kallos token owner did not approve token."
        );

        kallosTokenPrices[_kallosTokenId] = _price;

        onSaleKallosToken.push(_kallosTokenId);
    }

    function purchaseKallosToken(uint256 _kallosTokenId) public payable {
        uint256 price = kallosTokenPrices[_kallosTokenId];
        address kallosTokenOwner = mintKallosTokenAddress.ownerOf(_kallosTokenId);

        require(price > 0, "This kallos token not sale.");
        require(price <= msg.value, "Caller sent lower than price.");
        require(
            kallosTokenOwner != msg.sender,
            "Caller is kallos token owner."
        );

        payable(kallosTokenOwner).transfer(msg.value);
        mintKallosTokenAddress.safeTransferFrom(
            kallosTokenOwner,
            msg.sender,
            _kallosTokenId
        );

        kallosTokenPrices[_kallosTokenId] = 0;

        for (uint256 i = 0; i < onSaleKallosToken.length; i++) {
            if (kallosTokenPrices[onSaleKallosToken[i]] == 0) {
                onSaleKallosToken[i] = onSaleKallosToken[
                    onSaleKallosToken.length - 1
                ];
                onSaleKallosToken.pop();
            }
        }
    }

    function getTokenPrice(uint256 _kallosTokenId)
        public
        view
        returns (uint256)
    {
        return kallosTokenPrices[_kallosTokenId];
    }

    function getOnSaleKallosToken() public view returns (uint256[] memory) {
        return onSaleKallosToken;
    }
}
