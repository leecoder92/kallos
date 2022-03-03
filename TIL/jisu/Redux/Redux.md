# [Redux - 생활코딩](https://www.youtube.com/watch?v=Jr9i3Lgb5Qc&list=PLuHgQVnccGMB-iGMgONoRPArZfjRuRNVc)

## 1. PREVIEW

> Redux는 하나의 상태를 갖는다.

- 상태 == 객체

## 2. Redux 지도

> render

- state 값 참조해서 UI를 만드는 함수

> getState

- render가 state에 직접 접근할 수 없기 때문에 state 값 참조하기 위해 사용

| 은행  |   직원   |  고객  |
| :---: | :------: | :----: |
| state | getState | render |

> subscribe

- state의 값이 바뀔때마다 UI가 바뀔수 있도록 사용하는 것

```javascript
store.subscribe(render); // state가 바뀔 때마다 render함수 호출
```

> action

- dispatch 호출

> dispatch

- reducer를 호출
- type은 필수!

```javascript
store.dispatch({ type: "create", payload: { title: title, desc: desc } });
```

> reducer

- state 가공자
- state를 인자로 받아서 action을 활용해서 새로운 state값을 만듬

```javascript
function reducer(State, action) {
  if (action.type === "create") {
    //dispatch에서의 type
    //...
    return Object.assign({}, state, {
      //obj...
    }); //(반드시 빈 객체, state, obj)
  }
}
```

> 흐름

- Redux..
  1. store 생성
  2. state, action 활용하는 reducer 주입
  3. action을 dispatch 통해 보내기
  4. subscribe 통해 자동 갱신

> Without Redux vs With Redux

- Without Redux
  - 객체가 N개가 있다면 서로 간의 로직이 모든 객체가 양방향으로 연결되어 있어야하기 때문에 N^2개의 로직이 필요함
- With Redux
  - 상태 관리를 해주는 state가 있기 때문에 모든 객체가 state와 연결되어 있기만 하면 되므로 N\*2개의 로직이 필요함

## Redux의 장점

- 중앙 집중적인 상태 관리로 application을 쉽게 개발할 수 있음
- Time traveling 기능을 활용해 상태의 시간 여행을 할 수 있음

## Redux 적용

> Set Up

- CDN
  ```javascript
  <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.1.2/redux.js"></script>
  ```
- NPM
  ```
  (terminal)
  npm install --save redux
  ```

> Store 생성

```javascript
function reducer(state, action) {
  if (state === undefined) {
    // 기존 state가 없다는 뜻
    return { color: "red" }; //원하는 초기값 리턴
  }
}
let store = Redux.createStore(reducer); //위에서 리턴한 초기값이 store에 할당됨
```

> store.getState()

- 원본에 직접 접근 하지 말자
- 아래와 같이 reducer 함수 통해 복사본을 만들어서 접근하자

```javascript
function reducer(State, action) {
  let newState;
  if (action.type === "create") {
    //dispatch에서의 type
    //...
    newState = Object.assign({}, state, {
      //obj...
    }); //(반드시 빈 객체, state, obj)
    return newState;
  }
}
```

- 즉, 리턴값이 원본을 그대로 반환하는 것이 아니라 원본을 복제한 값을 리턴해야 redux의 다양한 기능들(undo, 시간여행 등등)을 활용할 수 있음

## 시간 여행 및 로깅

> 확장 프로그램을 이용한 시간 여행

1. redux devTools 확장 프로그램 설치
2. 개발자 도구에서 Redux 탭 활용하기 위한 셋팅 코드(하단)

```javascript
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

##### 참고 - [강의 소스 코드](https://github.com/egoing/redux-tutorial-example/tree/e203578a8b5002bc3a0443ddf18b58a2323a2896)