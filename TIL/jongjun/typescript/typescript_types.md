# TypeScript 기본 타입



```typescript
let car:string = 'bmw' // 문자열

car = 'benz'
car = 3 // string이 아닌 타입으로 재선언하면 에러가 발생함.

let car = 'bmw' // string이라고 선언하지 않아도 TS가 알아서 type을 추론한다!

let age:number = 30 // 숫자
let isAdult:boolean = true // bool 타입
let a:number[] = [1, 2, 3] // 배열
let a2:Array<number> = [1, 2, 3] // 배열 type 정의하는 또다른 방법

let week1:string[] = ['mon', 'tue', 'wed']
let week2:Array<string> = ['mon', 'tue', 'wed']
week1.push(3) // 문자열array에 숫자를 push하려고 하면 에러가 발생함.

// 튜플(tuple)
let b:[string, number] // index별로 type이 다를 때 이용할 수 있다.
b = ['z', 1] // 가능
b2 = [1, 'z'] // 불가능
b[0].toLowerCase() // 문제없음
b[1].toLowerCase() // 에러 발생

// void: 함수에서 아무것도 반환하지 않을 때
function sayHello():void {
    console.log("hello")
}

// never: 항상 error를 반환하거나, 무한루프 함수의 타입으로 사용 가능
function showError():never {
    throw new Error()
}

function infLoop():never {
    while (true) {
        // do something
    }
}

// enum: 비슷한 값들끼리 묶어줌
enum Os {
    Window = 3,
    Ios = 10,
    Android
}
// 숫자를 입력해주면 양방향 맵핑이 가능함
// 문자열을 입력하면 한 방향으로만 맵핑이 된다.
let myOs:Os;
myOs = Os.Window;
// 특정 값만 입력할 수 있게 강제할 수 있을 때, 그리고 그 값들이 공통점이 있을 때 enum을 사용할 수 있다.

// null, undefined
let a:null = null;
let b:undefined = undefined;
```

