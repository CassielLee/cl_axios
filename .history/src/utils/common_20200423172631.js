// 放置公共方法的文件
export function assert(exp, msg = "assert faild") {
  if (!exp) {
    throw new Error(msg);
  }
}

// 通过递归将用户配置和默认配置进行合并而不是替代
export function merge(dest, src) {
  for (let name in src) {
    if (typeof src[name] === "object") {
      if (!dest[name]) {
        dest[name] = {};
      }
      merge(dest[name], src[name]);
    } else {
      if (dest[name] === undefined) {
        dest[name] = src[name];
      }
    }
  }
}
export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
export function paramsCheck(method, options) {}
// 对传入的参数进行预处理
export function preprocessArgs(method = "get", args) {
  let options;
  if (args.length === 1 && typeof args[0] === "string") {
    // 如果只传入了一个字符串参数，那就认为是传入的url
    options = { method, url: args[0] };
  } else if (args.length === 1 && args[0].constructor == Object) {
    // 如果之传入了一个对象参数
    options = { ...args[0], method };
  } else if (args.length === 2) {
    // 进行别的操作
    assert(typeof args[0] === "string", "args[0] must be string");
    if (method === "get") {
      assert(
        typeof args[1] === "object" && args[1] && args[1].constructor == Object,
        "args[1] must be JSON"
      );
    }
    options = {
      ...args[1],
      url: args[0],
      method,
    };
  }
  return options;
}
