export function createDOM(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  const element = document.createElement(node.tag);

  Object.entries(node.props).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  if (node.children) {
    node.children.map(createDOM).forEach(element.appendChild.bind(element));
  }
  return element;
}

export function render(vdom, container) {
  container.appendChild(createDOM(vdom));
}

export function createElement(tag, props, ...children) {
  props = props || {};
  if (typeof tag === 'function') {
    if (children.length > 0) {
      return tag({
        ...props,
        children: children.length === 1 ? children[0] : children,
      });
    } else {
      return tag();
    }
  } else {
    return { tag, props, children };
  }
}
