import * as PIXI from 'pixi.js';
import Utils from "../Utils/Utils";
import BattleTank, { TankConfig } from "../components/BattleTank";
import IGameBullet from 'src/interfaces/IGameBullet';

export default class BlueTank extends BattleTank {
    constructor() {
        super();
        this.bulletDamage = TankConfig.BLUE_TANK_DAMAGE;
    }

    setBody(): void {
        this.body = new PIXI.Graphics();
        this.body.beginFill(TankConfig.BLUE_TANK);
        this.body.drawRect(0, 0, Utils.CELL_SIZE, Utils.CELL_SIZE);
    }

    fire(): void {
        super.fire();
        setTimeout(() => {
            super.fire();
        }, 50);
        setTimeout(() => {
            super.fire();
        }, 100);

        //Blue tank fires 3 bullets
    }
}