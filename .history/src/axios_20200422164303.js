function request() {}

class Axios {
  constructor() {
    // 在构造函数中return一个引用类型，相当于直接返回这个引用类型，此处就相当于返回一个Proxy实例对象，这个实例对象在request被调用时会对其进行拦截
    // 利用代理器，拦截request进行apply中定义的操作也就是打印相关信息
    let _this = this;
    return new Proxy(request, {
      apply(fn, thisArg, args) {
        console.log(fn, thisArg, args);
      },
      get(data, name) {
        return _this[name];
      },
    });
  }
  get() {
    console.log("get");
  }
  post() {
    console.log("get");
  }
  delete() {}
}

// 暴露一个Axios的实例对象
let axios = new Axios();
export default axios;
