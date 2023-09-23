import * as PIXI from 'pixi.js';
import TankBattleGame from './TankBattleGame';
import Utils from './Utils/Utils';

let wrapper: HTMLElement;
const app = new PIXI.Application<HTMLCanvasElement>({
    width: Utils.SCREEN_WIDTH,
    height: Utils.SCREEN_HEIGHT,
    backgroundAlpha: 0
});


const game = new TankBattleGame();
app.stage.addChild(game);
document.getElementById('app')!.appendChild(app.view);

wrapper = document.createElement('div');
wrapper.setAttribute("style", "width:" + Utils.SCREEN_WIDTH + "px; height:" + Utils.SCREEN_HEIGHT + "px; position: fixed; left:50%;top:0; overflow: hidden; transform-origin: left top;");
wrapper.appendChild(app.view);
document.body.appendChild(wrapper);

onWindowResize();
window.addEventListener('resize', onWindowResize.bind(this));
function onWindowResize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let scale = Math.min(width / Utils.SCREEN_WIDTH, height / Utils.SCREEN_HEIGHT);
    wrapper.style.transform = 'scale(' + scale + ') translate(-50%, 0px)';
}
app.ticker.add((delta) => {
    game.update(delta);
});