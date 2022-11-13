const hooks = [];
let currentComponent = 0;

export class Component {
  constructor(props) {
    this.props = props;
  }
}

export function createDOM(node) {
  // 문자열일 경우 문자열 노드로 반환
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  // 태그에 해당하는 요소 생성
  const element = document.createElement(node.tag);

  // 속성 넣어주기
  Object.entries(node.props).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  // 자식 요소 만들기
  if (node.children) {
    node.children.map(createDOM).forEach(element.appendChild.bind(element));
  }
  return element;
}

// props 를 리턴하는  헬퍼 함수
function makeProps(props, children) {
  return {
    ...props,
    children: children.length === 1 ? children[0] : children,
  };
}

function useState(initValue) {
  let position = currentComponent - 1;
  if (!hooks) {
    hooks[position] = initValue;
  }

  const modifier = (nextValue) => {
    hooks[position] = nextValue;
  };

  return [hooks[position], modifier];
}

export function createElement(tag, props, ...children) {
  // props 가 null일 경우 객체로 초기화
  props = props || {};

  // 태그가 함수일 경우
  if (typeof tag === 'function') {
    // 클래스일 경우
    if (tag.prototype instanceof Component) {
      // 인스턴스 생성
      const instance = new tag(makeProps(props, children));
      return instance.render();

      // 함수일 경우
    } else {
      hooks[currentComponent] = null;
      currentComponent++;
      // 태그 사이의 내용이 있는 경우 props에 함께 넣어줌
      if (children.length > 0) {
        return tag(makeProps(props, children));
        // 태그 사이의 내용이 없는 경우 props만 넣어줌
      } else {
        return tag(props);
      }
    }

    // 태그가 문자열일 경우
  } else {
    return { tag, props, children };
  }
}

// 컨테이너에 렌더링하기
export const render = (function () {
  let prevDom = null;

  return function (vdom, container) {
    if (prevDom === null) {
      prevDom = vdom;
    }
    // 변경사항 비교

    container.appendChild(createDOM(vdom));
  };
})();
