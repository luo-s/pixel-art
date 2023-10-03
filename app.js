//grid
const grid = document.querySelector(".grid");
const gridSize = 28;
const pixelSize = 20;
const ratio = 2;
grid.style.width = `${gridSize * ratio * (pixelSize + 1)}px`;
console.log(grid.style.width);
grid.addEventListener("click", function (event) {
  if (event.target.className == "pixel") {
    event.target.style.background = paintColor;
  }
});
// palette
const palette = document.querySelector(".palette");
let colorList = [
  "brown",
  "red",
  "pink",
  "orange",
  "gold",
  "yellow",
  "khaki",
  "green",
  "lime",
  "lightgreen",
  "darkblue",
  "blue",
  "lightskyblue",
  "purple",
  "magenta",
  "violet",
  "black",
  "grey",
  "lightgrey",
  "white",
];
let paintColor = "white";
for (i of colorList) {
  const b = document.createElement("button");
  b.classList.add("color");
  b.style.background = i;
  palette.append(b);
  b.addEventListener("click", function (event) {
    paintColor = event.target.style.background;
    currentColor.style.background = paintColor;
  });
}

// color picker
const picker = document.createElement("input");
picker.type = "color";
picker.classList.add("picker");
picker.addEventListener("change", function (event) {
  paintColor = event.target.value;
  currentColor.style.background = paintColor;
});
palette.append(picker);

//showing current color
const showColor = document.createElement("div");
palette.append(showColor);
showColor.textContent = "CURRENT COLOR •••>>";
showColor.classList.add("showColor");
const currentColor = document.createElement("div");
currentColor.classList.add("currentColor");
palette.append(currentColor);

// drawing
let isDrawing = false;
for (let i = 0; i < gridSize ** 2 * ratio; i++) {
  const pixel = document.createElement("div");
  pixel.className = "pixel";
  pixel.style.width = `${pixelSize}px`;
  pixel.style.height = `${pixelSize}px`;
  pixel.style.border = "0.5px solid lightgrey";
  pixel.backgound = "white";
  grid.append(pixel);
  pixel.addEventListener("mousedown", function () {
    isDrawing = true;
  });
  pixel.addEventListener("mouseup", function () {
    isDrawing = false;
  });
  pixel.addEventListener("mouseenter", function () {
    if (isDrawing === true) {
      pixel.style.background = paintColor;
    }
  });
}

// clear button
const clear = document.createElement("button");
clear.textContent = "clear";
clear.classList.add("clear");
clear.addEventListener("click", function () {
  for (let child of grid.children) {
    child.style.background = "white";
  }
  paintColor = "white";
  currentColor.style.background = "white";
  //location.reload();
});
palette.append(clear);

//save the drawing
let save = document.createElement("button");
save.classList.add("storage");
save.textContent = "Save";
save.addEventListener("click", function () {
  let pic = [];
  for (let child of grid.children) {
    pic.push(child.style.background);
  }
  localStorage.setItem("pic", JSON.stringify(pic));
});
palette.append(save);

//load the drawing
let load = document.createElement("button");
load.classList.add("storage");
load.textContent = "Load";
load.addEventListener("click", function () {
  let pic = JSON.parse(localStorage.getItem("pic"));
  for (let i = 0; i < grid.children.length; i++) {
    grid.children[i].style.background = pic[i];
  }
});
palette.append(load);

//print
let print = document.createElement("button");
print.className = "storage";
print.textContent = "Print";
print.addEventListener("click", function () {
  window.print();
});
palette.append(print);

//frame
let index = 0;
function fill(num) {
  grid.children[num].style.background = paintColor;
  if (index < gridSize * ratio - 1) {
    index += 1;
  } else if (
    index % (gridSize * ratio) === gridSize * ratio - 1 &&
    index !== grid.children.length - 1
  ) {
    index += gridSize * ratio;
  } else if (index > grid.children.length - gridSize * ratio) {
    index -= 1;
  } else if (index % (gridSize * ratio) === 0) {
    index -= gridSize * ratio;
  }
}

let ff = document.createElement("button");
ff.classList.add("fill");
ff.textContent = "Frame";
ff.addEventListener("click", function () {
  let intervalID = setInterval(() => {
    fill(index);
  }, 50);
  localStorage.setItem("myInterval", JSON.stringify(intervalID));
});
palette.append(ff);

let sf = document.createElement("button");
sf.classList.add("fill");
sf.textContent = "Stop";
sf.addEventListener("click", function () {
  clearInterval(JSON.parse(localStorage.getItem("myInterval")));
  // index = 0;
});
palette.append(sf);
