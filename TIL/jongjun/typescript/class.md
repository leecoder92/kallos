# Class

```typescript
class Car {
    // color: string;
    constructor(public color:string) { // public이나 readonly를 적어두면 앞에 미리 color를 선언하지 않아도 됨.
        this.color = color;
    }
    start(){
        console.log("start")
    }
}

const bmw = new Car("red")
```



## 접근 제한자(Access modifier) - public, private, protected

```typescript
class Car {
    (private) #name: string = "car"; // 함수 내부에서만 사용 가능한 # 혹은 private
    color: string;
    constructor(color: string) {
        this.color = color;
    }
    start() {
        console.log("start")
    }
}

class Bmw extends Car {
    constructor(color:string) {
        super(color)
    }
    showName() {
        console.log(super.name)
    }
}

const z4 = new Bmw("black")

// protected: 자식 클래스에서 접근 가능. 
class Car {
    protected name: string = "car";
    color: string;
    constructor(color: string) {
        this.color = color;
    }
    start() {
        console.log("start")
    }
}

class Bmw extends Car {
    constructor(color:string) {
        super(color)
    }
    showName() {
        console.log(super.name)
    }
}

const z4 = new Bmw("black")
console.log(z4.name) // 클래스 인스턴스로는 참조할 수 없음.
```

![image-20220302173938160](class.assets/image-20220302173938160.png)

```typescript
// readonly 읽기전용
class Car {
    readonly name: string = "car";
    color: string;
    constructor(color: string, name) {
        this.color = color;
        this.name = name;
    }
    start() {
        console.log("start")
        console.log(this.name)
    }
}

class Bmw extends Car {
    constructor(color:string, name) {
        super(color, name)
    }
    showName() {
        console.log(super.name)
    }
}

const z4 = new Bmw("black", "zzzz4")
console.log(z4.name) // 클래스 인스턴스로는 참조할 수 없음.
// z4.name = "zzzz4"
```



## Static property

```typescript
// static을 쓰면 정적 멤버 변수를 만들 수 있음.
class Car {
    readonly name: string = "car";
    color: string;
    static wheels = 4;
    constructor(color: string, name) {
        this.color = color;
        this.name = name;
    }
    start() {
        console.log("start")
        console.log(this.name)
        console.log(Car.wheels) // this가 아니라 클래스명으로 적어줘야 함.
    }
}

class Bmw extends Car {
    constructor(color:string, name) {
        super(color, name)
    }
    showName() {
        console.log(super.name)
    }
}

const z4 = new Bmw("black", "zzzz4")
console.log(z4.name)
```



## 추상 클래스

```typescript
// 상속을 통해서만 가능
abstract class Car {
    color:string;
    constructor(color:string) {
        this.color = color;
    }
    start() {
        console.log("start")
    }
    abstract doSomething():void; // property나 method의 이름만 선언, 구체적인 기능은 상속받는쪽에서 구현
}

class Bmw extends Car {
    constructor(color:string) {
        super(color)
    }
    doSomething() {
        alert(3)
    }
}

const z4 = new Bmw("black")
```

