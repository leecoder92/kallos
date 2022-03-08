# Solidity

D_One 블로그 기반 작성

## 🧩  타입(type)

- boolean
- string
- bytes(solidity는 byte1 ~ byte32까지 존재)
- integer
  - int(기호 있는 integer) - 음수값 있음
  - uint(기호 없는 integer) - 음수값 없음
- address - 20bytes의 길이 (스마트컨트랙 배포 시 얻는 주소)

## 🧩  함수 정의

> 접근제어자(public, private, external, internal)를 함수명 뒤에 씀

1. 파라미터와 리턴값이 없는 함수 정의

   ```jsx
   // SPDX-License-Identifier: GPL-3.0

   pragma solidity >=0.7.0 <0.9.0;

   contract Lec4 {
       uint256 public a = 3;
       function changeA() public{
           a =5;
       }
   }
   ```

2. 파라미터는 있고 리턴값은 없는 함수 정의

   ```jsx
   // SPDX-License-Identifier: GPL-3.0

   pragma solidity >=0.7.0 <0.9.0;

   contract Lec4 {
       uint256 public a = 3;
       function changeA(uint256 _value) public{
           a =_value;
       }
   }
   ```

3. 파라미터와 리턴값이 모두 있는 함수 정의

   ```jsx
   // SPDX-License-Identifier: GPL-3.0

   pragma solidity >=0.7.0 <0.9.0;

   contract Lec4 {
       uint256 public a = 3;
       function changeA(uint256 _value) public returns(uint256){
           a =_value;
           return a;
       }
   }
   ```

## 🧩  접근제어자

1. public - 어디서든 접근 가능
2. private - private이 정의된 스마트 컨트랙에서만 접근 가능
3. external - 현 컨트랙 밖에서만 접근 가능
4. internal - 현 컨트랙 안에서만 접근 가능, 상속받은 자식 컨트랙에서도 접근 가능(부모 컨트랙 내 변수, 함수에)

## 🧩  view와 pure

### view

> 함수 밖의 변수를 읽을 수 있으나 변경 불가

```jsx
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract View_example{
     uint256 public a = 1;

    function read_a() public returns(uint256){
        a = 3;
        return a+2;
    }
}
```

### pure

> 함수 밖의 변수 읽을 수 없고 변경도 불가

```jsx
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
contract Pure_example{

    function read_a() pure public returns(uint256){
        uint256 a2 = 3;
        return a+2;
    }
}
```

### view, pure 모두 명시되지 않았을 때

> 함수 밖의 변수들을 읽을 수 있고, 변경도 가능

## 🧩  저장 영역

### storage

> 대부분의 변수, 함수들이 저장되며, 영속적으로 저장되어 가스 비용이 비쌈

### memory

> 함수의 파라미터, 리턴값, 레퍼런스 타입이 주로 저장됨 (string은 레퍼런스 타입으로 볼 수 있기 때문에 항상 memory 키워드를 넣어주어야 한다.)

```jsx
// SPDX-License-Identifier  GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract lec7 {

    function get_string(string memory _str) public pure returns( string memory){
        return _str;
    }
}
```

but, storage처럼 영속적이지 않고 함수 내에서만 유효하여 storage보다 가스 비용 쌈

### colldata

> 주로 external 함수의 파라미터에서 사용됨

### stack

> EVM(Ethereum Virtual Machine)에서 stack data를 관리할 때 쓰는 영역, 1024MB로 제한

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

> super: 상속받은 부모 컨트랙의 이벤트를 유지하면서 자식 컨트랙만의 이벤트를 추가할 때 사용

```jsx
// SPDX-License-Identifier:GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract Father {
    event FatherName(string name);
    function who() public virtual{
        emit FatherName("KimDaeho");
    }
}

contract Mother {
    event MotherName(string name);
    function who() public virtual{
        emit MotherName("leeSol");
    }
}

contract Son is Father{
    event sonName(string name);
    function who() public override{
        super.who();
        emit sonName("KimJin");
    }
}
```

주의)

- 만약 contract Son is Father 이 아닌 contract Son is Father, Mother이라면 super.who()에서 super은 가장 최근(나중)에 상속받은 Mother 가 된다.

## 🧩 매핑(mapping)

> 형식: mapping(키 타입 ⇒ 값 타입) 접근제한자 변수이름

get, set 함수로 표현할 수 있다.

```jsx
// SPDX-License-Identifier:GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract lec17{
    mapping(string=>uint256) private priceList;
    mapping(uint256=>string) private nameList;
    mapping(uint256=>uint256) private ageList;


    function setAgeList(uint256 _key,uint256 _age) public {
        ageList[_key] = _age;
    }

    function getAge(uint256 _key) public view returns(uint256){
        return ageList[_key];
    }

    function setNameList(uint256 _key,string memory _name) public {
        nameList[_key] = _name;
    }

    function getName(uint256 _key) public view returns(string memory){
        return nameList[_key];
    }

    function setPriceList(string memory _itemName,uint256 _price) public {
        priceList[_itemName] = _price;
    }

    function getPriceList(string memory _key) public view returns(uint256){
        return priceList[_key];
    }

}
```

주의)

- mapping은 length 내장함수가 없어 length를 구할 수 없다.

## 🧩 배열(array)

> 형식: 타입[] 접근제한자 변수명

배열의 값을 미리 넣어주거나 사이즈를 정해줄 수도 있음

(메서드)

.push(): 배열에 값 추가

.pop(): 가장 최근 값을 삭제하며 배열의 길이(length)도 줄어듬 (stack과 유사)

.delete(): 특정 인덱스 값을 지울 수 있고 배열의 길이는 줄지 않음

```jsx
// SPDX-License-Identifier:GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract lec18{


    uint256[] public ageArray;
    uint256[10] public ageFixedSizeArray;//배열 사이즈 정해두기
    string[] public nameArray= ["Kal","Jhon","Kerri"];//배열 값 미리 넣기

    function AgeLength()public view returns(uint256) {
        return ageArray.length;
    }

    function AgePush(uint256 _age)public{
        ageArray.push(_age);
    }
    function AgeChange(uint256 _index, uint256 _age)public{
        ageArray[_index] = _age;
    }
    function AgeGet(uint256 _index)public view returns(uint256){
        return ageArray[_index];
    }
    function AgePop()public {
        ageArray.pop();
    }

    function AgePop(uint256 _index)public {
        delete ageArray[_index];
    }

}
```

주의)

- 일반적인 배열과 사용법 동일함
- 아직 값이 존재하지 않는 인덱스에 값을 넣으려고 하면 오류남

## 🧩 구조체(struct)

> 형식: struct 구조체명 { 타입 변수명, 타입 변수명, ...}

키와 벨류 짝 여러 개를 묶어놓은 형식으로, object와 유사함

```jsx
// SPDX-License-Identifier:GPL-30
pragma solidity >= 0.7.0 < 0.9.0;

contract lec20{
    struct Character{
        uint256 age;
        string name;
        string job;
    }

    mapping(uint256=>Character) public CharacterMapping;
    Character[] public CharacterArray;

    function createCharacter(uint256 _age,string memory _name,string memory _job) pure public returns(Character memory) {
        return Character(_age,_name,_job);
    }

    function createChracterMapping(uint256 _key, uint256 _age,string memory _name,string memory _job )  public {
       CharacterMapping[_key] = Character(_age,_name,_job);
    }

    function getChracterMapping(uint256 _key)  public view returns(Character memory){
       return CharacterMapping[_key];
    }

    function createChracterArray(uint256 _age,string memory _name,string memory _job )  public {
       CharacterArray.push(Character(_age,_name,_job));
    }

    function getChracterArray(uint256 _index)  public view returns(Character memory){
       return CharacterMapping[_index];
    }
}
```

위와 같이 구조체도 일반 변수처럼 매핑과 배열에 넣거나 반환할 수 있다.

## 🧩 문

> if 조건문: 다른 언어에서 if문을 사용하는 방식과 유사함

```jsx
string private result = "";
    function isIt5or3or1(uint256 _number) public returns(string memory){
        if(_number == 5){
            result = "Yes, it is 5";
            return result;
        }
        else if(_number == 3){
            result = "Yes, it is 3";
            return result;
        }
        else if(_number == 1){
            result = "Yes, it is 1";
            return result;
        }
        else{
            result = "No, it is not 5, 3 or 1";
            return result;
        }
	}
```

주의)

솔리디티 내에서는 string을 직접적으로 비교 불가하고, 아래와 같은 형식으로 비교해주어야 한다.

```jsx
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract lec24{
    string[] private countryList = ["South Korea","North Korea","USA","China","Japan"];

    function linearSearch(string memory _search) public view returns(int256,string memory){

        for(uint256 i=0; i<countryList.length; i++){
            if(keccak256(bytes(countryList[i])) == keccak256(bytes(_search))){ // 이 부분(string 비교 형식)
                return (i,countryList[i]);
            }
        }

        return(99,"Nothing");

    }

}
```

즉, \***\*string을 bytes 화 해주고, keccak256를 이용해 다시 해시화하여 비교해주는 것\*\***

> for문

```jsx
event CountryIndexName(uint256 indexed _index, string _name);
    string[] private countryList = ["South Korea","North Korea","USA","China","Japan"];

    function forLoopEvents() public {
        for(uint256 i =0; i<countryList.length; i++){
        emit CountryIndexName(i,countryList[i]);
        }
    }
```

> while문

```jsx
function whileLoopEvents() public {
        uint256 i = 0;
        while(i<countryList.length){
             emit CountryIndexName(i,countryList[i]);
             i++;
        }
    }
```

> do-while문

```jsx
function doWhileLoopEvents() public {
        uint256 i = 0;
        do{
            emit CountryIndexName(i,countryList[i]);
            i++;
        }
        while(i<countryList.length);
    }
```

## 🧩  에러 핸들러(error handler)

> 정의: 정의된 조건에 부합하지 않으면(== false), 에러를 발생시키는 것

(gas 소비 후 에러 발생)

### assert

> gas를 다 소비한 후, 특정한 조건에 부합하지 않으면 에러 발생

주로 코드가 정상적으로 작동하는지 테스트 용도로 사용

오직 내부적 에러 테스트 용도, 불변성 체크 용도로 사용하길 권장

```jsx
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// require, revert,assert

contract lec25{

    //Gas is spent
    function assertNow() public pure{
        assert(false);
    }

    }
```

함수 실행 시 뜨는 에러

- 0.4.22 ~ 0.7.x 버전
  - VM error: invalid opcode
- 0.8.x ~
  - VM error: revert

(gas 소비 전 에러 발생)

### revert

> 조건(문) 없이 에러를 발생시키고 gas 환불 시켜줌

주로 if문으로 조건을 주고 사용함

```jsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract lec25{
    function onlyAdults(uint256 _age) public pure returns(string memory){
        if( _age < 19){
            revert("You are not allowed to pay for the cigarette"); // revert("에러 메시지")
        }
        return "Your payment is scceeded";

    }

}
```

**gas를 환불해준다**

⇒ gas의 가격은 함수의 길이, 만들어진 방식에 따라 책정되는데, 이 함수를 실행할 때마다 정해진 동일한 가스의 가격을 지불하게 된다.

⇒ revert가 들어가면 에러가 발생되고 이것은 함수의 모든 부분이 실행되지는 않았다는 뜻

⇒ 실행되지 않은 만큼의 gas를 환불

⇒ assert는 가스 소비 후에 체크되는 것이기 때문에 이와 같은 과정이 불가하다.(== 환불 불가)

**함수 실행 시 뜨는 에러**

- VM error: revert

### require

> 특정한 조건에 부합하지 않으면 에러를 발생시키고, gas를 환불시켜줌

require == revert + if 라고 볼 수 있다.

```jsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract lec25{
    function requireNow()public pure{
        require(false,"occurred"); // require("에러 메시지")
    }

}
```

**함수 실행 시 뜨는 에러**

- VM error: require

### try / catch

> try문에서 에러를 잡아 catch문으로 넘긴 후 그 안에서 에러 핸들링

기존 에러 핸들러(assert, revert, require)이 에러를 발생시키고 에러메시지를 띄운 후 프로그램을 끝내는 데 반해, try/catch문은 프로그램이 죽는 것을 방지해준다.

**catch의 3가지 종류**

- catch Error(string memory reason){}
  - revert나 require을 통해 생성된 에러를 잡음
- catch Panic(uint errorCode){}
  - assert를 통해 생성된 에러를 잡음
  - ex) 나누기 0, 오버플로우, 배열에 없는 인덱스 접근 시 등
- catch(bytesmemorylowLevelData){}

  - 로우 레벨 에러를 잡음

  ⇒ 위와 같이 세부적으로 나누지 않고 그냥 catch{}로도 쓸 수 있음

주로

1. 외부 스마트 컨트랙 함수를 호출할 때
2. 외부 스마트 컨트랙을 생성할 때
3. 내부 스마트 컨트랙에서 함수를 호출할 때

try/catch문을 사용한다.

1. 외부 스마트 컨트랙 함수를 호출할 때

   ```jsx
   // SPDX-License-Identifier: GPL-3.0

   pragma solidity >=0.7.0 <0.9.0;

   contract math{

       function division(uint256 _num1,uint256 _num2) public pure returns (uint256){
           require(_num1<10,"num1 shoud not be more than 10");
           return _num1/_num2;
       }
   }

   contract runner{
       event catchErr(string _name,string _err);
       event catchPanic(string _name,uint256 _err);
       event catchLowLevelErr(string _name,bytes _err);

   		// 컨트랙 math 인스턴스화
       math public mathInstance = new math() ;

       function playTryCatch(uint256 _num1, uint256 _num2) public returns(uint256,bool){

   				//외부 스마트 컨트랙 함수 호출
           try mathInstance.division(_num1, _num2) returns(uint256 value){
               return(value,true);
           } catch Error(string memory _err) {
               emit catchErr("revert/require",_err);
               return(0,false);
           } catch Panic(uint256 _errorCode) {
               emit catchPanic("assertError/Panic",_errorCode);
               return(0,false);
           } catch (bytes memory _errorCode) {
               emit catchLowLevelErr("LowlevelError",_errorCode);
               return(0,false);
           }

       }
   }
   ```

1. 외부 스마트 컨트랙을 생성할 때

   ```jsx
   // SPDX-License-Identifier: GPL-3.0

   pragma solidity >=0.7.0 <0.9.0;

   contract character{
       string private name;
       uint256 private power;
       constructor(string memory _name, uint256 _power){
           name = _name;
           power = _power;
       }

   }

   contract runner{
       event catchOnly(string _name,string _err);
       function playTryCatch(string memory _name, uint256 _power) public returns(bool successOrFail){

           try new character(_name,_power) { //외부 스마트 컨트랙 생성
               return(true);
           }
           catch{
               emit catchOnly("catch","ErrorS!!");
               return(false);
           }


       }
   }

   }
   ```

1. 내부 스마트 컨트랙에서 함수 호출 시

   ```jsx
   // SPDX-License-Identifier: GPL-3.0

   pragma solidity >=0.7.0 <0.9.0;

   contract runner2{
       function simple() public returns(uint256){
           return 4;
       }
       event catchOnly(string _name,string _err);
       function playTryCatch() public returns(uint256,bool){

           try this.simple() returns(uint256 _value){
               return(_value,true);
           }
           catch{
               emit catchOnly("catch","ErrorS!!");
               return(0,false);
           }


       }
   }
   ```

   this ⇒ 현재 스마트컨트랙을 나타냄(runner2)

## 🧩  **returns 변수 명시**

```jsx
function add2(uint256 _num1, uint256 _num2) public pure returns (uint256 total){
         total = _num1 + _num2;
         return total;
}
```

위와 같이 returns (uint256:타입 total:변수명)이라고 명시해줌으로써 total 변수를 새로 명시할 필요가 없다.

## 🧩 modifier

> 주로 require과 함께 쓰임

특정 조건을 만족하는 지 여부를 판단하여 함수를 실행시키고자 할 때 해당 조건을 공통으로 사용할 수 있도록 하여 재사용성을 늘리는 역할을 함

```jsx
//파라미터가 없는 modifier
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract lec27{

    modifier onlyAdults{
         revert("You are not allowed to pay for the cigarette");
         _; // 이 부분에 함수(BuyCigarette())를 넣겠다
    }

    function BuyCigarette() public onlyAdults returns(string memory){
        return "Your payment is scceeded";
    }

}

//파라미터가 있는 modifier
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract lec27{

    modifier onlyAdults2(uint256 _age){
         require(_age>18,"You are not allowed to pay for the cigarette");
         _;
    }

    function BuyCigarette2(uint256 _age) public onlyAdults2(_age) returns(string memory){
        return "Your payment is scceeded";
    }

}

//즉, 이렇게 동작함
function BuyCigarette2(uint256 _age) public returns(string memory){
        require(_age>18,"You are not allowed to pay for the cigarette");
        return "Your payment is scceeded";
}
```

## 🧩 SPDX

- SPDX 라이센스는 0.68 이후부터 솔리디티 프로그램 맨 위에 명시를 요구함
- 컨트랙에 대한 신뢰감을 높이고 저작권 문제를 해소하기 위해 명시
- but, SPDX가 없어도 컴파일 됨

## 🧩 주석

- 블록단위 주석
  ```jsx
  /*
  주석 내용
  */
  ```
- 행단위 주석
  ```jsx
  // 주석 내용
  ```

## 🧩 키워드

### Payable

> 코인과 상호작용(송금) 시 필요한 키워드

⇒ 주로 함수, 주소, 생성자에 붙어 사용됨

⇒ send, transfer, call을 이용하여 이더를 보낼 때 필요한 키워드

### msg.value

> 송금한 코인의 값

### 이더 송금 방법 3가지

1. send - 2300 gas를 소비하며, 성공 여부를 boolean 값으로 리턴함
2. transfer - 2300 gas를 소비하며, 실패 시 에러 발생 시킴
3. call - 가변적인 gas(gas값 지정 가능)를 소비하며, 성공 여부를 boolean 값으로 리턴함 ⇒ 주로 추천되는 방식

```jsx
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 < 0.9.0;

contract lec32 {

    event howMuch(uint256 _value);
    function sendNow(address payable _to) public payable{
        bool sent = _to.send(msg.value); // return true or false
        require(sent,"Failed to send either");//에러 시
        emit howMuch(msg.value);//에러 안나면
    }

    function transferNow(address payable _to) public payable{
        _to.transfer(msg.value);
        emit howMuch(msg.value);
    }

    function callNow (address payable _to) public payable{
        //0.50
        // (bool sent, ) = _to.call.gas(1000).value(msg.value)("");
        // require(sent,"Failed to send either");

        //0.7 ~
        (bool sent, ) = _to.call{value: msg.value , gas:1000}("");//gas값 지정 가능
        require(sent, "Failed to send Ether");
        emit howMuch(msg.value);
    }
}
```

### call

> 이더를 보내는 방식 중 하나

코인을 송금하는 기능 이외에도, 스마트 컨트랙의 주소만 있다면 내부, 외부 모두 접근 가능

abi를 통해서 함수 접근

(abi: 컴파일 된 스마트 컨트랙의 정보가 담겨 있음)

```jsx
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 < 0.9.0;

contract add{
    event JustFallback(string _str);
    function addNumber(uint256 _num1, uint256 _num2) public pure returns(uint256){
        return _num1 + _num2;
    }
    fallback() external {
     emit JustFallback("JustFallback is called");
    }
}

contract caller{
    event calledFunction(bool _success, bytes _output);

    //1. 송금하기
    function transferEther(address payable _to) public payable{
        (bool success,) = _to.call{value:msg.value}("");
        require(success,"failed to transfer ether");
    }

    //2. 외부 스마트 컨트랙 함수 부르기
    function callMethod(address _contractAddr,uint256 _num1, uint256 _num2) public{
        (bool success, bytes memory outputFromCalledFunction) = _contractAddr.call(
              abi.encodeWithSignature("addNumber2(uint256,uint256)",_num1,_num2)
              );
        require(success,"failed to transfer ether");
        emit calledFunction(success,outputFromCalledFunction);
    }
}
```

### balance

> 해당 특정 주소의 현재 이더 잔액을 나타냄

주소.balance 형태로 사용

### msg.sender

> 스마트 컨트랙과 상호 작용하는 주체

```jsx
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 < 0.9.0;

contract MobileBanking{

    address owner;
    constructor() payable{
        owner = msg.sender;
    }

    modifier onlyOwner{
        require(msg.sender == owner, "Only Owner!");
        _;
    }

    event SendInfo(address _msgSender, uint256 _currentValue);
    event MyCurrentValue(address _msgSender, uint256 _value);
    event CurrentValueOfSomeone(address _msgSender, address _to,uint256 _value);

    function sendEther(address payable _to) public onlyOwner payable {

        require(msg.sender.balance>=msg.value, "Your balance is not enough");
        _to.transfer(msg.value);
        emit SendInfo(msg.sender,(msg.sender).balance);
    }

    function checkValueNow() public onlyOwner {
        emit MyCurrentValue(msg.sender, msg.sender.balance);
    }

    function checkUserMoney(address _to) public onlyOwner {
        emit CurrentValueOfSomeone(msg.sender,_to ,_to.balance);
    }

}
```

### fallback

> 대비용 함수로, 이름이 없는(무기명) 함수이다.

external, payable 키워드가 필수로 들어가야 한다.

왜 쓰지?

1. 스마트 컨트랙이 이더를 받을 수 있도록 하기 위해
2. 이더를 받고 난 후 어떤 행동을 취할 수 있도록 하기 위해
3. call 함수로 존재하지 않는 함수가 불릴 때, 어떤 행동을 취할 수 있도록 하기 위해

### receive

> fallback 함수의 한 형태로, 순수하게 이더만 받을 때 작동함

```jsx
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 < 0.9.0;

contract Bank{
    event JustFallback(address _from,string message);
    event RecevieFallback(address _from,uint256 _value ,string message);
    event JustFallbackWIthFunds(address _from,uint256 _value ,string message);
    //~0.6
//   function() external payable {
//      emit JustFallbackWIthFunds(msg.sender, msg.value,"JustFallback is called");
//     }


    //0.6~
    // fallback() external { // 불려진 함수가 특정 스마트 컨트랙이 없을 fallback 함수 발동
    //   emit JustFallback(msg.sender,"JustFallback is called");
    // }
    // receive() external payable { // 순수하게 이더만 받을 때 작동
    //   emit RecevieFallback(msg.sender, msg.value,"RecevieFallback is called");
    // }

    //
    fallback() external payable { // 이더를 받고 나서도 fallback 함수 발동
     emit JustFallbackWIthFunds(msg.sender, msg.value,"JustFallbackWIthFunds is called");
    }

}

contract You{

    //receve()
    function DepositWithSend(address payable _to) public payable{
         bool success = _to.send(msg.value);
         require(success, "Failled" );
    }

    function DepositWithTransfer(address payable _to) public payable{
        _to.transfer(msg.value);
    }

    function DepositWithCall(address payable _to) public payable{
        // ~ 0.7
        // (bool sent, ) = _to.call.value(msg.value)("");
        // require(sent,"Failed to send either");

        //0.7 ~
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failled" );
    }

    //fallback()
    function JustGiveMessage(address payable _to) public payable{
        (bool success, ) = _to.call("HI");
        require(success, "Failled" );
    }

    //To the fallback() with Funds
    function JustGiveMessageWithFunds(address payable _to) public payable{
        (bool success,) = _to.call{value:msg.value}("HI");
        require(success, "Failled" );
    }

}
```

## 🧩 call vs delegate call

> Sue ⇒ 스마트 컨트랙 A ⇒ 스마트 컨트랙 B 순으로 호출한다고 할 때

### call

1. 스마트 컨트랙 A의 msg.sender는 Sue의 주소
2. 스마트 컨트랙 B의 msg.sender는 스마트 컨트랙 A의 주소
3. 스마트 컨트랙 B의 num이 3에서 5라고 변경될 때, num = 5라는 것이 스마트 컨트랙 B에 저장됨

### delegate call

1. 스마트 컨트랙 A의 msg.sender는 Sue의 주소
2. 스마트 컨트랙 B의 msg.sender는 Sue의 주소
3. 스마트 컨트랙 B의 num이 3에서 5라고 변경될 때, num = 5라는 것이 스마트 컨트랙 A에 저장됨(스마트 컨트랙 B의 num 값은 그대로 3.

⇒ delegate call은 스마트 컨트랙 B의 함수를 스마트 컨트랙 A에 옮겨놓은 것처럼 행동

⇒ 스마트 컨트랙 A는 틀, B는 주요 함수들을 갖고 있는 핵심으로 볼 수 있음

⇒ 즉, B의 함수들을 A에서 delegate call로 부르면 A의 변수 값들이 영향을 받으므로 A에도 B와 같은 변수들이 존재해야 함

그렇다면, 왜 delegate call이 필요할까?

만약 스마트 컨트랙 A가 배포되었을 때는 이미 값을 변경할 수 없다. 이 때 num을 수정한 후 재배포를 해도 되지만 그렇게 되면 기존 고객들의 정보가 초기화 되버리기 때문에 delegate call을 사용하는 것

⇒ 스마트 컨트랙 B에서 주요 로직을 변경한 스마트 컨트랙 B’를 배포하고 A에서 delegate call 주소를 스마트 컨트랙 B → B’로 변경하면 바뀐 num이 적용된 함수를 사용할 수 있다.

⇒ 이 상황에서 스마트 컨트랙 A의 주소는 바뀌지 않으므로 유저가 신경쓸 일이 생기지 않는다. 이를 **upgradable smart contract framework**라 한다.

## 🧩 enum

> 사람이 읽을 수 있도록 사용자 / 개발자에 의해 정의된 상수 세트 타입

enum당 256개까지 저장되고 0부터 255가 부여된다.(uint8)

상수 세트이므로 uint로 변환해서 사용 가능하다.

```jsx
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 < 0.9.0;

contract lec38{

    enum CarStatus{
        TurnOff,
        TurnOn,
        Driving,
        Stop
    }

    CarStatus public carStatus;

    constructor(){
        carStatus = CarStatus.TurnOff;
    }

    event carCurrentStatus(CarStatus _carStatus, uint256 _carStatusInInt);

    function turnOnCar() public {
        require(carStatus == CarStatus(0), "To turn on, your car must be turned off");
        carStatus = CarStatus(1);
        emit carCurrentStatus(carStatus,uint256(carStatus));
    }


    function DrivingCar() public {
        require(carStatus == CarStatus.TurnOn, "To drive a car, your car must be turned on");
        carStatus = CarStatus.Driving;
        emit carCurrentStatus(carStatus,uint256(carStatus));
    }

    function StopCar() public {
        require(carStatus == CarStatus.Driving, "To drive a car, your car must be turned on");
        carStatus = CarStatus.Stop;
        emit carCurrentStatus(carStatus,uint256(carStatus));
    }

    function turnOffCar() public {
        require(carStatus == CarStatus.TurnOn
                || carStatus == CarStatus.Stop , "To turn off, your car must be turned on or driving");
        carStatus = CarStatus.TurnOff;
        emit carCurrentStatus(carStatus,uint256(carStatus));
    }

    function CheckStatus() public view returns(CarStatus) {
        return carStatus;
    }
}
```

## 🧩 library

> 기존에 만들던 스마트 컨트랙과 다른 종류의 스마트 컨트랙

library의 장점으로,

1. 재사용 - 블록체인에 라이브러리가 배포되면, 다른 스마트 컨트랙들에 적용 가능하다.
2. 가스 소비 줄임 - 가스는 스마트 컨트랙의 사이즈와 길이에 영향을 많이 받기 때문에 라이브러리를 적용하여 코드의 재사용성을 높이면 가스 소비량을 줄일 수 있다.
3. 데이터 타입 적용 - 라이브러리의 기능들은 데이터 타입에 적용할 수 있어 좀 더 쉽게 사용할 수 있다.

library의 제한사항으로,

1. fallback함수 불가 - fallback 함수를 라이브러리 안에 정의를 못 하기 때문에 이더를 갖고 있을 수 없다.
2. 상속이 불가하다
3. payable 함수로 정의할 수 없다.

```jsx
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 < 0.9.0;

library SafeMath{
    function add(uint8 a, uint8 b) internal pure returns (uint8) {
        require(a+b >= a , "SafeMath: addition overflow");
        return a + b;
    }
}

contract lec40{
    using SafeMath for uint8;
    uint8 public a;

    function becomeOverflow(uint8 _num1,uint8 _num2) public  {
       // a = _num1.add(_num2);
        a = SafeMath.add(_num1 ,_num2);

    }
}
```

## 🧩 import

> 스마트 컨트랙이 여러 파일에 분산되어 있을 경우 사용

```jsx
// lec41_1.sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 < 0.9.0;

library SafeMath0{
    //0~255;
    function add(uint8 a, uint8 b) internal pure returns (uint8) {
        require(a+b >= a , "SafeMath: addition overflow");
        return a + b;
    }
}

contract HiSolidity{
    event Hi(string _str);

    function hi() public {
        emit Hi("Hello solidity");
    }
}

// lec41.sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 < 0.9.0;

import "./lec41_1.sol"; // import를 통해 스마트 컨트랙, library의 위치를 명시함

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v3.4/contracts/math/SafeMath.sol";

contract lec41 is HiSolidity{
    using SafeMath0 for uint8;
    uint8 public a;
    // uint256 public maximum = 2 ** 256 -1;
    function becomeOverflow(uint8 _num1,uint8 _num2) public {
        a = _num1.add(_num2);

    }

}
```
