import Axios from "./axios";

Axios.get("1.json");
Axios.get("1.json", { headers: { a: 12 } });

Axios.post("1.php");
Axios.post("1.php", { a: 12, b: 5 });
Axios.post("1.php", [12, 5, 6]);

let form = new FormData();
Axios.post("1.txt", form);
Axios.post("1.txt", "dw1ewdq");

Axios.post("1.json", form, { headers: { a: 213, b: 132 } });

Axios.delete("1.json");
Axios.delete("1.json", { parmas: { id: 1 } });
Axios("1.txt")