# [Next.js](https://nomadcoders.co/nextjs-fundamentals/lobby)

## 💻 SET UP

```javascript
(terminal)

without TS > npx create-next-app@latest

with TS     > npx create-next-app@latest --typescript
```

## 💻 RUN PROJECT

```javascript
(terminal)

(개발자 모드로 실행)npm run dev
(빌드 후 실행)npm run build => npm start
```

## 👀 OVERVIEW

### ✧ Framework vs Library

|                    | framework                                                                       | library                                   |
| ------------------ | ------------------------------------------------------------------------------- | ----------------------------------------- |
| 개념               | 소프트웨어의 특정 문제를 해결하기 위해 상호 협력하는 클래스와 인터페이스의 집합 | 필요한 기능들이 모여있는 코드의 묶음      |
| 코드 흐름의 제어권 | 자체적으로 가지고 있음                                                          | 사용자에게 있으며 필요한 상황에 가져다 씀 |

> 즉, framework에는 **제어의 역전 (IoC, Inversion of Control)** 이 적용되어 있다는 것

### ✧ pages

- pages 폴더 내 파일명에 따라 route 결정됨
  > about.js => /about 페이지에 렌더링
- **/(기본 home 페이지)** 는 index.js 렌더링
- next.js에서는 404 에러 페이지 기본 제공함
- component를 export default 해야함

### ✧ Pre-rendering(Next 장점!!)

> CSR(Client Side Rendering) - 기존 React.js 방식

- browser가 user가 보는 UI를 만드는 모든 것을 하는 것
  1. browser가 server에서 JS 가져옴
  2. JS이 전달되었을 때 client-side(브라우저)에서 비로소 UI 생성함

> Next.js는 앱의 초기 상태를 활용해 미리 렌더링 함

- 과정

  1. next.js는 react.js를 백엔드에서 동작시켜 페이지를 미리 만듬
  2. 만들어진 컴포넌트(페이지)들을 render함

     ⇒ pre-rendering(SEO에 매우 좋음)

  3. 렌더링이 끝났을 때 그것은 HTML이 됨
  4. next.js는 이 HTML을 페이지의 소스코드에 넣어줌
  5. 따라서 유저는 JS와 react.js가 로딩되지 않았더라도 콘텐츠를 볼 수 있음
  6. react.js가 로딩되었을 때 이미 존재하던 HTML과 연결(hook)됨

     ⇒ **Hydration(=== react.js를 fe(pre-rendering 된 HTML)안에서 실행하는 것)**

> **Warning: Text content did not match**

- Hydration 과정에서 생기는 오류
- 언제?
  - 서버에서 내려준 HTML 결과물과 Hydration 과정에서 만들어낸 HTML 결과물이 다를 때
  - ex) Date.now() 메소드 사용 시 SSR(Server Side Rendering)때의 now와 Hydration 할 때의 now가 다름

### ✧ Routing

```javascript
import Link from "next/link";

import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav>
      <Link href="/">
        <a
          className="hello"
          style={{ color: router.pathname === "/" ? "red" : "blue" }}
        >
          Google
        </a>
      </Link>
    </nav>
  );
}
```

> a 태그에서만 클래스, 스타일 등 적용가능 **useRouter()** : next에서 제공하는 hook (**pathname** property 활용)

- 기존 html link 태그로 route 처리를 할 경우 page 이동 때마다 새로고침을 하게 됨(쓰지 말자!!)
- next/link 사용하되 css 작업을 위해 useRouter를 사용하는 방식을 추구하자!

### ✧ CSS 적용방식

> tag에 바로 style={{}} 적용

```javascript
<a
  className="hello"
  style={{ color: router.pathname === "/" ? "red" : "blue" }}
>
  Google
</a>
```

> CSS Modules

- .module.css 파일 경로를 import해 사용하는 방식
- 여러 컴포넌트에서 같은 클래스 이름을 사용해도 브라우저 상 해당 태그를 봤을 때 랜덤으로 클래스명이 정해지기 때문에 사용하기 좋음
- 하지만 클래스명을 기억해야 하고 여러 파일을 돌아다녀야 한다는 단점이 있음
- 클래스명을 여러개 붙일 때

```javascript
import styles from "./NavBar.module.css";

...

<a

className={`${styles.link} ${

router.pathname === "/" ? style.active : "" }`}

>

Google

</a>
```

또는

```javascript
import styles from "./NavBar.module.css";

...

<a

className={[

styles.link,

router.pathname === "/" ? style.active : ""

].join(" ")}

>

Google

</a>
```

> Styles JSX(!!가장 추천하는 방식!!)

- Next.js의 고유방식
- import 작업 필요 없음
- 임포트한 컴포넌트에서 같은 이름의 클래스를 사용하더라도 적용되지 않음!! => 독립적
- 임포트한 컴포넌트도 적용시키고 싶으면 <style jsx global> 사용하면 됨
  ⇒ but, 같은 컴포넌트 이더라도 페이지(url)이 변경되면 적용되지 않음

```javascript
//Hello.js

import Link from "next/link";

import { useRouter } from "next/router";

export default function NavBar() {

const router = useRouter();

return (

<nav>

<Link href="/">

<a

className="hello"

>

Google

</a>

</Link>

<style jsx>{`

.hello{

color: red;

}

`}</style>

</nav>

);

}

//index.js

import Hello from "Hello.js";

export default function Welcome() {

return (

<div>

	<h1 className="hello">Welcome!</h1>

	<Hello />

</div>

);

}
```

- hello.js 의 a 태그는 스타일이 적용되지만 index.js의 h1에는 스타일 적용 안됨

- 컴포넌트 내부로 범위가 한정되기 때문

| Next.js       | Vue.js           |
| ------------- | ---------------- |
| < style jsx > | < style scoped > |

### ✧ Custom App

> Global Styles (CSS 전역으로 적용 시)

- < style jsx global > 형식
- But, 전역 적용을 위해서는 \_app.js 활용 권장
-

> Next.js의 렌더링 순서

1. \_app.js (내부에 App 컴포넌트 호출함)

2. index.js

3. others...

> \_app.js(next app의 blueprint!)

- 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트
- 주 사용 목적?
  모든 컴포넌트에 공통으로 적용할 속성 관리

  ```javascript
  import NavBar from "../components/NavBar";

  import "../styles/globals.css";

  export default function MyApp({ Component, pageProps }) {
    return (
      <>
        <NavBar />

        <Component {...pageProps} />
      </>
    );
  }
  ```

  - Component를 Props 형태로 내려받는 형식

  1. Component prop - 렌더링 하길 원하는 페이지

  - 위 코드에서는 globals.css와 NavBar 컴포넌트 공통 적용

  - **즉, 페이지들이 변화해도 layout이 유지됨**

  - 서버에 요청한 페이지가 Component의 속성값

  - ex) http://localhost:3000/hello -> Component : hello

## ⭐️ ADDITIONAL CONCEPTS

### ✧ Patterns

> html > head > title 변경 시

```javascript
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home | Next.js</title>
      </Head>
    </div>
  );
}
```

또는

```javascript
//title.js

import Head from "next/head";

export default function Title({ title }){

return(

<Head>

<title>{title} | Next.js</title>

</Head>

);

}

//home.js

import Title from "../components/title";

export default function Home(){

return(

<Title title="Home"></Title>

)

}

//about.js

import Title from "../components/title";

export default function About(){

return(

<Title title="About"></Title>

)

}
```

=> page 별로 props를 내려 head title을 다르게 설정

### ✧ Component Lifecycle

(용어)

**Mounting**: 컴포넌트가 화면에 나타남

**Updating**: 컴포넌트가 업데이트됨

**Unmounting**: 컴포넌트가 화면에서 사라짐

### ✧ Redirect and Rewrite

> Redirect

source url로 갔을 때 destination url로 자동 연결

> Rewrite

유저를 redirect 시키긴 하지만 url이 변하진 않음(destination url 상태이지만 url은 계속 source url)

> example code

```javascript
//next.config.js
const API_KEY = process.env.API_KEY;
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};
```

### ✧ .env

> 주로 API key를 숨기기 위해 사용

```javascript
// .env
API_KEY = abcde...

//index.js 등
const API_KEY = process.env.API_KEY;

//.gitignore(추가해줘야 깃 푸쉬안됨)
.env
```

### ✧ Server Side Rendering

어떤 사이트의 경우 미리 HTML을 렌더링 하고 이후에 데이터가 오는 방식(Next.js의 Pre-rendering)이 아닌 data fetching을 모두 마친 후에 유저에게 컴포넌트를 보여주고 싶을 수 있다.(SSR)

> 이러한 경우를 위해 next.js에서는 getServerSideProps()를 제공한다.

```javascript
//SSR의 결과(getServerSideProps()의 결과)를 props로 전달받음(=> Hydration)
export default function Home({ results }){
...
}

//여기서 무엇을 return하던지, props로써 page에게 전달함
//async await 필수 아님
export async function getServerSideProps(){
	const { results } = await (await fetch(`/api/movies`)).json();
	return {
		props: {
			results,
		},
	};
}
```

> getServerSideProps()

1. 이 코드는 백엔드(Server)에서 돌아가기 때문에 이 함수 내에서 api key를 사용하면 .env 파일 필요없이 api key를 숨길 수 있다

> 즉, 선택이 가능하다!!

API가 돌아오기 전까지 화면에 아무것도 보이지 않도록(SSR)할 것인지,

loading화면을 보여준 후 데이터를 받는 것이 좋은가(pre-rendering)

> SSR의 단점

- fetching data가 바뀌면 매번 새로운 페이지를 요청하게 됨(즉, 자주 데이터의 변환을 페이지에 반영해야 하는 경우 사용하는 것이 좋다.)
- Static Generation이 매 빌드시에 pre-rendering 하는 방식인 반면, SSR은 매 request마다 HTML이 server-side로 새로 생성되는 방식!

### ✧ Static Generation vs Server Side Rendering

> Static Generation

1. HTML이 build time에 생성이 되고, 매 요청시마다 재사용됨
2. Static Generation을 사용하려면 페이지 컴포넌트를 export하거나, getStaticProps를(+ 필요하다면 getStaticPaths 까지) export!
3. 유저의 요청이 있기 전에 사전 렌더링이 될 수 있는 페이지들에 적절한 방식
4. 추가적으로 데이터를 가져오기 위해 Client Side Rendering을 사용할 수도 있음

> Server Side Rendering

1. HTML이 매 요청시마다 생성됨
2. 서버사이드 렌더링을 사용하는 페이지를 만들기 위해서는, getServerSideProps를 export해야 함
3. SSR의 퍼포먼스가 Static Generation보다 안 좋기 때문에, 진짜 꼭 필요한 경우에만 사용

### ✧ Dynamic Routes

> [id].js 페이지의 경우 router에 id라는 이름으로 query를 가지고 해당 페이지를 뿌림

> 상위 페이지에서 상세 페이지로 들어갈 경우 주로 쓰이는데, router query로 데이터를 전달하는 방식

> 때문에, 상위페이지를 거치지 않고 다른 페이지에서 상세 페이지로 바로 들어갈 경우에는 데이터를 로드하지 못함 ⇒ 그래서 redux로 데이터를 관리하는 걸까,,?

> [...params].js 와 같이 router에 params라는 이름으로 query를 배열로 만들 수 있음

```javascript
// pages/index.js
router.push(`/movies/${title}/${id}`);

// pages/movies/[...params].js
// 2.return 값 props로 받음
export default function Detail({ params }){
	const [title, id] = params || [];
	...
}

//1. SSR로 router query(params) 받아서
export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}
```

### ✧ useRouter vs Link

> useRouter

```javascript
import { useRouter } from 'next/router'

...

//export default 내
const router = useRouter();

...

router.push(
	{
		pathname: `/url`,
		query: {
			key: value,
		},
	},
	`/url`
);
```

> Link

```javascript
import Link from 'next/link';

...

<Link
	href={{
		pathname: `/url`,
		query: {
			key: value,
		},
	}}
	as={`/url`}
>
	<a>{sth}</a>
</Link>
```
