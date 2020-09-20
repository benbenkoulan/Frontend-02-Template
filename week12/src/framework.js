export class Component {
  constructor() {
  }

  mountTo(container) {
    container.appendChild(this.root);
  }

  appendChild(child) {
    child.mountTo(this.root);
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    super();
    this.root = document.createElement(type);
  }
}

class TextWrapper extends Component {
  constructor(content) {
    super();
    this.root = document.createTextNode(content);
  }
}


export function createElement(type, attributes, ...children) {
  let element;
  if (typeof type === 'string') {
    element = new ElementWrapper(type);
  } else {
    element = new type;
  }

  for (let name in attributes) {
    element.setAttribute(name, attributes[name]);
  }

  for (let child of children) {
    if (typeof child === 'string') {
      child = new TextWrapper(child);
    }
    element.appendChild(child.root);
  }

  return element;
}

