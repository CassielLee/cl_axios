export default function (xhr) {
  let arr = xhr.getAllResponseHeaders().split("\r\n");
  let headers = {};
  arr.forEach((str) => {
    let [name, val] = str.split(": ");
    headers[name] = val;
  });
  return {
    ok: true,
    status: xhr.status,
    statusText: xhr.statusText,
    data: xhr.response,
    headers,
    xhr,
  };
}
