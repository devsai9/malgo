import * as Graphics from "./graphics.js";

// True: Open; False: Wall
const board = [];

const player = {
    x: 0,
    y: 0
}

let numCellsGenerated = 0;

for (let i = 0; i < 32; i++) {
    board.push([]);
    for (let j = 0; j < 32; j++) {
        board[i].push(null);
    }
}   

// Set player in the center
player.x = 15;
player.y = 15;
board[15][15] = {top: true, right: true, bottom: true, left: true};

export function getInitial() {
    return board[15][15];
}

export function getPos() {
    return [ player.x, player.y ];
}

export function getCell(direction) {
    // 0: Right, Up: 1, Left: 2, Down: 3
    // Calculate new coordinates
    let xn = player.x;
    let yn = player.y;
    switch(direction) {
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

    player.x = xn;
    player.y = yn;
    // Check if cell already exists
    if (board[yn][xn] != null) return board[yn][xn];
    
    // Generate new cell
    const newTile = {top: false, right: false, bottom: false, left: false};
    const openings = [];

    // Randomly generate an exit
    if (numCellsGenerated > 30) {
        if (Math.random() < 0.25) {
            newTile.top = false;
            newTile.right = false;
            newTile.bottom = false;
            newTile.left = false;
        }

        numCellsGenerated++;
        return newTile;
    }

    // Checking
    if (xn == 0) newTile.left = false;
    else if (board[yn][xn - 1] != null) {
        newTile.left = board[yn][xn - 1].right;
    } else openings.push("left");

    if (yn == 0) newTile.top = false;
    else if (board[yn - 1][xn] != null) {
        newTile.top = board[yn - 1][xn].bottom;
    } else openings.push("top");

    if (xn == 31) newTile.right = false;
    else if (board[yn][xn + 1] != null) {
        newTile.right = board[yn][xn + 1].left;
    } else openings.push("right");

    if (yn == 31) newTile.bottom = false;
    else if (board[yn + 1][xn] != null) {
        newTile.bottom = board[yn + 1][xn].top;
    } else openings.push("bottom");

    // Procedural generation
    openings.forEach(opening => {
        if (Math.random() < 0.5) {
            newTile[opening] = true;
        }
    });
    
    numCellsGenerated++;

    board[yn][xn] = newTile;
    return newTile;
}

export function drawMap() {
    let blockSize = 2;
    Graphics.drawRect(0, 0, 128, 128, "overlay");
    Graphics.drawText(64, 31, "Map", 3, { x: "center", y: "bottom" }, "player");
    for (let i = 0; i < 32; i++) {
        for (let j = 0; j < 32; j++) {
            const cell = board[j][i];
            if (cell == null) {
                Graphics.drawRect((i + 16) * blockSize, (j + 16) * blockSize, blockSize, blockSize, "unexplored");
                continue;
            }

            if (!cell.top) Graphics.drawRect((i + 16) * blockSize, (j + 16) * blockSize, blockSize, blockSize * 0.25, "block");
            if (!cell.right) Graphics.drawRect((i + 16.75) * blockSize, (j + 16) * blockSize, blockSize * 0.25, blockSize, "block");
            if (!cell.bottom) Graphics.drawRect((i + 16) * blockSize, (j + 16.75) * blockSize, blockSize, blockSize * 0.25, "block");
            if (!cell.left) Graphics.drawRect((i + 16) * blockSize, (j + 16) * blockSize, blockSize * 0.25, blockSize, "block");

            Graphics.drawRect((i + 16) * blockSize, (j + 16) * blockSize, blockSize * 0.25, blockSize * 0.25, "block");
            Graphics.drawRect((i + 16.75) * blockSize, (j + 16) * blockSize, blockSize * 0.25, blockSize * 0.25, "block");
            Graphics.drawRect((i + 16) * blockSize, (j + 16.75) * blockSize, blockSize * 0.25, blockSize * 0.25, "block");
            Graphics.drawRect((i + 16.75) * blockSize, (j + 16.75) * blockSize, blockSize * 0.25, blockSize * 0.25, "block");

            if (i == player.x && j == player.y) Graphics.drawRect((i + 16.25) * blockSize, (j + 16.25) * blockSize, blockSize * 0.5, blockSize * 0.5, "player");
        }
    }
}