# Solidity

D_One 블로그 기반 작성

---

## 🧩  인스턴스(instance)

> 주로 하나의 컨트랙에서 다른 컨트랙을 접근할 때 사용

```jsx
// SPDX-License-Identifier:GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract A{

    uint256 public a = 5;

    function change(uint256 _value) public {
        a = _value;
    }

}

contract B{

    A instance = new A();

    function get_A() public view returns(uint256) {
        return instance.a();
    }
    function change_A(uint256 _value) public  {
        instance.change(_value);
    }

}
```

주의)

- 변수를 접근할 때 () 를 붙여주어야 리턴됨
- 컨트랙 A와 인스턴스 A는 다른 것(분신이라고 보면됨)
  - 즉, 인스턴스 A로 값을 바꿔도 컨트랙 A 자체만 따로 배포한 곳에 영향을 미치지 않음

---

## 🧩 생성자(constructor)

> 스마트컨트랙이 생성 또는 배포, 그리고 인스턴스화 될 때 초기값을 설정해주는 용도

```jsx
// SPDX-License-Identifier:GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract A{

    string public name;
    uint256 public age;

    constructor(string memory _name, uint256 _age){
        name = _name;
        age = _age;
    }

    function change(string memory _name, uint256 _age) public  {
         name = _name;
         age = _age;
    }
}

contract B{

  A instance = new A("Alice", 52);

  function change(string memory _name, uint256 _age) public  {
        instance.change(_name,_age);
    }

  function get() public view returns(string memory, uint256) {
        return (instance.name(), instance.age());
    }

}
```

---

## 🧩 상속

> 스마트 컨트랙 사이의 상속은 변수와 함수들을 상속하는 것

```jsx
// SPDX-License-Identifier:GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract Father{
    string public familyName = "Kim";
    string public givenName = "Jung";
    uint256 public money = 100;

    constructor(string memory _givenName) public {
        givenName = _givenName;
    }


    function getFamilyName() view public  returns(string memory){
        return familyName;
    }

    function getGivenName() view public  returns(string memory){
        return givenName;
    }

    function getMoney() view public returns(uint256){
        return money;
    }


}

contract Son is Father("James"){



}
```

- 형식) 상속받는 컨트랙 is 상속하는 컨트랙(파라미터){}

---

## 🧩 오버라이딩(overriding)

> 상속받은 함수를 덮어쓰는 것

```jsx
// SPDX-License-Identifier:GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract Father{

    string public familyName = "Kim";
    string public givenName = "Jung";
    uint256 public money = 100;

    constructor(string memory _givenName) public {
        givenName = _givenName;
    }


    function getFamilyName() view public  returns(string memory){
        return familyName;
    }

    function getGivenName() view public  returns(string memory){
        return givenName;
    }

    function getMoney() view  public virtual returns(uint256){
        return money;
    }


}

contract Son is Father("James"){


    uint256 public earning = 0;
    function work() public {
        earning += 100;
    }

     function getMoney() view  public override returns(uint256){
        return money+earning;
    }

}
```

주의)

- 오버라이딩 될 함수에 부모 컨트랙에서는 _virtual_, 자식 컨트랙에서는 *override*를 붙여줘야 함.
- remix에서 실행할 때 constructor에 public을 빼야 작동됨 ⇒ 왠지 모르겠??

두 개 이상 상속할 경우

```jsx
// SPDX-License-Identifier:GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract Father{
    uint256 public fatherMoney = 100;
    function getFatherName() public pure returns(string memory){
        return "KimJung";
    }

    function getMoney() public view virtual returns(uint256){
        return fatherMoney;
    }

}

contract Mother{
    uint256 public motherMoney = 500;
    function getMotherName() public  pure returns(string memory){
        return "Leesol";
    }
    function getMoney() public view virtual returns(uint256){
        return motherMoney;
    }
}

contract Son is Father, Mother {

    function getMoney() public view override(Father,Mother) returns(uint256){
        return fatherMoney+motherMoney;
    }
}
```

주의)

- 동일한 자식 컨트랙에 상속하는 두 부모 컨트랙에 만약 같은 이름의 함수가 존재하고 이를 자식 컨트랙에서 오버라이트 한다면 _override(부모1 컨트랙, 부모2 컨트랙)_ 으로 명시해주어야 함.

## 🧩 이벤트(event)

> 블록체인 네트워크의 블록에 특정값을 기록하는 것

예를 들어, 아래와 같이 송금하기 함수를 실행 시, 실행(프론트에서 버튼을 누르는 등)한 사람의 계좌와 금액이 이벤트로 출력되어 블록체인 네트워크 안에 기록(⇒ 출력 logs에 이벤트 확인 가능 === 블록 안에 이벤트 저장됨)

⇒ 이렇게 로그를 사용하여 블록에 각인시키는 것이 일반적으로 string이나 다른 값들을 스마트컨트랙에 저장하는 것보다 효율적

⇒ why? 블록 안에 저장되었기 때문에 언제든지 들고와 사용 가능

```jsx
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

contract lec13 {

    event info(string name, uint256 money);

    function sendMoney() public {
        emit info("KimDaeJin", 1000);
    }
}
```

형식)

- 이벤트 정의 ⇒ event 이벤트 이름(파라미터 타입과 이름)
- 이벤트 출력 ⇒ emit 이벤트이름(파라미터)

> indexed : 블록들 안에 출력된 이벤트들을 필터링해 원하는 이벤트만을 가지고 옴

```jsx
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

contract Lec14 {
    event numberTracker(uint256 indexed num, string str);

    uint256 num =0;
    function PushEvent(string memory _str) public {
        emit numberTracker(num,_str);
        num ++;
    }
}
```

예를 들어 num이 3이라면 num이 3인 이벤트가 적힌 블록을 가져올 수 있음
