import Axios from "./axios";

(async () => {
  let res = await Axios("/data/1.txt", {
    baseUrl: "http://www.baidu.com/",
    headers: {
      a: "12 1354 fd",
    },
    transformRequest(config) {
      config.headers.aaa = 12;
      return config;
    },
  });
  console.log(res);
})();
