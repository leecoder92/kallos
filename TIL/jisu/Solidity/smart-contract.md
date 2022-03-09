# Smart Contract

[인프런 h662 - 디앱 프로젝트 강의 기반](https://www.inflearn.com/course/%EB%94%94%EC%95%B1-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/dashboard)

## SET UP
```
$ npm install @openzeppelin/contracts
```

## Remix IDE에서 로컬 프로젝트를 돌릴 수 있는 명령어
```
$ npm install -g @remix-project/remixd
$ remixd -s <돌릴 폴더 경로> --remix-ide https://remix.ethereum.org
```

## 상품 등록 로직(minting)
//MintAnimalToken.sol
```javascript
// SPDX-License-Identifier: MIT

// 컴파일러 버전
pragma solidity ^0.8.0; 

//ERC721 - NFT를 만드는 데 필요한 룰이 인터페이스로 만들어져 있는 것
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

//ERC721Enumerable에서 제공하는 인터페이스를 사용하기 위해 상속받음
contract MintAnimalToken is ERC721Enumerable {

    constructor() ERC721("h662Animals", "HAS") {}

    //왼쪽 uint256: animalTokenId, 오른쪽 uint256: animalTypes
    //따라서 animalTokenId 입력하면 animalTypes 나오게 해줌
    //public으로 어디서든 접근 가능하도록 한다.
    mapping(uint256 => uint256) public animalTypes;

    function mintAnimalToken() public {

        //totalSupply(): 지금까지 민팅된 nft 개수
        //예를 들어 지금까지 30개가 민팅되었다면 다음 민팅 아이디는 31이 된다.
        //계속 이렇게 유일한 값을 가지는 것을 NFT라고 할 수 있다.
        uint256 animalTokenId = totalSupply() + 1;

        //block.timestamp: 이 함수를 실행한 시간, msg.sender: 실행하는 이의 주소, animalTokenId: 민팅 아이디
        //아래 함수를 돌림으로써 랜덤하게 animalType이 선택됨(여기서는 1 ~ 5 중 랜덤으로 선택)
        //주의) 매핑함수에서 값이 없는 인덱스(여기서 매핑함수에 왼쪽 uint256)를 조회하면 0이 반환된다. 따라서 1부터 사용하는 게 좋다.
        uint256 animalType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, animalTokenId))) % 5 + 1;

        //랜덤으로 선택된 값(animalType)을 매핑함수(animalTypes)의 현재 민팅아이디(animalTokenId)번째 인덱스에 저장
        animalTypes[animalTokenId] = animalType;

        //msg.sender: 민팅을 요청한 사람(=현재 거래 요청한 사람)의 주소
        //_mint: 민팅하기 위해 ERC721에서 제공하는 인터페이스
        _mint(msg.sender, animalTokenId);
    }
}
```

## 상품 판매, 구매 로직(sale, purchase)
//SaleAnimalToken.sol
```javascript
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "MintAnimalToken.sol";

contract SaleAnimalToken {
    MintAnimalToken public mintAnimalTokenAddress;

    constructor (address _mintAnimalTokenAddress) {
        mintAnimalTokenAddress = MintAnimalToken(_mintAnimalTokenAddress);
    }

    //왼 uint256: _animalTokenId(토큰아이디), 오 uint256: animalTokenPrices(토큰 가격)
    //토큰 아이디 조회 시 토큰 가격 반환
    mapping(uint256 => uint256) public animalTokenPrices;

    //FE에서 어떤 것들을 판매중인지 보여주기 위해 토큰아이디들을 저장해 둘 배열
    uint256[] public onSaleAnimalTokenArray;

    //_animalTokenId: 뭘 팔건지, _price: 얼마에 팔건지
    function setForSaleAnimalToken(uint256 _animalTokenId, uint256 _price) public {

        //팔려는 것의 주인의 주소 반환
        address animalTokenOwner = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        //주인이 맞는 지 확인하여 false라면 Caller ~ 메시지 출력
        require(animalTokenOwner == msg.sender, "Caller is not animal token owner.");

        //판매 가격이 0 이상인지 체크
        require(_price > 0, "Price is zero or lower.");

        //매핑함수로 토큰 아이디에 해당하는 토큰 가격 반환하여 체크
        require(animalTokenPrices[_animalTokenId] == 0, "This animal token is already on sale.");

        //isApprovedForAll: 현재 토큰의 주인(animalTokenOwner)이 판매 계약(address(this))을 넘겼는지 체크
        //why? 스마트 컨트랙이 파일이기 때문에 엉뚱한 컨트랙이 와서 그곳에 코인이나 NFT가 저장될 경우 찾을 수 없는 상황이 될 수도 있기 때문
        require(mintAnimalTokenAddress.isApprovedForAll(animalTokenOwner, address(this)), "Animal token owner did not approve token.");

        //매핑에 토큰아이디에 해당하는 가격 set
        animalTokenPrices[_animalTokenId] = _price;

        //판매 중인 상품 배열에 토큰 아이디 추가
        onSaleAnimalTokenArray.push(_animalTokenId);
    }

    function purchaseAnimalToken(uint256 _animalTokenId) public payable {

        //매핑함수로 토큰 아이디에 해당하는 가격 반환
        uint256 price = animalTokenPrices[_animalTokenId];

        //판매 상품의 주인(의 주소) 반환
        address animalTokenOnwer = mintAnimalTokenAddress.ownerOf(_animalTokenId);

        // 상품의 가격이 0 이상인지 체크
        require(price > 0, "Animal token not sale.");

        //msg.value: 송금한 코인의 값
        //구매자가 송금한 가격이 판매가보다 크거나 같은지 체크
        require(price <= msg.value, "Caller sent lower than price.");

        //요청(여기서는 구매요청)인이 주인과 같은 사람인지 체크
        require(animalTokenOnwer != msg.sender, "Caller is animal token owner.");

        //현재 함수(purchaseAnimalToken)를 실행한 사람(msg.sender)이 송금한 금액(msg.value)만큼 상품의 주인(animalTokenOnwer)에게 감
        payable(animalTokenOnwer).transfer(msg.value);

        //safeTransferFrom(보내는사람, 받는사람, 보낼 상품의 토큰 아이디)
        //받는 사람에게 상품이 전달됨
        mintAnimalTokenAddress.safeTransferFrom(animalTokenOnwer, msg.sender, _animalTokenId);

        //매핑에서 해당(방금 거래된) 상품의 토큰아이디에 해당하는 가격을 0으로 초기화(팔렸으니까)
        animalTokenPrices[_animalTokenId] = 0;

        //판매중인 상품목록(배열 onSaleAnimalTokenArray)에서 제거
        for(uint256 i = 0; i < onSaleAnimalTokenArray.length; i++) {
            //팔린 상품의 가격을 위에서 0으로 초기화 해주었으므로 가격이 0인 상품을 찾아서 제거해주면 됨
            if(animalTokenPrices[onSaleAnimalTokenArray[i]] == 0) {
                //배열 맨 뒤에 배치된 상품을 현재 팔린 상품의 자리에 배치하고
                onSaleAnimalTokenArray[i] = onSaleAnimalTokenArray[onSaleAnimalTokenArray.length - 1];
                //pop으로 배열 맨 뒤 상품 제거
                onSaleAnimalTokenArray.pop();
            }
        }
    }

    //FE를 위한 로직
    //판매 상품 배열 길이 조회
    function getOnSaleAnimalTokenArrayLength() view public returns (uint256) {
        return onSaleAnimalTokenArray.length;
    }
    //상품에 해당하는 가격 조회
    function getAnimalTokenPrice(uint256 _animalTokenId) view public returns (uint256) {
        return animalTokenPrices[_animalTokenId];
    }
}
```