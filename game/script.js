import * as Graphics from "./graphics.js";
import * as Cell from "./cell.js";
import * as Board from "./board.js";

Graphics.clear();
Cell.loadCell(Board.getInitial());
Cell.drawCell();


document.body.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    switch(key) {
        case "d": Cell.movePlayer(0); break;
        case "w": Cell.movePlayer(1); break;
        case "a": Cell.movePlayer(2); break;
        case "s": Cell.movePlayer(3); break;
    }
});