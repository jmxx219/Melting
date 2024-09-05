# 08/28 (수)

## React 기초 문법

- state
  - const [value, modifier_function] = React.useState();
    ```jsx
    import { useState } from 'react';
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
          <Button text={'Continue'} onClick={onClick} /> //실행 안됨
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
      import propTypes from 'prop-types';

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
