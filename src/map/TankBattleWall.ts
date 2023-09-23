import * as PIXI from 'pixi.js';
import Utils from '../Utils/Utils';
import IGameCell from 'src/interfaces/IGameCell';
export default class TankBattleWall implements IGameCell {
    body: PIXI.Graphics;
    type: string;
    health: number;
    constructor() {
        this.body = new PIXI.Graphics();
        this.body.beginFill(Utils.WALL_COLOR);
        const borderColor = 0xFF0000; // Red
        const borderWidth = 1;
        this.body.lineStyle(borderWidth, borderColor);
        this.body.drawRect(0, 0, Utils.CELL_SIZE, Utils.CELL_SIZE);
        this.body.endFill();

        this.type = "Wall";
    }
    updateHealth(damage: number): void {

    }
}