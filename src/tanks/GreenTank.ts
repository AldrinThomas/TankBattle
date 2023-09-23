import * as PIXI from 'pixi.js';
import Utils from "../Utils/Utils";
import BattleTank, { TankConfig } from "../components/BattleTank";

export default class GreenTank extends BattleTank {
    constructor() {
        super();
        this.bulletDamage = TankConfig.GREEN_TANK_DAMAGE;
    }

    setBody(): void {
        this.body = new PIXI.Graphics();
        this.body.beginFill(TankConfig.GREEN_TANK);
        this.body.drawRect(0, 0, Utils.CELL_SIZE, Utils.CELL_SIZE);
    }
}