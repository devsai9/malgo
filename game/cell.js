import * as Graphics from "./graphics.js";
import * as Board from "./board.js";

const _BlockType = [
    "WALL",
    "AIR",
    "Exit"
];
const BlockType = {};
_BlockType.forEach((type) => { BlockType[type] = Symbol(type); });

const cell = {};
const blocks = new Array(49);
const pos = {
    x: 0,
    y: 0
};

let exit = false;
export function done() {
    return exit;
}

let lastDir = 0;
const dirMap = [
    [ 1, 0 ],
    [ 0, -1 ],
    [ -1, 0 ],
    [ 0, 1 ]
];
let playerAnim = 0;

let refreshRate = 60;
let last = 0;
function refreshRateChecker(now) {
    window.requestAnimationFrame(refreshRateChecker);
    if(last === 0) {
        last = now;
        return;
    }
    refreshRate = 1000 / (now - last);
    last = now
}
refreshRateChecker();

export function nextFrame() {
    const dt = 6 / refreshRate;
    if(playerAnim >= dt) playerAnim -= dt;
    else playerAnim = 0;
};

loadCell({ top: false, bottom: false, left: false, right: false });

function makeBlock(param) {
    return param ? BlockType.AIR : BlockType.WALL;
}

export function loadCell(cellNew) {
    cell.top = cellNew.top;
    cell.bottom = cellNew.bottom;
    cell.left = cellNew.left;
    cell.right = cellNew.right;
    cell.exit = cellNew.exit;
    const blockTop = makeBlock(cellNew.top);
    const blockBottom = makeBlock(cellNew.bottom);
    const blockLeft = makeBlock(cellNew.left);
    const blockRight = makeBlock(cellNew.right);
    for(let i = 0; i < 49; i++) blocks[i] = BlockType.AIR;
    [
        0,  1,        5,  6,
        7,                13,


        35,               41,
        42, 43,       47, 48
    ].forEach(i => { blocks[i] = BlockType.WALL; });
    [2, 3, 4].forEach(i => { blocks[i] = blockTop; });
    [14, 21, 28].forEach(i => { blocks[i] = blockLeft; });
    [44, 45, 46].forEach(i => { blocks[i] = blockBottom; });
    [20, 27, 34].forEach(i => { blocks[i] = blockRight; });
    const blockExit = cell.exit ? BlockType.EXIT : BlockType.AIR;
    blocks[24] = blockExit;
}

export function drawCell() {
    Graphics.clear();
    if(exit) {
        Graphics.drawText(64, 62, "You escaped the maze!", 8, { x: "center", y: "bottom" }, "player");
        Graphics.drawText(64, 66, "(Press space to restart)", 6, { x: "center", y: "top" }, "player");
        return;
    }
    Graphics.drawBlock(-3, -3, 0, 0, "block");
    Graphics.drawBlock(3, -3, 1, 0, "block");
    Graphics.drawBlock(-3, 3, 3, 0, "block");
    Graphics.drawBlock(3, 3, 2, 0, "block");
    if(cell.left) {
        Graphics.drawBlock(-3, -2, 3, 1, "block");
        Graphics.drawBlock(-3, 2, 1, 1, "block");
    }
    else {
        [-2, -1, 0, 1, 2].forEach(n => Graphics.drawBlock(-3, n, 1, 2, "block"));
    }
    if(cell.right) {
        Graphics.drawBlock(3, -2, 3, 1, "block");
        Graphics.drawBlock(3, 2, 1, 1, "block");
    }
    else {
        [-2, -1, 0, 1, 2].forEach(n => Graphics.drawBlock(3, n, 1, 2, "block"));
    }
    if(cell.top) {
        Graphics.drawBlock(-2, -3, 2, 1, "block");
        Graphics.drawBlock(2, -3, 0, 1, "block");
    }
    else {
        [-2, -1, 0, 1, 2].forEach(n => Graphics.drawBlock(n, -3, 0, 2, "block"));
    }
    if(cell.bottom) {
        Graphics.drawBlock(-2, 3, 2, 1, "block");
        Graphics.drawBlock(2, 3, 0, 1, "block");
    }
    else {
        [-2, -1, 0, 1, 2].forEach(n => Graphics.drawBlock(n, 3, 0, 2, "block"));
    }
    drawPlayer();
    const [ bx, by ] = Board.getPos();
    Graphics.drawText(127, 1, `Pos: ${bx}, ${by}`, 3, { x: "right", y: "top" }, "player");
    if(cell.exit) {
        Graphics.drawBlock(0, -0.5, 0, 6, "exit");
        Graphics.drawBlock(0, 0.5, 0, 7, "exit");
    }
}

const easing = (t) => t > 0.5 ? 1 - 4 * (1 - t) ** 3 : 4 * t ** 3;

function drawPlayer() {
    const t = easing(playerAnim);
    const x = pos.x - t * dirMap[lastDir][0];
    const y = pos.y - t * dirMap[lastDir][1];
    Graphics.drawBlock(x, y, 0, 4, "player");
}


export function movePlayer(dir) {
    if(playerAnim !== 0) return;
    lastDir = dir;
    let xn = pos.x;
    let yn = pos.y;
    switch(dir) {
        case 0:
            xn++;
            break;
        case 1:
            yn--;
            break;
        case 2:
            xn--;
            break;
        case 3:
            yn++;
            break;
    }
    
    if(xn > 3 || xn < -3 || yn > 3 || yn < -3) {
        const cellNew = Board.getCell(dir);
        loadCell(cellNew);
        if(dir === 0) pos.x = -3;
        else if(dir === 1) pos.y = 3;
        else if(dir === 2) pos.x = 3;
        else if(dir === 3) pos.y = -3;
        drawCell();
        return;
    }
    const xs = xn + 3;
    const ys = yn + 3;
    const blockNew = blocks[7 * ys + xs];
    if(blockNew !== BlockType.AIR && blockNew !== BlockType.EXIT) return;
    if(blockNew === BlockType.EXIT) {
        exit = true;
    }
    playerAnim = 1;
    pos.x = xn;
    pos.y = yn;
    drawCell(); 
}