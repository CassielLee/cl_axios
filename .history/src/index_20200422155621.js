import axios from "./axios";

console.log(axios);
axios({ url: "1.txt", method: "post" });
axios.get("1.txt", { headers: { aaa: 123 } });
axios.post(
  "1.txt",
  { data: 123 },
  {
    headers: {
      bbb: 123,
    },
  }
);
