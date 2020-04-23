import Axios from "./axios";

Axios("/a/../../../1.php", {
  baseUrl: "http://www.baidu.com/",
  headers: {
    a: 12,
  },
});
