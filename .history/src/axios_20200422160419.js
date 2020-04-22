function request() {}

class Axios {
  constructor() {
      // 利用代理器，拦截request的方法
      return new Proxy(request,{
          apply(fn,thisArg,args)
      })
  }
}
