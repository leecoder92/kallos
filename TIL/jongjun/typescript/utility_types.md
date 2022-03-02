# Utility Types



```typescript
// keyof
interface User {
    id: number;
    name: string
    age: number
    gender: "m"|"f"
}

type UserKey = keyof User // id | name | age | gender

const uk:UserKey = "age"
```

```typescript
// Partial<T>
interface User {
    id:number
    name:string
    age:number
    gender: "m"|"f"
}

let admin: Partial<User> = {
    id: 1,
    name: "Bob"
}
// 옵셔널하게 사용하고 싶을 때
```

```typescript
// Required<T>
interface User {
    id:number
    name:string
    age?:number
}

let admin: Required<User> {
    id: 1,
    name: "Bob",
    age: 30
}
// 모든 property를 필수로 바꿔줌
```

```typescript
// Readonly<T>
interface User {
    id: number
    name:string
    age?: number
}

let admin: Readonly<User> = {
    id: 1,
    name: "Bob",
}

admin.id = 4 // 에러 발생함. 수정 불가능

// Record<K,T> K는 key, T는 type
type Grade = '1'|'2'|'3'|'4'
type Score = 'A'|'B'|'C'|'D'

const score:Record<Grade, Score> = {
    1: "A",
    2: "B",
    3: "C",
    4: "D"
}
// Record 예제2
interface User {
    id: number
    name:string
    age: number
}

function isValid(user:User) {
    const result: Record<keyof User, boolean> = {
        id: user.id > 0,
        name: user.name !== "",
        age: user.age > 0,
    }
    return result
}

// Pick<T,K> T타입에서 K프로퍼티만 골라서 사용
interface User {
    id: number;
    name: string
    age: number
    gender: "m"|"f"
}

const admin:Pick<User, 'id'|'name'> = {
    id: 0,
    name: "Bob"
}

// Omit<T,K> 특정 프로퍼티를 생략할 수 있음
interface User {
    id: number;
    name: string
    age: number
    gender: "m"|"f"
}

const admin:Omit<User, 'age'|'gender'> = {
    id: 0,
    name: "Bob"
}

// Exclude<T1, T2> T1에서 T2를 제외
type T1 = string | number
type T2 = Exclude<T1, number> // string만 남음

// NonNullable<Type> null을 제외한 타입을 생성, undefined도 함께 제외시킴.
type T1 = string | null | undefined | void
type T2 = NonNullable<T1> // string과 void만 남게 됨.
```

