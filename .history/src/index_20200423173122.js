import Axios from "./axios";

(async () => {
  let res = await Axios("/data/1.json", {
    baseUrl: "",
    headers: {
      a: "12 1354 fd",
    },
    transformRequest(config) {
      config.headers.aaa = 12;
      return config;
    },
    transformResponse(res) {
      res.data = JSON.parse(res.data);
      return res;
    },
  });
  console.log(res);
})();
