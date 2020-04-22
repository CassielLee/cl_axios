function request() {}

class Axios {
  constructor() {
      // 利用代理器，拦截request的方法
      return new Proxy(request,{
          apply(fn,thisArg,args)
      })
  }
  get(){}
  post(){}
  delete(){}
}

let axios = new Axios()
export default axios 
