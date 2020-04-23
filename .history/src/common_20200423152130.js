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
