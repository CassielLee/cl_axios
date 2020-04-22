// 放置公共方法的文件
export function assert(exp, msg = "assert faild") {
  if (!exp) {
    throw new Error(msg);
  }
}
