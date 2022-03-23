// SPDX-License-Identifier: MIT

// 컴파일러 버전
pragma solidity ^0.8.0;

//ERC721 - NFT를 만드는 데 필요한 룰이 인터페이스로 만들어져 있는 것
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "./SaleKallosToken.sol";

//ERC721Enumerable에서 제공하는 인터페이스를 사용하기 위해 상속받음
contract MintKallosToken is ERC721Enumerable {
    //현 스마트 컨트랙이 빌드될 때 한번 실행되는 생성자
    //constructor() ERC721(name,symbol)
    constructor() ERC721("kallos", "kal") {}

    SaleKallosToken public saleKallosToken;

    //왼쪽 uint256: kallosTokenId, 오른쪽 uint256: kallosTypes
    //따라서 kallosTokenId 입력하면 kallosTypes 나오게 해줌
    //public으로 어디서든 접근 가능하도록 한다.
    mapping(uint256 => uint256) public kallosTypes;

    struct KallosTokenData {
        uint256 kallosTokenId;
        uint256 kallosType;
        uint256 kallosPrice;
    }

    function mintKallosToken() public {
        //totalSupply(): 지금까지 민팅된 nft 개수
        //예를 들어 지금까지 30개가 민팅되었다면 다음 민팅 아이디는 31이 된다.
        //계속 이렇게 유일한 값을 가지는 것을 NFT라고 할 수 있다.
        uint256 kallosTokenId = totalSupply() + 1;

        //block.timestamp: 이 함수를 실행한 시간, msg.sender: 실행하는 이의 주소, kallosTokenId: 민팅 아이디
        //아래 함수를 돌림으로써 랜덤하게 kallosType이 선택됨(여기서는 1 ~ 5 중 랜덤으로 선택)
        //주의) 매핑함수에서 값이 없는 인덱스(여기서 매핑함수에 왼쪽 uint256)를 조회하면 0이 반환된다. 따라서 1부터 사용하는 게 좋다.
        uint256 kallosType = (uint256(
            keccak256(
                abi.encodePacked(block.timestamp, msg.sender, kallosTokenId)
            )
        ) % 5) + 1;

        //랜덤으로 선택된 값(kallosType)을 매핑함수(kallosTypes)의 현재 민팅아이디(kallosTokenId)번째 인덱스에 저장
        kallosTypes[kallosTokenId] = kallosType;

        //msg.sender: 민팅을 요청한 사람(=현재 거래 요청한 사람)의 주소
        //_mint: 민팅하기 위해 ERC721에서 제공하는 인터페이스
        _mint(msg.sender, kallosTokenId);
    }

    function getKallosToken(address _kallosTokenOwner)
        public
        view
        returns (KallosTokenData[] memory)
    {
        uint256 balanceLength = balanceOf(_kallosTokenOwner);

        require(balanceLength != 0, "Owner did not have token");

        KallosTokenData[] memory kallosTokenData = new KallosTokenData[](
            balanceLength
        );

        for (uint256 i = 0; i < balanceLength; i++) {
            uint256 kallosTokenId = tokenOfOwnerByIndex(_kallosTokenOwner, i);
            uint256 kallosType = kallosTypes[kallosTokenId];
            uint256 kallosPrice = saleKallosToken.getKallosTokenPrice(
                kallosTokenId
            );

            kallosTokenData[i] = KallosTokenData(
                kallosTokenId,
                kallosType,
                kallosPrice
            );
        }
        return kallosTokenData;
    }

    function setSaleKallosToken(address _saleKallosToken) public {
        saleKallosToken = SaleKallosToken(_saleKallosToken);
    }
}
