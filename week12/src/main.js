import { Component, createElement } from './framework';

class Carousel extends Component {
  constructor() {
    super();
    this.attributes = Object.create(null);
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  mountTo(parent) {
    parent.appendChild(this.render());
  }

  render() {
    this.root = document.createElement('div');
    this.root.classList.add('carousel');
    for (let image of this.attributes['images']) {
      let div = document.createElement('div');
      div.style.backgroundImage = `url(${image})`;
      this.root.appendChild(div);
    }


    let position = 0;
    debugger;
    this.root.addEventListener('mousedown', (e) => {
      let startX = e.clientX;
      const children = this.root.children;
      console.log('mousedown');
      
      const mousemove = (e) => {
        let x = e.clientX - startX;
        let current = position - ((x - x % 500) / 500);
        console.log(position, '======', current);

        for (let offset of [-1, 0, 1]) {
          let pos = current + offset;
          pos = (pos + children.length) % children.length;
          children[pos].style.transition = 'none';
          children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`;
        }
      }

      const mouseup = (e) => {
        let x = e.clientX - startX;
        position = position - Math.round(x / 500);
        for (let offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
          let pos = position + offset;
          pos = (pos + children.length) % children.length;
          children[pos].style.transition = '';
          children[pos].style.transform = `translateX(${-pos * 500 + offset * 500}px)`;
        }
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
      }

      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseup);
    });

    // let currentIndex = 0;
    // setInterval(() => {
    //   const children = this.root.children;
    //   let nextIndex = (currentIndex + 1) % children.length;
    //   let current = children[currentIndex % children.length];
    //   let next = children[nextIndex];
      
    //   next.style.transition = 'none';
    //   next.style.transform = `translateX(${100 - nextIndex * 100}%)`;
      
    //   setTimeout(() => {
    //     next.style.transition = '';
    //     current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;;
    //     next.style.transform = `translateX(${-nextIndex * 100}%)`;
    //     currentIndex = nextIndex;
    //   }, 16);      
    // }, 3000);

    return this.root;
  }
}

let images = [
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600581721169&di=7299618953f7814f741dcbf4d47eb2b8&imgtype=0&src=http%3A%2F%2Fimg1.voc.com.cn%2FUpLoadFile%2F2015%2F10%2F30%2F201510300944281975.jpg',
  'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2776556811,541940954&fm=26&gp=0.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600581905854&di=1b5980e2bf62f626908bbcecd1275eab&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D583874135%2C70653437%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D3607%26h%3D2408',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600581905853&di=106ceff135e7112152f59cb0bcbcd23d&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D2268908537%2C2815455140%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D719',
]

let element = <Carousel images={images} />;

element.mountTo(document.body);
