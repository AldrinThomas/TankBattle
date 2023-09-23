import { Graphics } from "pixi.js";
import Utils from "../Utils/Utils";
import IGameBullet from "src/interfaces/IGameBullet";

export default class TankbattleBullet implements IGameBullet {
    direction: string;
    body: Graphics;
    damage: number;
    velocity: number;

    constructor(direction: string, damage: number) {
        this.direction = direction;
        this.damage = damage;
        this.velocity = 10;
        this._setBody();
    }

    update(delta: number): void {
        switch (this.direction) {
            case "ArrowUp":
                this.body.position.y -= this.velocity * delta;
                break;
            case "ArrowDown":
                this.body.position.y += this.velocity * delta;
                break;
            case "ArrowLeft":
                this.body.position.x -= this.velocity * delta;
                break;
            case "ArrowRight":
                this.body.position.x += this.velocity * delta;
                break;
        }
    }

    private _setBody(): void {
        this.body = new Graphics();
        this.body.beginFill(Utils.BULLET_COLOR);
        this.body.drawRect(0, 0, Utils.BULLET_SIZE / 2, Utils.BULLET_SIZE / 2);
    }
}