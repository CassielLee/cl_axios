import _default from "./default";
import { merge, assert } from "./common";
import request from "./request";
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
      // 将axios的属性绑定在proxy实例对象上
      set(target, propKey, val) {
        _this[propKey] = val;
        return true;
      },
      apply(fn, ctx, args) {
        console.log(fn, ctx, args);
      },
    });
  }
  // 对传入的参数进行预处理
  _preprocessArgs(method, args) {
    let options;
    console.log("preprocess options", typeof args[0]);
    if (args.length === 1 && typeof args[0] === "string") {
      // 如果只传入了一个字符串参数，那就认为是传入的url
      options = { method, url: args[0] };
    } else if (args.length === 1 && args[0].constructor == Object) {
      // 如果之传入了一个对象参数
      options = { ...args[0], method };
    } else {
      // 进行别的操作
      return undefined;
    }
    console.log("options", options);
    return options;
  }
  get(...args) {
    let options = this._preprocessArgs("get", args);
    if (!options) {
      if (args.length === 2) {
        assert(typeof args[0] === "string", "args[0] must be string");
        assert(
          typeof args[1] === "object" &&
            args[1] &&
            args[1].constructor == Object,
          "args[1] must be JSON"
        );
        options = {
          ...args[1],
          url: args[0],
          method: "get",
        };
        console.log(options);
      } else {
        assert(false, "invaild args");
      }
    }
  }
  post(...args) {
    let options = this._preprocessArgs("post", args);
    if (!options) {
      if (args.length === 2) {
        assert(typeof args[0] == "string", "args[0] must is string");
        options = {
          ...args[1],
          url: args[0],
          method: "get",
        };
        console.log(options);
      } else if (args.length == 3) {
        assert(typeof args[0] == "string", "args[0] must is string");
        assert(
          typeof args[1] == "object" &&
            args[1] &&
            args[1].constructor == Object,
          "args[1] must is JSON"
        );
        options = {
          ...args[2],
          url: args[0],
          data: args[1],
          method: "post",
        };
        console.log(options);
      } else {
        assert(false, "invaild argments");
      }
    }
  }
  delete(...args) {
    let options = this._preprocessArgs("delete", args);
    if (!options) {
      if (args.length === 2) {
        assert(typeof args[0] == "string", "args[0] must is string");
        assert(
          typeof args[1] == "object" &&
            args[1] &&
            args[1].constructor == Object,
          "args[1] must is JSON"
        );
        options = {
          ...args[1],
          url: args[0],
          method: "detele",
        };
        console.log(options);
      } else {
        assert(false, "invilid argments");
      }
    }
  }
}

// 定义一个函数用于给原型和实例都加一个create方法，因为可能直接用axios.create()也可能直接用axios()，
// 在实例化Axios的时候给每一个axios赋予一份单独的default属性，
// 这样才能做到每一个实例化对象之间互不干扰
Axios.create = Axios.prototype.create = function (options = {}) {
  let axios = new Axios();
  // 深拷贝+...运算符展开
  let res = { ...JSON.parse(JSON.stringify(_default)) };
  merge(res, options);
  axios.default = res;
  return axios;
};

// 暴露一个Axios的实例对象
export default Axios.create();
