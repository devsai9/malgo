import tileset from "./tileset.js";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.append(canvas);

const resolution = 128;

canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.imageRendering = "pixelated";

const dp = window.devicePixelRatio;

resizeCanvas();

export function resizeCanvas() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dp;
    canvas.height = h * dp;
}

function scaleLen(l) {
    l *= dp;

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
        return [ (x * scale + offset) * dp, y * scale * dp ];
    }
    else {
        // Too tall
        const offset = (w - h) * 0.5;
        const scale = h / resolution;
        return [ (x * scale + offset) * dp, y * scale * dp ];
    }
}

function sanitize(x) {
    return Math.round(x) + 0.5;
}

function rotate(tile, dir) {
    if(dir === 0) return [...tile];
    let fn;
    switch(dir) {
        case 1: fn = (x, y) => [ y, 7 - x ]; break;
        case 2: fn = (x, y) => [ 7 - x, 7 - y]; break;
        default: fn = (x, y) => [ 7 - y, x ];
    }
    const res = new Array(64);
    for(let i = 0; i < 64; i++) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        const [ xn, yn ] = fn(x, y);
        res[i] = tile[xn + yn * 8];
    }
    return res;
}

//window.addEventListener("resize", onResize);

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

export function drawBlock(x, y, dir, type, channel) {
    ctx.fillStyle = getDisplay(channel);
    const tile = rotate(tileset[type], dir);
    x = x * 8 + resolution * 0.5;
    y = y * 8 + resolution * 0.5;
    const [ sx, sy ] = transPos(x, y);
    const size = scaleLen(1);
    const f = sanitize;
    for(let i = 0; i < 64; i++) {
        const ix = i % 8 - 4;
        const iy = Math.floor(i / 8) - 4;
        if(tile[i] === 1) {
            ctx.fillRect(f(sx + ix * size), f(sy + iy * size), f(size), f(size));
        }
    }
}

export function clear(color) {
    color ||= "#000";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

drawBlock(0, 0, 1, 0, "block");