export default function request(options) {
  console.log(options);
  let xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url, true);
  for (let key in options.headers) {
    xhr.setRequestHeader(encodeURIComponent(key), options.headers[key]);
  }
  xhr.send(options.data);
}
