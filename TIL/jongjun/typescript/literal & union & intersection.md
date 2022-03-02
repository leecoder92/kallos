# Literal & Union & Intersection Types

## Literal Type

```typescript
const userName1 = "Bob"; // Bob, 정해진 string 값을 가진 것을 문자열 literal type이라고 함.
let userName2:string|number = "Tom"; // string
userName2 = 3 // 에러

type Job = "police" | "developer" | "teacher"

interface User {
    name: string;
    job: Job;
}

const user:User = {
    name: 'Bob',
    job: "student" // 에러 발생 => Job에 있는 것만 사용 가능.
    job: "developer",
}

// 숫자형 literal type도 사용 가능
interface HighSchoolStudent {
    name: string;
    grade: 1 | 2 | 3;
}
```



## Union Type

```typescript
interface Car {
    name: "car";
    color: string;
    start(): void;
}

interface Mobile {
    name: 'mobile';
    color: string;
    call(): void;
}

function getGift(gift: Car | Mobile) {
    console.log(gift.color)
    if (gift.name === "car") {
        gift.start()
    } else {
        gift.call()
    }
}
```



## Intersection Types(교차 타입)

```typescript
// 여러 타입을 합쳐서 사용함.

interface Car {
    name: string;
    start(): void;
}

interface Toy {
    name: string;
    color: string;
    price: number;
}

const ToyCar: Toy & Car = { // 두 타입 모두 가지고 있어야 함.
    name: "타요",
    start() {},
    color: "red",
    price: 1000,
}
```

