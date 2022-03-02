# TypeScript 공부

유튜브 코딩앙마의 typescript 강의를 참고하여 공부했습니다.



## Why TypeScript?

브라우저는 TS를 바로 인식하지 못하므로 TS를 JS로 변환을 해야 한다.

이렇게 번거로운 과정이 있는데 왜 TS를 사용하는 것이고, 어떤 장점들이 있을까?

 

```javascript
function add(num1, num2) {
    console.log(num1 + num2)
}

add() // 원하는 결과를 얻지 못하는데, JS는 아무런 힌트를 주지 않는다. 심지어 에러 없이 실행이 된다 => NaN
add(1) // NaN
add(1, 2) // 3
add(3, 4, 5) // 세번째 인수는 무시되고 7이 출력됨
add('hello', 'world') // "helloworld"
```

JS는 실수가 있는 코드가 있음에도 문제없이 실행이 된다. 그리고 어떠한 에러 메시지도 없다.



JavaScript(동적 언어): 런타임에 타입이 결정되고 / 오류를 발견한다.

TypeScript(정적 언어): 컴파일 타임에 타입 결정 / 오류 발견 => 코드 작성시간은 조금 길어지겠지만, 안정적으로 코드를 작성할 수 있다.

위 코드를 TS로 작성하면 오류가 있는 부분에 빨간색 밑줄이 나타나고, 그 위에 마우스를 올려놓으면 에러 메시지를 볼 수 있다.

※ type any는 가급적 사용하지 말자!

```typescript
function add(num1:number, num2:number) {
  console.log(num1 + num2)
}
```

에러가 있는 코드도 js로 변환은 되지만, ts파일에서 에러를 확인할 수 있다.