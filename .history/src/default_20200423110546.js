export default {
  method: "get",
  baseUrl: "",
  headers: {
    common: {
      // 一种约定俗成的配置
      "X-Request-By": "XMLHttpRequest",
    },
    get: {},
    post: {},
    delete: {},
  },
};
