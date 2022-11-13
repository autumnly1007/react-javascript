/* @jsx createElement */
import { render, createElement } from './react.js';

function Title(props) {
  return <h1>{props.children}</h1>;
}

function Item(props) {
  return <li style={`color: ${props.color}`}>props.children</li>;
}

const vdom = (
  <p>
    <Title label='react'>React 잘 만들기</Title>
    <ul>
      <Item color='red'>첫 번째 아이템</Item>
      <Item color='blue'>두 번째 아이템</Item>
      <Item color='green'>세 번째 아이템</Item>
    </ul>
  </p>
);

render(vdom, document.querySelector('#root'));
