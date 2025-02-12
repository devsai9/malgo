import tileset from "./tileset.js";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.append(canvas);

const resolution = 128;

canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.imageRendering = "pixelated";

const dp = window.devicePixelRatio;
const dimensions = { w: window.innerWidth, h: window.innerHeight };

resizeCanvas();

export function resizeCanvas() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    dimensions.w = w;
    dimensions.h = h;
    canvas.width = w * dp;
    canvas.height = h * dp;
}

window.addEventListener("resize", resizeCanvas);

function scaleLen(l) {
    l *= dp;

    const w = dimensions.w;
    const h = dimensions.h;

    if(w > h) return h / resolution * l;
    else w / resolution * l;
}

function transPos(x, y) {
    const w = dimensions.w;
    const h = dimensions.h;
    if(w > h) {
        // Too wide
        const offset = (w - h) * 0.5;
        const scale = h / resolution;
        return [ (x * scale + offset) * dp, y * scale * dp ];
    }
    else {
        // Too tall
        const offset = (h - w) * 0.5;
        const scale = w / resolution;
        console.log(`${offset}, ${scale}`);
        return [ x * scale * dp, (y * scale + offset) * dp ];
    }
}

window.transPos = transPos;

function sanitize(v) {
    return Math.round(v)// + 0.5;
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
    block: "#afff5e",
    text: "#6ef8ff",
    player: "#ffffff",
    barricade: "#ff3050", //"#ff7086"// "#ffb74a"
    overlay: "#000000bb",
    unexplored: "#555555",
    exit: "#6ef8ff"
};

export function setDisplay(setting, value) {
    displaySettings[setting] = value;
}

export function getDisplay(setting) {
    return displaySettings[setting];
}

export function drawBlock(x, y, dir, type, channel) {
    const color = getDisplay(channel);
    const tile = rotate(tileset[type], dir);
    x = x * 8 + resolution * 0.5;
    y = y * 8 + resolution * 0.5;
    const [ sx, sy ] = transPos(x, y);
    const size = scaleLen(1);
    const f = sanitize;
    for(let i = 0; i < 64; i++) {
        const ix = i % 8 - 4;
        const iy = Math.floor(i / 8) - 4;
        if(tile[i] === 0) {
            continue;
        }
        else if(tile[i] === 1) ctx.fillStyle = color;
        else ctx.fillStyle = "#000";
        ctx.fillRect(f(sx + ix * size), f(sy + iy * size), f(size) + 1, f(size) + 1);
    }
}

export function drawRect(x, y, w, h, channel) {
    ctx.fillStyle = getDisplay(channel);
    const [ px, py ] = transPos(x, y);
    const f = sanitize;
    ctx.fillRect(f(px), f(py), Math.ceil(scaleLen(w)), Math.ceil(scaleLen(h)));
}

export function clear(color) {
    color ||= "#000";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawText(x, y, str, size, center, channel) {
    const [ px, py ] = transPos(x, y);
    const f = sanitize;
    ctx.fillStyle = getDisplay(channel);
    ctx.font = `100 ${Math.ceil(scaleLen(size))}px NokiaPhone`;
    ctx.textAlign = center.x;
    ctx.textBaseline = center.y;
    ctx.fillText(str, f(px), f(py));
}

//drawBlock(0, 0, 1, 0, "block");