// === CONFIG ===
const posterSrc = "RPL Ramadan greeting.png";  // your uploaded poster file name

// Adjust these to match your poster layout
const textX = 600;       // center horizontally
const textY = 1150;       // vertical position
const maxWidth = 800;    // text width limit
const lineHeight = 60;   // spacing between lines

// === SETUP ===
const canvas = document.getElementById("posterCanvas");
const ctx = canvas.getContext("2d");
const input = document.getElementById("textInput");
const downloadBtn = document.getElementById("downloadBtn");

const poster = new Image();
poster.src = posterSrc;

poster.onload = () => {
  canvas.width = poster.width;
  canvas.height = poster.height;
  draw();
};

input.addEventListener("input", draw);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(poster, 0, 0);

  ctx.fillStyle = "#5047b2";
  ctx.font = "bold 60px Tajawal, sans-serif";
  ctx.textAlign = "center";

  const text = input.value;
  const lines = wrapText(ctx, text, maxWidth);

  let y = textY - (lines.length * lineHeight) / 2;

  lines.forEach(line => {
    ctx.fillText(line, textX, y);
    y += lineHeight;
  });
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  words.forEach(word => {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = word + " ";
    } else {
      line = test;
    }
  });

  lines.push(line);
  return lines;
}

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "greeting.png";
  link.href = canvas.toDataURL();
  link.click();
});

