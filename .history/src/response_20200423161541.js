export default function (xhr) {
  return {
    ok: true,
    status: xhr.status,
    statusText: xhr.statusText,
    data: xhr.response,
  };
}
