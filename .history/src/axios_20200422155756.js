function request() {}

class Axios {
  constructor() {
      return new Proxy(request,{
          apply(fn,thisArg,args)
      })
  }
}
