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

// 定义一个函数用于给原型和实例都加一个create方法，因为可能直接用axios.create()也可能直接用axios()，
// 在实例化Axios并且给每一个axios赋予一份单独的default属性，
// 这样才能做到每一个实例化对象之间互不干扰
Axios.create = Axios.prototype.create = function () {
  let axios = new Axios();
  // 浅拷贝
  axios.default = JSON.parse(JSON.stringify(_default));
  return axios;
};

// 暴露一个Axios的实例对象
export default Axios.create();
