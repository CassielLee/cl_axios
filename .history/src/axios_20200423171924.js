import _default from "./utils/default";
import createResponse from "./utils/response";
import createError from "./utils/error";
import { merge, assert, clone, preprocessArgs } from "./utils/common";
import request from "./utils/request";
const urlLib = require("url");
import Interceptor from "./utils/interceptor";
class Axios {
  constructor() {
    this.interceptors = {
      request: new Interceptor(),
      response: new Interceptor(),
    };
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
        // console.log(fn, ctx, args);
        // 处理Axios()的情况
        let options = preprocessArgs(undefined, args);
        if (!options) {
          if (args.length === 2) {
            assert(typeof args[0] === "string", "args[0] must be string");
            options = {
              ...args[1],
              url: args[0],
            };
            return _this.request(options);
          } else if (args.length === 3) {
            assert(typeof args[0] === "string", "args[0] must be string");
            assert(
              typeof assert[2] === "object" &&
                args[2] &&
                args[2].constructor === Object,
              "args[2] must be JSON"
            );
            options = {
              ...args[2],
              data: args[1],
              url: args[0],
            };
            return _this.request(options);
          } else {
            assert(false, "invalid args");
          }
        }
      },
    });
  }

  request(options) {
    // 1. 跟this.default进行合并
    let _headers = this.default.headers;
    delete this.default.headers;
    let result = clone(this.default);
    merge(result, this.default);
    merge(result, options);
    this.default.headers = _headers;
    options = result;
    // this.default.headers.common -> this.default.headers.get -> options
    // 合并headers
    let headers = {};
    merge(headers, this.default.headers.common);
    merge(headers, this.default.headers[options.method.toLowerCase()]);
    merge(headers, options.headers);
    // 2. 检测参数是否正确
    assert(options.method, "no method");
    assert(typeof options.method == "string", "method must be string");
    assert(options.url, "no url");
    assert(typeof options.url == "string", "url must be string");
    // 3. baseUrl 合并请求
    options.url = urlLib.resolve(options.baseUrl, options.url);
    delete options.baseUrl;
    // 4. 变换请求
    // console.log(options)
    const { transformRequest, transformResponse } = options;
    delete options.transformRequest;
    delete options.transformResponse;
    if (transformRequest) options = transformRequest(options);
    let list = this.interceptors.request.list();
    list.forEach((fn) => {
      options = fn(options);
    });
    // 5. 正式调用request(options)
    return new Promise((resolve, reject) => {
      return request(options).then(
        (xhr) => {
          let res = createResponse(xhr);
          if (transformResponse) res = transformResponse(res);

          let list = this.interceptors.response.list();
          list.forEach((fn) => {
            res = fn(res);
          });
          resolve(res);
        },
        (xhr) => {
          let error = createError(xhr);
          reject(error);
        }
      );
    });
  }
  get(...args) {
    let options = this.preprocessArgs("get", args);
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
        return this.request(options);
      } else {
        assert(false, "invaild args");
      }
    }
  }
  post(...args) {
    let options = this.preprocessArgs("post", args);
    if (!options) {
      if (args.length === 2) {
        assert(typeof args[0] == "string", "args[0] must is string");
        options = {
          data: args[1],
          url: args[0],
          method: "post",
        };
        return this.request(options);
      } else if (args.length == 3) {
        assert(typeof args[0] == "string", "args[0] must is string");
        assert(
          typeof args[2] == "object" &&
            args[2] &&
            args[2].constructor == Object,
          "args[2] must is JSON"
        );
        options = {
          ...args[2],
          url: args[0],
          data: args[1],
          method: "post",
        };
        return this.request(options);
      } else {
        assert(false, "invaild argments");
      }
    }
  }
  delete(...args) {
    let options = this.preprocessArgs("delete", args);
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
        return this.request(options);
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
