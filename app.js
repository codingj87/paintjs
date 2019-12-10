const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

let color = '';

const INITIAL_COLOR = "blue";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let drowMode = 'paint';

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(){
    const { offsetX: x, offsetY: y} = event;
    if (!painting) {
        ctx.beginPath();        // path 를 시작하겠다
        ctx.moveTo(x, y);       // path 위치를 x, y 로 움직인다
    } else {
        ctx.lineTo(x, y);       // 마지막 path 위치에서 현재 x, y 까진 선을 그를 길을 만든다(아직 나타나진 않음)
        ctx.stroke();           // stroke 설정에 맞게 선일 표현된다
    }
}

function onMouseDown(event) {
    if (drowMode === 'paint') {
        startPainting();
    } else {
        console.log(ctx.fillStyle);
        // ctx.fill(canvas, 'evenodd');
    }
    

}

function handleColorClick(event) {
    color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event) {
    if (drowMode === 'fill') {
        drowMode = 'paint';
        mode.innerText = drowMode;
        
    } else {
        drowMode = 'fill';
        mode.innerText = drowMode;
    }
}

function handleCanvasClick() {
    if (drowMode === 'fill') {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = 'hahaha';
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}


Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}
