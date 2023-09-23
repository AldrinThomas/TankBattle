import * as PIXI from 'pixi.js';
import Utils from '../Utils/Utils';
import IGameCell from 'src/interfaces/IGameCell';
import EventManager from '../eventManager/eventManger';
export default class TankBattleHay implements IGameCell {
    type: string;
    body: PIXI.Graphics;
    health: number;
    public healthText: PIXI.Text;
    constructor() {
        const borderColor = 0xFF0000; // Red
        const borderWidth = 1;

        this.body = new PIXI.Graphics();
        this.body.beginFill(Utils.HAY_COLOR);
        this.body.lineStyle(borderWidth, borderColor);
        this.body.drawRect(0, 0, Utils.CELL_SIZE, Utils.CELL_SIZE);
        this.body.endFill();

        this.type = "Hay";
        this.health = Utils.HAY_HEALTH;
        this._setText();
    }

    private _setText() {
        this.healthText = new PIXI.Text(this.health, {
            fontSize: 15,
            align: 'center',
        });
        this.healthText.anchor.set(0.5);
        this.healthText.position.set(Utils.CELL_SIZE / 2, Utils.CELL_SIZE / 2)
        this.body.addChild(this.healthText);
    }
    updateHealth(damage: number): void {
        this.health -= damage;
        this.healthText.text = this.health;
        if (this.health <= 0) {
            EventManager.getInstance().triggerEvent("removeCell", this);
        }
    }
}