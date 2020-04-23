export default function (xhr) {
  return {
    msg: "ok",
    status: xhr.status,
    statusText: xhr.statusText,
    data: xhr.response,
  };
}
