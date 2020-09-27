const TICK = Symbol("tick");
const TICK_HANDLER = Symbol("tick-handle");
const ANIMATION = Symbol("animation");
const START_TIME = Symbol("start-time");
const PAUSE_START = Symbol("pause-start");
const PAUSE_TIME = Symbol("pause-time");

export class Timeline {
  constructor() {
    this[ANIMATION] = new Set();
    this[START_TIME] = new Map();
  }
  start() {
    const startTime = Date.now();
    this[PAUSE_TIME] = 0;
    this[TICK] = () => {
      let now = Date.now();
      for (const animation of this[ANIMATION]) {
        let t = this[START_TIME].get(animation) < startTime
          ? now - startTime - this[PAUSE_TIME]
          : now - this[START_TIME].get(animation) - this[PAUSE_TIME];

        if (animation.duration < t) {
          this[ANIMATION].delete(animation);
          // 执行时间大于duration时纠正范围
          t = animation.duration;
        }
        animation.receiveTime(t);
      }
      // 调用自身
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
    }
    this[TICK]();
  }
  pause() {
    this[PAUSE_START] = Date.now();
    cancelAnimationFrame(this[TICK_HANDLER]);
  }
  resume() {
    // 暂停时间
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
    this[TICK]();
  }
  reset() {

  }
  add(animation, addTime = Date.now()) {
    this[ANIMATION].add(animation);
    this[START_TIME].set(animation, addTime);
  }
}

export class Animation {
  constructor(object, property, startValue, endValue, duration, delay, timeFunction, template) {
    this.object = object;
    this.property = property;
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.delay = delay;
    this.timeFunction = timeFunction;
    this.template = template;
  }

  receiveTime(time) {
    let range = (this.endValue - this.startValue);
    // 差值均匀变化
    this.object[this.property] = this.template(this.startValue + range * time / this.duration);
  }
}