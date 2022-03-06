# Generics

클래스나 함수, 인터페이스를 다양한 타입으로 재사용할 수 있다.

```typescript
// 함수
function getSize<T>(arr: T[]):number {
    return arr.length
}

const arr1 = [1,2,3]
getSize<number>(arr1)

const arr2 = ['a', 'b', 'c']
getSize<string>(arr2)

const arr3 = [false, true, true]
getSize(arr3) // 추론도 가능

//interface
interface Mobile<T> {
    name:string;
    price:number;
    option: T;
}

const m1:Mobile<object> = {
    name: "s21",
    price: 1000,
    option: {
        color: "red",
        coupon: false,
    }
}
// 객체의 모습이 정해져 있다면
const m1:Mobile<{color:string; coupon:boolean}> = {
    name: "s21",
    price: 1000,
    option: {
        color: "red",
        coupon: false,
    }
}

const m2:Mobile<string> = {
    name: "s20",
    price: 900,
    option: "good",
}
```

예제

```typescript
interface User {
    name:string;
    age:number;
}

interface Car {
    name: string;
    color: string;
}

interface Book {
    price: number;
}

const user: User = {name: "a", age: 10};
const car: Car = {name: "bmw", color: "red"};
const book: Book = {price:3000}

function showName<T extends {name:string}>(data:T):string {
    return data.name
}

showName(user)
showName(car)
// showName(book)
```

