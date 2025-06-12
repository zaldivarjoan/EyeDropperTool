const imageLoader = document.getElementById('imageLoader');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const colorInfo = document.getElementById('colorInfo');
const colorBox = document.getElementById('colorBox');

imageLoader.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

canvas.addEventListener('mousemove', function (e) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor(e.clientX - rect.left);
  const y = Math.floor(e.clientY - rect.top);

  const pixel = ctx.getImageData(x, y, 1, 1).data;
  const [r, g, b] = pixel;
  const hex = `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;

  colorInfo.textContent = `RGB: (${r}, ${g}, ${b}) | HEX: ${hex}`;
  colorBox.style.backgroundColor = hex;
});
