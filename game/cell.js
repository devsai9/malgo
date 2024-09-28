import * as Graphics from "./graphics.js";

export function drawCell(cell) {
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
}