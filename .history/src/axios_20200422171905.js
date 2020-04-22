function request() {}
const _default = {
  method: "get",
  headers: {
    common: {
      "X-Request-By": "XMLHttpRequest",
    },
    get: {},
    post: {},
    delete: {},
  },
};

class Axios {
  constructor() {
    // 在构造函数中return一个引用类型，相当于直接返回这个引用类型，此处就相当于返回一个Proxy实例对象，这个实例对象在request被调用时会对其进行拦截
    // 利用代理器，拦截request进行apply中定义的操作也就是打印相关信息
    // 当前的this是Axios,如果直接写this就指向的是proxy实例对象
    let _this = this;
    return new Proxy(request, {
      get(target, propKey) {
        return _this[propKey];
      },
      apply(fn, thisArg, args) {
        console.log(fn, thisArg, args);
      },
    });
  }
  get() {
    console.log("get");
  }
  post() {
    console.log("post");
  }
  delete() {
    console.log("delete");
  }
}

// 暴露一个Axios的实例对象
let axios = new Axios();
export default axios;
