import * as PIXI from 'pixi.js';
import Utils from "../Utils/Utils";
import BattleTank, { TankConfig } from "../components/BattleTank";

export default class RedTank extends BattleTank {

    constructor() {
        super();
        this.bulletDamage = TankConfig.RED_TANK_DAMAGE;
    }

    setBody(): void {
        this.body = new PIXI.Graphics();
        this.body.beginFill(TankConfig.RED_TANK);
        this.body.drawRect(0, 0, Utils.CELL_SIZE, Utils.CELL_SIZE);
    }

    fire(): void {
        super.fire();
        setTimeout(() => {
            super.fire();
        }, 50);
        //Blue tank fires 2 bullets
    }
}