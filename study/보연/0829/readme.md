## 08/28 (수)

# React 기초 문법

- state
  - const [value, modifier_function] = React.useState();
    ```jsx
    import { useState } from "react";
    const [counter, setValue] = useState();
    ```
    - 반환값으로 array를 준다.
    - useState(초기값);을 줄 수 있다.
    ```jsx
    function App() {
      const [counter, setValue] = useState(0);
      const onClick = () => setValue((prev) => prev + 1);
      return (
        <div>
          <h1>{counter}</h1>
          <button onClick={onClick}>click me!</button>
          <Button text={"Continue"} onClick={onClick} /> //실행 안됨
        </div>
      );
    }
    ```
    - setValue로 현재 상태값을 불러와서 상태를 변화할 수 있다.
    - 버튼을 누를 때마다(=상태가 변할때마다) 모든 컴포넌트가 리렌더링 된다.
  - 처음에만 render되고 다른 state변화에는 실행되지 않도록 하기
    - 예를 들어 api호출
  - state 배열에 값 넣기
    - 직접적으로 배열을 넣을 수 없기 때문에 setOO 함수로 넣어야한다.
    - 직접적으로 값 넣기
      ```tsx
      setToDos((currArray) => [toDo, ...currArray]);
      ```
      - toDos 배열에 toDo라는 원소를 넣어서 새로운 배열을 만듦
      -
  - `state((현재 state) => {});`
- `배열.map((item, index) ⇒ { //…. })`
  - 배열의 모든 item에 대해 실행. map에서 리턴한 값으로 새로운 배열 생성
    - <li>로 생성을 한다면 각 li는 고유의 key값을 가져야한다.
    ```jsx
    <ul>
      {toDos.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
    ```
- props
  ```jsx
  function Button({ text }) { //props
    return <button>{text}</button>;
  }

  export default Button; //App.js에서 가져올 수 있다.

  //App.js
  import Button from "./Button";

  function App() {
    return (
      <div>
        <h1>Welcome back!</h1>
        <Button text={"Continue"} />
      </div>
    );
  }

  export default App;

  ```
  - prop의 type 명시
    - `npm i prop-types`
    - 다양한 타입을 지정할 수 있다.
      ```jsx
      import propTypes from "prop-types";

      function Button({ text }) {
        //props
        return <button className={styles.btn}>{text}</button>;
      }

      Button.prototype = {
        text: propTypes.string.isRequired,
      };
      ```
  - props는 object다.

```tsx
function Movie({ id, coverImg, title, summary, genres }) {
  return (
    <div>
      <img src={coverImg} alt={title} />
      <h2>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <p>{summary}</p>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
```

# Javascript 기초와 심화

## JavaScript 기본

- Javascript는 자바스크립트 엔진이라는 프로그램을 통해 실행된다. 해석을 해줌 (= 게임 구동기)
  - 크롬이나 사파리같은 웹 브라우저에 기본으로 탑재되어있음
- VSCODE
  - error lens : 에러가 발생하면 뭐때문에 에러가 났는지 하이라이트 표시
  - live server
    - 코드 변경사항이 발생하면 자동으로 새로고침
    - 하단에 🚫표시를 누르면 라이브 서버를 종료할 수 있다
- JS 문법
  - const 상수는 초기값을 반드시 할당해야한다 (이후 재할당이 불가하기 때문)
  - undefined : 아무런 값도 할당하지 않았을 때 자동으로 들어가는 값. 변수를 초기화하지 못했거나 존재하지 않는 값을 불러올 때
  - null : 직접 ‘아무 값도 아니다’를 표시하는 값
  - null 병합 연산자
    - 존재하는 값을 추려내는 기능 (null, undefined가 아닌 값을 찾아내는 연산자)
      ```tsx
      let var1;
      let var2 = 10;
      let var3 = 20;

      let var4 = var1 ?? var2; // 10
      let var5 = var1 ?? var3; // 20
      let var6 = var3 ?? var2; // 앞의 값 = var3이 리턴

      let userName;
      let userNickName = "Winterlood";

      let displayName = userName ?? userNickName; // Winterlood
      ```
  - typeof 연산자
    ```tsx
    let var1 = 1;
    var1 = "hello";

    let t1 = typeof var1; // string
    ```
  - 함수
    - 익명함수 : 선언과 동시에 값을 할당하면 functio OOO() 이 부분에 이름은 어차피 호출을 못하는 이름이기 때문에 생략이 가능하다.
    - 화살표함수 : function마저 없애버리고 = > 를 추가한다.
      ```tsx
      let f = () => {
        return 1;
      };
      ```
    - 콜백함수 : 자신이 아닌 다른 함수에 인수로써 전달된 함수를 의미
      ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d51cbaf0-9492-4156-90cf-14cb81b94923/f8c018b5-e42b-461e-a6a3-b8a08222343c/Untitled.png)
      - 매개변수로 함수로 전달하면 그 함수 내에서 매개변수로 호출이 가능
      - 다른 함수main에 인수로써 전달된 함수sub를 콜백함수라 한다.
      ```tsx
      main(() => {
        console.log("sub"); //이렇게 축약할 수도 있다.
      });
      ```
    - 응용 : 중복 코드를 줄일 수 있다.
  - 객체
    - 상수 객체 : const animal = {};
      - animal = 1; 자체는 에러가 발생하지만, property값을 수정하거나 추가하거나 삭제는 문제가 되지 않는다.
      -

## JavaScript 심화

1. Truthy, Falsy
   1. Falsy : `undefined`, `null`, `0`, `-0`, `NaN`, `“”`, `0N`(big integer)
   2. Truthy : 위를 제외한 나머지 값
   3. 활용 사례?
      1. 코드 상의 실수로 undefined 객체를 .으로 접근할 때 에러가 발생한다.
      2. 조건문을 넣어 객체가 undefined 인지 검증하는 절차 필요
2. 단락 평가
   1. 논리 연산자에서 첫 번째 피연산자의 값만으로도 연산 결과를 확정할 수 있다면 두번째 피연산자 값은 접근조차 하지 않는다

      ```

      let varA = false;
      let varB = true;

      console.log(varA && varB);

      console.log(varB || varA);
      ```

      → 유용하게 쓸 수 있는건 boolean 리턴이 나온 함수에서도 적용이 가능

   2. truthy와 falsy한 값도 적용이 가능

      ```jsx
      function printName(person) {
        const name = person && person.name; //undefined면 단락평가에 의해 person이 저장
        console.log(name || "person의 값이 없음"); //단락평가에 의해 뒤의 True값이 출력된다.
      }

      printName("야호");
      ```

      → 만약 name이 undefined라면 뒤의 string이 출력된다

      - 객체(`{name: “김씨”}`)로 잘 전달되었다면 두번째 인자인 person.name이 name변수에 저장이 된다.
      - 두번쨰는 둘다 truthy한 값이므로 첫번째 피연산자가 출력이된다.
      - 즉, `T || T`에서는 첫번째 피연산자, `T && T`는 두번째 피연산자가 반환된다.
