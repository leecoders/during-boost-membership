## 배운 내용

### DOM 조작은 상대적으로 비용이 많이 드는 작업이다.

- DOM 변경은 최소화해야 한다.
- createElement -> remove 등의 반복은 대체 방법이 필요하다. (불필요한 노드 생성/삭제는 최소화해야 한다.)
  - 대체 방법 : 안보이게 다른 곳에 보내놓거나 해서 가져오는 등의 방법이 좋다.

### destructuring, for-of

- for문보다는 for-of를 사용하려고 해보자

### 로직과 관련없는 긴 코드는 줄이려고 노력해보자

### delegation

- forEach 대신에 사용 가능

### Fetch API

- 데이터 통신 시 에러처리 방법에 대해 고민해보자
- 방어적인 프로그래밍에 대한 고민

### Window onload, DOMContentLoaded

- 둘의 차이?
  - DOMContentLoaded - HTML 이 모두 로드되고, DOM 트리가 완성되었지만, 외부 리소스(img etc) 가 아직 로드되어지지 않았을 때
  - load - 브라우저에 모든 리소스(img, style, script, etc) 가 로드되었을 때
- 성능 측정의 기준
- 개발자 도구의 network 탭 하단에 있음(새로고침하면 시간 측정됨)

### auto slide

- setInterval & setTimeout을 통해 실행할 수도 있음
- setInterval은 잘 안쓰인다.

### 좋은 UX는 좋은 기술에 의해 나온다. 많이 고민해보자

- transform이 진행되는 도중에 마우스 올리면 잠깐 멈췄다가 마우스 치우면 마저 실행되도록 할 수 있을까?

### 캐로셀은 사실 훌륭한 UI가 이미 존재

- 나중에 쓸 일이 있으면 존재하는 라이브러리 사용하고 비즈니스 로직에 좀 더 집중!

### 설계

- 동작에 대한 설계가 필요
  - 하지만 뭘 알아야 설계도 할 수있음..
  - 그래서 어느정도 이해가 있으면 설계가 쉽고 그렇게 해야된다.
- 설계 -> 구현 -> 실패 -> 재설계 -> 구현 -> ...
- 설계 시에는 "좋은 방법일까?"와 같은 고민이 필요
- 건축에서의 설계는 완벽한 설계 -> 되돌아오는 것이 불가능
  - 하지만 소프트웨어에서의 설계는 빠른 설계 -> 설계에 대한 검증(구현) -> 다시 설계 -> ... 의 반복이 가능하고 이렇게 하는 것이 좋다.

### Module로 나눠서 개발

- ES Modules를 사용한 Module 관리 방법이 표준으로 자리잡고 있다. (아직은 모듈 번들러 도구가 필요)

### 템플릿 분리

- 템플릿은 HTML을 문자열로 저장하는 것이기 때문에 로직과는 관련이 없다. 코드를 별도로 분리해서 효율적으로 관리할 필요는 있다.

### 재사용

- 재사용이 서비스의 궁극적인 목표는 아니다.
- 라이브러리를 지나치게 많이 사용하면 빠른 개발은 가능하지만 그만큼 코드 관리가 어렵다.
  - 그래서 큰 회사는 자체 라이브러리를 사용한다.

### querySelector는 상당히 빠르지만 반복적으로 DOM을 탐색해야 할 때는 변수에 담아놓고 사용하는 것이 훨씬 좋다.

### commit의 단위는 정상 작동하는 코드여야 한다.

- 언제든지 해당 시점으로 되돌릴 수 있는 코드여야 한다.
- 테스트 코드가 패스되지 않은 코드는 커밋할 수 없다.
- 설계와 다른 테스트를 해보고 싶다면 브랜치를 새로 파서 작업해보고 -> merge or 폐기

### 파일, 함수 이름 앞에 `_`가 붙으면 통상적으로 private(외부 접근 제한)의 의미가 있다.

### 생성자 함수에는 비즈니스 로직이 들어가면 안된다.

### inline 속성 외에도 getcomputedstyle를 사용하면 속성을 뽑아낼 수 있음

### 응집도와 모듈화는 상충되는 개념일 수 있다. 적절히 둘을 만족시킬 필요가 있다.

### Single Page는 entry point에서 부터 뻗어 나가는 구조를 갖는다.

### JS는 동적으로 타입이 결정되어 코드에 타입을 지정하지 않기 때문에 변수명을 구체적으로 작성할 필요가 있다.

### 매직 넘버의 사용은 의미를 이해하기 힘들다.

- 따로 변수로 선언해서 의미를 부여하자

### 의미가 복잡해지면 명확한 이름의 함수로 분리해서 의미를 명확히 하자

### DOM을 탐색하기 위해 children, firstElementChild 등은 의존성을 갖기 때문에 수정 시 에러 가능성이 있다. 가능하다면 되도록 속성을 사용해서 DOM을 찾는 방법을 사용하자.

### flicking

### Lazy loading

- 당장 필요한 자원이 아니라면 나중에 받아오도록 함
- 바닐라로 나중에 가져오도록 하는 것은 전통적으로 많이 쓰이는 중
- 최근 모듈번들러는 Code Splitting이라는 기술을 사용 중
- 알아야 할 개념

### SASS

- 라이브러리나 프레임워크를 쓸 때 모든 것을 이해하려고 하면 안됨
  1. 철학을 이해한다. -> 본질을 알 수 있음
  2. getting started를 읽는다. -> 다 읽으면 오래 걸림
  3. 사용!
- 변수, mixin, nesting(중첩. 너무 깊지 않게..)
- css에도 variable을 사용할 수는 있다.
- css 라이브러리도 많지만 css에 대한 깊은 이해가 필요하다.

### 좋은 코드에 대한 기준은?

- 좋은 코드에 대한 욕심이 있다면 발전 가능성이 있는 개발자!
- Readable code : 가독성을 높이기 위한 주석은 좋지 않다. 알고리즘이 복잡하다면 주석이 필요하다.
- Testable code
- Maintainable code

### front-end와 back-end 나누어 관리하기

- 프론트엔드의 정적 파일들을 netlify, S3 등의 서비스를 활용하여 서버리스로 배포할 수 있다.
- 서버와 통신이 필요한 부분에는 fetch를 활용하여 요청을 보내면 되고, 백엔드를 서버에 배포하면 따로 관리할 수 있다.
- netlify는 Github에 연동하여 Push 될 때마다 자동으로 빌드, 배포 해주는 서비스!

### 웹팩

- 웹팩으로 js파일을 묶은 뒤 html에서 기존의 js파일이 아닌 웹팩에 의해 생성된 js파일의 경로로 변경해주어야 한다.
- 웹팩으로 묶은 js파일은 로컬에서는 열리지 않는다. 깨져서 나온다..

## 알게된 내용

### lazy loading : 이미지 로딩 딜레이 이슈 해결 방법 중 하나

### 처음부터 모듈화하면 어렵다. 전체적으로 쉽게 만들어 놓고 리팩토링 과정에서 모듈화하자.

### Promise 패턴에서 then은 바로 실행된다. then의 콜백이 resolved된 후에 실행되는 것

### transition end? translate3d?

### ele.children을 통해 자식 엘리먼트들을 배열로 얻을 수 있다.

### cloneNode()를 통해 엘리먼트를 복제할 수 있고, cloneNode(true)를 통해 하위 엘리먼트들 까지 전부 복사할 수 있다.

### 클래스 메서드에 get, set 함수 사용하면 함수 호출 없이 사용할 수 있다(?)

### setInterval은 실행 직후에 id를 반환한다.

### box 엘리먼트 가운데 정렬 하기 위해 상위 box 엘리먼트에 flex, `justify-content: center;`를 주면 화면 가로 방향으로 줄어들었을 때 좌우 overflow가 똑같이 생김(왼쪽 overflow는 스크롤도 안됨.. 그냥 범위 넘어가버림)

- 해결책 : `margin: 0 auto;`를 주면 가운데 정렬 + 왼쪽 overflow 방지 효과 있음

### CSS의 background에 이미지 url을 JS에서 동적으로 넣을 때, background-size는 그 다음에 넣어야 한다. (순서가 중요)

```javascript
setImage = () => {
  this.parentElement.style.background = `${this.cardColor} url("${this.cardImageSrc}") no-repeat 29% 50%`;
  this.parentElement.style.backgroundSize = `85rem 50rem`;
};
```

- css 파일에서 background-size를 따로 넣어주면 background를 지정한 순간 이전 속성이 사라져서(왜 그런지는 모르곘지만) 아래처럼 된다.
  ![broken_css](https://user-images.githubusercontent.com/47619140/65154519-9c946100-da66-11e9-822f-ccdd5c462ac5.png)

### element.children은 자식 요소에 대한 `HTMLCollection` 타입을 반환하고 `children[index]`를 통해 접근할 수 있지만 `Array` 타입이 아니기 때문에 forEach 등의 배열 프로토타입 메서드는 사용할 수 없다.

### CSS) 화면에서 안보이게 하기
1. `display: none;` : 아예 사라지게 하는 것. 보이지도 않고 해당 공간도 존재하지 않게 됨
2. `visibility: hidden;` : 보이지만 않고 해당 공간은 존재. width와 height값을 주었다면 그만큼 공간은 존재하게 됨
- `display: none;`의 반대를 JS에서 설정하기 위해
  - inline element일 경우 `inline`
  - block element일 경우 `block`