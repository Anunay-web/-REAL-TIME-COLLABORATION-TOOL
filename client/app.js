const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const ws = new WebSocket("ws://localhost:5000");

let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const pos = { x: e.offsetX, y: e.offsetY };
  ctx.fillRect(pos.x, pos.y, 2, 2);
  ws.send(JSON.stringify(pos));
});

ws.onmessage = (event) => {
  const pos = JSON.parse(event.data);
  ctx.fillRect(pos.x, pos.y, 2, 2);
};
