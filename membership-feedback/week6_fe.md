## 배운 내용

### Redux, MobX

- 리액트 상태 관리 라이브러리
- Observable State

### MVC, MVVM, MVP, FLUX 등의 차이를 비교하는 것은 의미가 없다. 각각이 가진 의미와 철학을 이해하는 것이 중요하다.

- 그래야 각 상황에 대한 문제를 해결하기 위해 어떤 것을 적용하는 것이 좋을지 판단할 수 있다.

### 모델

- 데이터 그 자체
- states management : 상태의 변경을 관리하는 주체(뷰와 상당히 밀접한 관계를 가질 수밖에 없다.)
- 상태 변화를 전달
- 이미지 같은 정적인(상태 변화가 없는) 데이터는 뷰가 관리하는 것이 좋다.

### 디렉토리의 같은 depth에 있는 파일, 폴더들은 대등한 관계를 갖는 것이 좋다.

## 알게된 내용

### CSS) 박스 엘리먼트에 `z-index`를 주면 안에 위치하는 엘리먼트들의 `z-index`는 상속된다.

- 그러므로 해당 박스 엘리먼트 외부에 더 높은 `z-index`를 갖는 요소가 있다면 자식 엘리먼트에 아무리 더 높은 `z-index`를 주더라도 아무 효과 없다.

### CSS) `overflow-x`, `overflow-y` 속성을 통해 가로, 세로에 대해 따로 처리할 수 있다.

### CSS) `min-width`, `min-height` 속성을 통해 동적으로 변하는(예를 들어 textarea)에 대해 최소 크기를 지정할 수 있다.

### CSS) drag & drop 구현 시 원래 위치의 element의 왼쪽 상단 자리에 복사하기

- `getBoundingClientRect().x`와 `getBoundingClientRect().y`를 통해 절대 좌표를 구할 수 있다.
- 새로 복사하려는 element 또한 왼쪽 상단을 기준으로 만들어진다.
- 여기서 주의해야 할 점은 element에 `margin`이 있을 때, 기준 좌표를 기준으로 `margin`이 먹는다.
  - `margin` 만큼 보정하던지 `margin`을 빼던지 하면 된다.

### HTML, CSS) 폰트를 CSS에만 추가한다고 되는 것이 아니다.

- [구글 웹 폰트](https://fonts.google.com/)에서 HTML 헤더에 CDN으로 추가해야 CSS에서 적용할 수 있다.
- 로컬에는 캐시로 폰트가 남아서 적용되는 것일 뿐!

### JS) 유사 배열에 배열 메서드 사용하기

- `DOM` 배열은 진짜 배열이 아닌 유사 배열 객체!
- `call` 메서드를 통해 첫 번째 인자로 `유사 배열`을 전달, 두 번째 인자부터 사용하려는 배열 메서드와 같은 형태를 주면 된다.

```javascript
Array.prototype.forEach.call(
  document.querySelectorAll(".todo-wrapper"),
  todo => {
    console.log(todo);
  }
);
```

```javascript
[].forEach.call(document.querySelectorAll(".todo-wrapper"), todo => {
  console.log(todo);
});
```

- `Array.prototype` 대신 빈 배열 `[]`을 사용할 수 있다.

### `nextSibling`은 공백이나 줄바꿈도 하나의 노드로 인식하기 때문에 이벤트객체와 타겟객체 사이를 이어서 표현해 주어야 한다.

- 아니면 `nextSibling.nextSibling` 으로 표현하면 제대로 객체를 반환한다.
- 따라서 `nextElementSibling`을 사용하는 것이 좋다.
  [참고](https://iamawebdeveloper.tistory.com/58)

### `element.cloneNode(true)`로 엘리먼트 복사 후에는 참조값이 생기며 `remove`해도 HTML에서 사라지지만 참조가 undefined가 되지 않는다.

- `remove` -> `appendChild` -> ... 재사용 가능!

### async / await 관련 이슈

- 문제 내용
  ![뭐지?](https://user-images.githubusercontent.com/47619140/66378891-67d55300-e9ef-11e9-983e-7172a85692d1.png)
  `todos: Array(0)`인데 까보면 들어 있다?!

- 문제의 코드 일부

```javascript
async function foo() {
    await ... // resolved를 기다려야 하는 부분
    listsData.forEach(async list => {
        list.todos = await this.setTodosData(list.id); // resolved를 기다릴 것으로 예상했던 부분
    });
}
await foo();
console.log(list);
```

두 번째 `await`를 기다리지 않았다..

- 문제의 원인

  - `forEach`의 callback이 `async` 함수로, 내부의 await를 기다리지만 `listsData`의 길이 만큼 호출되는 callback 자체를 `await`하는 부분은 `forEach`의 내부에 존재해야 하지만 `Array.prototype.forEach`는 `async`를 고려하고 만들어지지 않았기 때문에 `foo()`는 `forEach`를 기다리지 않고 종료된다.
  - 그럼 개발자 도구의 결과는 왜 저럴까?
    - 예상보다 빨리 종료된 `foo()`에 의해 `console.log(list);`가 먼저 실행되었다. 하지만 `foo()`의 `forEach`의 callback은 `this`라는 참조를 갖고 있기 때문에 `console.log(list);`가 실행되고 난 후에 입력된 것 같다(?)
    - 하지만 개발자 도구가 너무 똑똑해서 `console.log()`의 출력과 다르게 객체 내부를 보여주는 것 같다. 아마도..

- 문제의 해결 : `for-of`문으로 해결(callback이 없음)

- 회고 : 문제의 시작은 `함수형 프로그래밍`을 제대로 하지 못해서 `side effect`가 생길 만한 충분한 조건이 있었다고 생각한다. (`this`를 `forEach`내부적으로 접근하는 것은 함수형이 아님..) 그리고 생각보다 `for-of`가 유용하게 사용된다.

### 모든 자식 요소 삭제하기

```javascript
while (this.todoContainer.hasChildNodes()) {
  this.todoContainer.removeChild(this.todoContainer.firstChild);
}
```

### (아니었음)클로저 관련 이슈

- 문제의 상황 : 상위 컴포넌트에서 이루어져야 할 상태 변화를 하위 컴포넌트에 의해(but, 하위 -> 상위 접근은 말이 안됨) 이루어지도록 하기 위해 handler 메서드를 하위 컴포넌트 생성 시 전달한다. 상위 컴포넌트의 handler 내에서 `constructor`에서 정의되지 않은 멤버 변수나 메서드를 사용하려 한다면 `null` 에러가 발생한다.
  - `constructor`에서 정의되지 않은 멤버 변수나 메서드는 handler 메서드가 만들어지는 시점보다 앞인지 뒤인지 보장할 수 없다.(아마 뒤일 것)
  - 하위 컴포넌트로 전달되는 시점에 정의되지 않은 변수나 메서드를 사용하는 handler 함수를 전달한 뒤에 해당 멤버 변수나 메서드에 값이 할당되더라도 전달되는 시점이 `closure`로 이미 보내졌기 때문에 하위 컴포넌트에 의해 handler가 호출되는 시점이 할당 이후라고 하더라도 `closure`에 의해 `null` 에러가 발생하는 것이다.
    (**수정 : `constructor`에서 할당되어도 handler에서 사용 불가..**)
- 임시 해결책 : 하위 컴포넌트 생성 시 상위 -> 하위 컴포넌트로 handler에서 사용될 변수를 전달하고 handler 호출할 때 다시 돌려 받는 방법..
  - 좋은 방법은 아닌듯..
- **(2019.10.10 수정) 클로저 때문인 줄 알았으나 그냥 this 바인딩 문제였음..**
