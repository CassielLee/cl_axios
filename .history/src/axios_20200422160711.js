function request() {}

class Axios {
  constructor() {
    // 利用代理器，拦截request的方法，使得
    return new Proxy(request, {
      apply(fn, thisArg, args) {
        console.log(fn, thisArg, args);
      },
    });
  }
  get() {}
  post() {}
  delete() {}
}

// 暴露一个Axios的实例对象
let axios = new Axios();
export default axios;
