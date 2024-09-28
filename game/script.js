import * as Graphics from "./graphics.js";
import * as Cell from "./cell.js";
import * as Board from "./board.js";

Graphics.clear();
Cell.loadCell({top: false, bottom: false, left: false, right: false}, { x: 0, y: 0 });
Cell.drawCell();


document.body.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    switch(key) {
        case "d": Cell.movePlayer(0); Board.getCell(0); break;
        case "s": Cell.movePlayer(1); Board.getCell(1); break;
        case "a": Cell.movePlayer(2); Board.getCell(2); break;
        case "w": Cell.movePlayer(3); Board.getCell(3); break;
    }
});