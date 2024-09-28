import tileset from "./tileset.js";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.append(canvas);

const resolution = 128;

canvas.style.width = "100%";
canvas.style.height = "100%";

const dp = window.devicePixelRatio;

onResize();

function onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dp;
    canvas.height = h * dp;
}

function scaleLen(l) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    if(w > h) return h / resolution * l;
    else w / resolution * l;
}

function transPos(x, y) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const ratio = w / h;
    if(ratio > 1) {
        // Too wide
        const offset = (w - h) * 0.5;
        const scale = h / resolution;
        return [ x * scale + offset, y * scale ];
    }
    else {
        // Too tall
        const offset = (w - h) * 0.5;
        const scale = h / resolution;
        return [ x * scale + offset, y * scale ];
    }
}

window.addEventListener("resize", onResize);

const displaySettings = {
    block: "#ff7086",
    text: "#6ef8ff",
    player: "#ffffff"
};

export function setDisplay(setting, value) {
    displaySettings[setting] = value;
}

export function getDisplay(setting) {
    return displaySettings[setting];
}

export function drawBlock(x, y, type) {
    ctx.fillStyle = getDisplay("block");
    const tile = tileset[type];
    x = x * 8 + resolution * 0.5;
    y = y * 8 + resolution * 0.5;
    const [ sx, sy ] = transPos(x, y);
    const size = scaleLen(1);
    for(let i = 0; i < 64; i++) {
        const ix = i % 8;
        const iy = Math.floor(i / 8);
        if(tile[i] === 1) {
            ctx.fillRect(sx + ix * size, sy + iy * size, size, size);
        }
    }
}

export function clear(color) {
    color ||= "#000";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}