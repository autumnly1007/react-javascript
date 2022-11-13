/* @jsx createElement */
import { render, createElement, Component } from './react.js';

class Title extends Component {
  // 클래스 컴포넌트는 render 함수 필수
  render() {
    return <h1>{this.props.children}</h1>;
  }
}

function Item(props) {
  return <li style={`color: ${props.color}`}>{props.children}</li>;
}

const App = () => (
  <p>
    <Title label='react'>React 정말 클래스 컴포넌트 잘 만들기</Title>
    <ul>
      <Item color='red'>첫 번째 아이템</Item>
      <Item color='blue'>두 번째 아이템</Item>
      <Item color='green'>세 번째 아이템</Item>
    </ul>
  </p>
);

render(<App />, document.querySelector('#root'));
