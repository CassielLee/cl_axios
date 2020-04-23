// 拦截器
class Interceptor {
  constructor() {
    this._list = [];
  }
  use(fn) {
    this._list.push(fn);
  }
  list() {
    return this._list;
  }
}
