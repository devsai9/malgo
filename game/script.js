import * as Graphics from "./graphics.js";
import * as Cell from "./cell.js";
import * as Board from "./board.js";

function main() {
    Graphics.clear();
    Cell.loadCell(Board.getInitial());
    loop();
}

const keyprevmap = {};
const keymap = {};

function loop() {
    window.requestAnimationFrame(loop);

    if(!mapShown) {
        if(keymap["d"]) Cell.movePlayer(0);
        if(keymap["w"]) Cell.movePlayer(1);
        if(keymap["a"]) Cell.movePlayer(2);
        if(keymap["s"]) Cell.movePlayer(3);
    }
    if(!keyprevmap["z"] && keymap["z"]) mapShown = !mapShown;
    if (!mapShown) Cell.drawCell();
    else Board.drawMap();

    Cell.nextFrame();
    for(const k in keymap) {
        keyprevmap[k] = keymap[k];
    }
}

// Graphics.drawBlock(-1, 3, 0, 5, "barricade");
// Graphics.drawBlock(0, 3, 0, 5, "barricade");
// Graphics.drawBlock(1, 3, 0, 5, "barricade");

const font = new FontFace("NokiaPhone", "url(../fonts/nokiafc22.ttf)");
font.load().then((font) => {
    document.fonts.add(font);
    console.log("yes");
    main();
    // Graphics.drawText(127, 1, "Position: 0, 0", "barricade");
});

let mapShown = false;
document.body.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    keymap[key] = true;
    // switch(key) {
    //     case "d": if (!mapShown) Cell.movePlayer(0); break;
    //     case "w": if (!mapShown) Cell.movePlayer(1); break;
    //     case "a": if (!mapShown) Cell.movePlayer(2); break;
    //     case "s": if (!mapShown) Cell.movePlayer(3); break;
    //     case "z": 
    //         mapShown = !mapShown; 
    //         if (!mapShown) Cell.drawCell(); 
    //         else Board.drawMap();
    //         break;
    // }
});

document.body.addEventListener("keyup", (e) => {
    const key = e.key.toLowerCase();
    keymap[key] = false;
});