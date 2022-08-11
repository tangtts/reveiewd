new Promise((resolve, reject) => {
  resolve(1);
}).then(res => {
  console.log(res);
});
// 错误处理
new Promise((resolve, reject) => {
  reject(5);
}).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);

// 传递特性
new Promise((resolve, reject) => {
  resolve(10);
})
  .then(
    res => {
      return res;
    },
    err => {
      console.log(err);
    }
  )
  .then(r => {
    console.log(r);
  });
// 如果resolve 是一个Promise 的话，还是继续进行
new Promise((resolve, reject) => {
  resolve(Promise.reject("x"));
})
  .then(
    res => {
      return res;
    },
    err => {
      console.log(err, "err");
    }
  )
  .then(r => {
    console.log(r);
  });

class MyPromise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.pending = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectCallbacks = [];
    // fulFilled fulRejected
    this.state = "PENDING";
    this.resolveFn = value => {
      if (this.state == "PENDING") {
        this.value = value;
        this.state = "fulFilled";
        if (this.onFulfilledCallbacks.length) {
          this.onFulfilledCallbacks.forEach((fn) => {
            fn()
          });
        }
      }
    };
    this.rejectFn = reason => {
      if (this.state == "PENDING") {
        this.reason = reason;
        this.state = "fulRejected";
        if (this.onRejectCallbacks.length) {
          this.onRejectCallbacks.forEach((fn) => {
            fn()
          });
        }
      }
    };
    try {
      executor(this.resolveFn, this.rejectFn);
    } catch (error) {
      this.rejectFn(error)
    }
   
  }
  then(resolveFn, rejectFn) {
    if (this.state == "fulFilled") {
      resolveFn(this.value);
    }
    if (this.state == "fulRejected") {
      rejectFn(this.reason);
    }
    if (this.state == "PENDING") {
      this.onFulfilledCallbacks.push(()=>{
        resolveFn(this.value)
      })
      this.onRejectCallbacks.push(()=>{
        rejectFn(this.reason)
      })
    }
  }
}

new MyPromise((resolve, reject) => {
  resolve(1);
}).then(res => {
  console.log(res, "MyPromise");
});
// 错误处理
new MyPromise((resolve, reject) => {
  reject(5,"MyPromise");
}).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err, "MyPromise");
  }
);

new MyPromise((resolve, reject) => {
  throw new Error("有错误")
}).then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err, "MyPromise");
  }
);



//异步处理
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("setTimeout","MyPromise");
  });
}).then(
  res => {
    console.log(res,"MyPromise");
  },
  err => {
    console.log(err, "MyPromise");
  }
);
// 错误处理
