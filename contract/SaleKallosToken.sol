// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "MintKallosToken.sol";

contract SaleKallosToken {
    MintKallosToken public mintKallosTokenAddress;

    constructor(address _mintKallosTokenAddress) {
        mintKallosTokenAddress = MintKallosToken(_mintKallosTokenAddress);
    }

    //왼 uint256: _kallosTokenId(토큰아이디), 오 uint256: kallosTokenPrices(토큰 가격)
    //토큰 아이디 조회 시 토큰 가격 반환
    mapping(uint256 => uint256) public kallosTokenPrices;

    //FE에서 어떤 것들을 판매중인지 보여주기 위해 토큰아이디들을 저장해 둘 배열
    uint256[] public onSaleKallosTokenArray;

    //_kallosTokenId: 뭘 팔건지, _price: 얼마에 팔건지
    function setForSaleKallosToken(uint256 _kallosTokenId, uint256 _price)
        public
    {
        //팔려는 것의 주인의 주소 반환
        address kallosTokenOwner = mintKallosTokenAddress.ownerOf(
            _kallosTokenId
        );

        //주인이 맞는 지 확인하여 false라면 Caller ~ 메시지 출력
        require(
            kallosTokenOwner == msg.sender,
            "Caller is not kallos token owner."
        );

        //판매 가격이 0 이상인지 체크
        require(_price > 0, "Price is zero or lower.");

        //매핑함수로 토큰 아이디에 해당하는 토큰 가격 반환하여 체크
        require(
            kallosTokenPrices[_kallosTokenId] == 0,
            "This kallos token is already on sale."
        );

        //isApprovedForAll: 현재 토큰의 주인(kallosTokenOwner)이 판매 계약(address(this))을 넘겼는지 체크
        //why? 스마트 컨트랙이 파일이기 때문에 엉뚱한 컨트랙이 와서 그곳에 코인이나 NFT가 저장될 경우 찾을 수 없는 상황이 될 수도 있기 때문
        require(
            mintKallosTokenAddress.isApprovedForAll(
                kallosTokenOwner,
                address(this)
            ),
            "Kallos token owner did not approve token."
        );

        //매핑에 토큰아이디에 해당하는 가격 set
        kallosTokenPrices[_kallosTokenId] = _price;

        //판매 중인 상품 배열에 토큰 아이디 추가
        onSaleKallosTokenArray.push(_kallosTokenId);
    }

    function purchaseKallosToken(uint256 _kallosTokenId) public payable {
        //매핑함수로 토큰 아이디에 해당하는 가격 반환
        uint256 price = kallosTokenPrices[_kallosTokenId];

        //판매 상품의 주인(의 주소) 반환
        address kallosTokenOnwer = mintKallosTokenAddress.ownerOf(
            _kallosTokenId
        );

        // 상품의 가격이 0 이상인지 체크
        require(price > 0, "Kallos token not sale.");

        //msg.value: 송금한 코인의 값
        //구매자가 송금한 가격이 판매가보다 크거나 같은지 체크
        require(price <= msg.value, "Caller sent lower than price.");

        //요청(여기서는 구매요청)인이 주인과 같은 사람인지 체크
        require(
            kallosTokenOnwer != msg.sender,
            "Caller is kallos token owner."
        );

        //현재 함수(purchaseKallosToken)를 실행한 사람(msg.sender)이 송금한 금액(msg.value)만큼 상품의 주인(kallosTokenOnwer)에게 감
        payable(kallosTokenOnwer).transfer(msg.value);

        //safeTransferFrom(보내는사람, 받는사람, 보낼 상품의 토큰 아이디)
        //받는 사람에게 상품이 전달됨
        mintKallosTokenAddress.safeTransferFrom(
            kallosTokenOnwer,
            msg.sender,
            _kallosTokenId
        );

        //매핑에서 해당(방금 거래된) 상품의 토큰아이디에 해당하는 가격을 0으로 초기화(팔렸으니까)
        kallosTokenPrices[_kallosTokenId] = 0;

        //판매중인 상품목록(배열 onSaleKallosTokenArray)에서 제거
        for (uint256 i = 0; i < onSaleKallosTokenArray.length; i++) {
            //팔린 상품의 가격을 위에서 0으로 초기화 해주었으므로 가격이 0인 상품을 찾아서 제거해주면 됨
            if (kallosTokenPrices[onSaleKallosTokenArray[i]] == 0) {
                //배열 맨 뒤에 배치된 상품을 현재 팔린 상품의 자리에 배치하고
                onSaleKallosTokenArray[i] = onSaleKallosTokenArray[
                    onSaleKallosTokenArray.length - 1
                ];
                //pop으로 배열 맨 뒤 상품 제거
                onSaleKallosTokenArray.pop();
            }
        }
    }

    //FE를 위한 로직
    //판매 상품 배열 길이 조회
    function getOnSaleKallosTokenArrayLength() public view returns (uint256) {
        return onSaleKallosTokenArray.length;
    }

    //상품에 해당하는 가격 조회
    function getKallosTokenPrice(uint256 _kallosTokenId)
        public
        view
        returns (uint256)
    {
        return kallosTokenPrices[_kallosTokenId];
    }
}
