# Next.js

#### Library vs Framework

library를 사용할 때는 원할 때 언제든 어떤 방법으로든 부르면 됨.

framework는 특정한 규칙을 따라야 함



React : Client Side Rendering 

=> 브라우저가 모든 것을 다 한다. 초기 로딩에 시간이 걸릴 수도 있다.  **클라이언트 측에서 최초에 1번 서버에서 전체 페이지를 로딩하여 보여준다. 그 이후에는 사용자의 요청이 올 때마다, 자원(Resource)을 서버에서 제공한 후, 클라이언트가 해석하고 렌더링 하는 방식이다.** 

Next.js : Server Side Rendering

=> 

![image-20220303125449951](C:\Users\qlrqo\AppData\Roaming\Typora\typora-user-images\image-20220303125449951.png)

#### Hydration

react.js를 프론트엔드 안에서 실행하는 것



#### NEXT.JS가 작동하는 과정

next.js는 react.js를 백엔드에서 동작시켜서 페이지를 미리 만드는데(component를 미리 rendering함)  렌더링이 끝났을 때 HTML이 되고, next.js는 그 html을 페이지의 소스코드에 넣어준다. 그럼 유저는 자바스크립트와 react.js가 로딩되지 않아도 콘텐츠를 볼 수 있다. 그리고 react.js가 로딩되었을 때, 기본적으로 이미 존재하는 것들과 연결이 되어서 일반적인 react.js앱이 되는 것이다. 



- anchor는 사용하지 않기! Link를 import해서 사용해야 함!!

![image-20220303131748538](C:\Users\qlrqo\AppData\Roaming\Typora\typora-user-images\image-20220303131748538.png)



- useRouter를 쓰면 현재 위치에 대한 정보를 얻는다.