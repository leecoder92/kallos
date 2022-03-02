# 함수 type 정의

```typescript
function add(num1:number, num2:number):number { // 괄호 뒤에 함수가 반환하는 값의 타입을 입력
    return num1 + num2;
}

function add(num1:number, num2:number):void { // 아무것도 return하지 않을 때
    console.log(num1 + num2);
}

function isAdult(age:number):boolean {
    return age > 19;
}

// 함수의 매개변수도 optional로 지정해줄 수 있음(선택적 매개변수)
function hello(name?:string) {
    return `Hello, ${name || "world"}`;
}
const result = hello(); // Hello, world
const result2 = hello("Sam") // Hello, Sam

function hello2(name = "world") { // default값
    return `Hello, ${name}`;
}
const result3 = hello2()

//
functin hello(name:string, age?:number):string { // 선택적 매개변수가 필수 매개변수 앞에 오면 안 됨.
    if (age !== undefined) {
        return `Hello ${name}. Your are ${age}.`;
    } else {
        return `Hello, ${name}`;
    }
}

console.log(hello("Sam"))
console.log(hello("Sam", 30))

// 나머지 매개변수의 타입 작성법
function add(...nums:number[]) { // 배열 형태로!
    return nums.reduce((result, num) => result + num, 0)
}

add(1, 2, 3);
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

// this
interface User {
    name: string;
}

const Sam: User = {name: 'Sam'}

function showName(this:User, age:number, gender: 'm'|'f') {
    console.log(this.name, age, gender)
}

const a = showName.bind(Sam)
a(30, 'm')

// 오버로드
interface User {
    name: string;
    age: number;
}

function join(name:string, age:string):string;
function join(name:string, age:number):User;
function join(name:string, age:number|string):User | string {
    if (typeof age === 'number') {
        return {
            name,
            age,
        }
    } else {
        return "나이는 숫자로 입력해주세요."
    }
}

const sam:User = join("Sam", 30)
const jane:string = join("Janem", "30")
```

