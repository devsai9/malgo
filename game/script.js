import * as Graphics from "./graphics.js";
import * as Cell from "./cell.js";

Graphics.clear();
Cell.loadCell({top: false, bottom: false, left: false, right: false}, { x: 0, y: 0 });
Cell.drawCell();

document.body.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    switch(key) {
        case "d": Cell.movePlayer(0); break;
        case "s": Cell.movePlayer(1); break;
        case "a": Cell.movePlayer(2); break;
        case "w": Cell.movePlayer(3); break;
    }
});

// const board = [
//     [{top: false, right: true, bottom: true, left: false}],
//     [],
//     [],
// ];

// function generateTile() {
    
// }