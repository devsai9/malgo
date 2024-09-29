import * as Graphics from "./graphics.js";
import * as Cell from "./cell.js";
import * as Board from "./board.js";

Graphics.clear();
Cell.loadCell(Board.getInitial());
Cell.drawCell();

Graphics.drawBlock(-1, 3, 0, 5, "cone");
Graphics.drawBlock(0, 3, 0, 5, "cone");
Graphics.drawBlock(1, 3, 0, 5, "cone");

const font = new FontFace("NokiaPhone", "url(../fonts/nokiafc22.ttf)");
font.load().then((font) => {
    document.fonts.add(font);
    console.log("yes");
    Graphics.drawText(127, 1, "Position: 0, 0", "cone");
});


document.body.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    switch(key) {
        case "d": Cell.movePlayer(0); break;
        case "w": Cell.movePlayer(1); break;
        case "a": Cell.movePlayer(2); break;
        case "s": Cell.movePlayer(3); break;
    }
});