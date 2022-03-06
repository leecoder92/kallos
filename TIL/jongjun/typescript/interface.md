# Interface

```typescript
let user:object;

user = {
    name: 'xx',
    age:30
}

console.log(user.name)
// 에러 발생
// object에는 특정 속성값에 대한 정보가 없기 때문.
```

property를 정의해서 객체로 표현하고자 할 때는 interface를 사용한다.



```typescript
type Score = 'A' | 'B' | 'C' | 'F' // 문자열 리터럴

interface User {
    name: string;
    age: number;
    gender?: string; // 필수적이지 않을 때에는 뒤에 물음표를 붙여주면 된다.
    readonly birthYear: number; // 읽기만 하고 수정을 불가능하게 할 때(읽기 전용)
    [key:number] : Score; // key는 숫자로, value는 문자열로 여러 개 만들고 싶을 때 / Score에는 type에서 선언한 값만 들어갈 수 있다.
}

let user:User = {
    name: 'xx',
    age: 30,
    birthYear: 2000,
    1: 'A',
    2: 'B',
}

user.age = 10;
user.gender = "male"
user.birthYear = 1990; // 에러가 나옴. readonly이기 때문.

console.log(user.age)
```



interface로 함수 정의

```typescript
interface Add {
    (num1:number, num2:number): number;
}

const add:Add = function(x, y) {
    return x + y;
}

add(10, 20); // 30

interface IsAdult {
    (age:number):boolean;
}

const a:IsAdult = (age) => {
    return age > 19;
}

a(33) // true
```



interface로 class 정의

```typescript
// implements

interface Car {
    color: string;
    wheels: number;
    start(): void;
}

class Bmw implements Car {
    color;
    wheels = 4;
    constructor(c:string) {
        this.color = c;
    }
	start(){
        console.log('go...')
    }
}

const b = new Bmw('green');
console.log(b)
b.start() // go...

// extends
interface Benz extends Car {
    door: number;
    stop(): void;
}

const benz:Benz = {
    door: 5,
    stop() {
        console.log('stop')
    },
    color: 'black',
    wheels: 4,
    start() {
        console.log('go...')
    }
}
```



확장은 여러개로 할 수 있다.

```typescript
interface Car {
    color: string;
    wheels: number;
    start(): void;
}

interface Toy {
    name: string;
}

interface ToyCar extends Car, Toy {
    price: number;
}
```

