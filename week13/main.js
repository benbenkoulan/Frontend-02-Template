import { Component, createElement } from './framework'
import { Timeline, Animation } from './animation'

class Carousel extends Component {
  constructor() {
    super();
    this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  render() {
    this.root = document.createElement('div');
    this.root.classList.add('carousel');
    for (const record of this.attributes.src) {
      let child = document.createElement('div');
      child.style.backgroundImage = `url(${record})`;
      this.root.appendChild(child);
    }
    // 鼠标拖拽
    let position = 0;

    this.root.addEventListener("mousedown", event => {
      // console.log("mousedown");
      let children = this.root.children;
      let startX = event.clientX;

      let move = event => {
        let x = event.clientX - startX;
        // console.log("mousemove", x);

        let current = position - ((x - x % 500) / 500);

        for (let offset of [-1, 0, 1]) {
          let pos = current + offset;
          pos = (pos + children.length) % children.length;
          children[pos].style.transition = "none";
          children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`;
        }
      }

      let up = event => {
        // console.log("mouseup");
        let x = event.clientX - startX;
        position = position - Math.round(x / 500);

        for (let offset of [0, - Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
          let pos = position + offset;
          pos = (pos + children.length) % children.length;
          children[pos].style.transition = "";
          children[pos].style.transform = `translateX(${- pos * 500 + offset * 500}px)`;
        }

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      }

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    })


    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}

let d = [
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600581721169&di=7299618953f7814f741dcbf4d47eb2b8&imgtype=0&src=http%3A%2F%2Fimg1.voc.com.cn%2FUpLoadFile%2F2015%2F10%2F30%2F201510300944281975.jpg',
  'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2776556811,541940954&fm=26&gp=0.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600581905854&di=1b5980e2bf62f626908bbcecd1275eab&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D583874135%2C70653437%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D3607%26h%3D2408',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600581905853&di=106ceff135e7112152f59cb0bcbcd23d&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D2268908537%2C2815455140%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D719',
];
let a = <Carousel src={d} />;
a.mountTo(document.body);

