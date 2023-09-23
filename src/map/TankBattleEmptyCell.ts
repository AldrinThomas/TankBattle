import * as PIXI from 'pixi.js';
import Utils from '../Utils/Utils';
import IGameCell from 'src/interfaces/IGameCell';
export default class TankBattleEmptyCell implements IGameCell {
    type: string;
    health: number;
    body: PIXI.Graphics;
    assigned: boolean;
    constructor() {
        this.body = new PIXI.Graphics();
        this.body.beginFill(Utils.EMPTY_CELL_COLOR);
        this.body.drawRect(0, 0, Utils.CELL_SIZE, Utils.CELL_SIZE);
        this.body.endFill();

        this.assigned = false;

        this.type = "Empty";
    }
    updateHealth(damage: number): void {

    }
}