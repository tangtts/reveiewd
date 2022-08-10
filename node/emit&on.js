class Event {
  // { key:[{key:fn,once:true},{key:fn,once:true }] }
  // attend 给函数
  constructor() {
    this.fnBox = new Map();
  }
  attend(fnName, fn, once = false) {
    let fns = this.fnBox.get(fnName) || [];
    fns.push({ fn, once });
    this.fnBox.set(fnName, fns);
  }
  on(fnName, fn) {
    this.attend(fnName, fn);
  }
  emit(fnName, payload) {
    let fns = this.fnBox.get(fnName) || [];
    fns.forEach(({ fn }) => {
      fn.call(this, payload);
    });
    fns = fns.filter(fn => !fn.once);
    this.fnBox.set(fnName, fns);
  }
  once(fnName, fn) {
    this.attend(fnName, fn, true);
  }
  off(fnName, callback) {
    let fns = this.fnBox.get(fnName) || [];
    if (callback) {
      fns = fns.filter(({ fn }) => fn !== callback);
      this.fnBox.set(fnName, fns);
    } else {
      this.fnBox.set(fnName, []);
    }
  }
}

const e = new Event();
e.on("data", function (data) {
  console.log(data, "data");
});
e.emit("data", 123);
e.emit("data", 456);

e.once("once", function (data) {
  console.log(data, "once");
});
e.emit("once", "once");
e.emit("once", "once2");
