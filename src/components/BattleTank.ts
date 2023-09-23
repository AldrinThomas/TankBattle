import Utils from '../Utils/Utils';
import IGameTank from '../interfaces/IGameTank';
import * as PIXI from 'pixi.js';
import TankbattleBullet from './TankBattleBullet';
import IGameBullet from 'src/interfaces/IGameBullet';
import EventManager from '../eventManager/eventManger';

export default class BattleTank implements IGameTank {
    body: PIXI.Graphics;
    velocity: number;
    delta: number;
    bulletDamage: number;
    direction: string;
    constructor() {
        this.setBody();
        this.direction = "ArrowUp";
        this.velocity = 0;
        this.delta = 0;
        this.bulletDamage = 0;
    }
    setBody(): void {

    }

    update(delta: number): void {
        this.delta = delta;
        const newPosition: PIXI.Point = this.getnewPosition();
        this.body.position.set(newPosition.x, newPosition.y);
    }

    fire(): void {
        const startPos: PIXI.Point = new PIXI.Point(this.body.position.x, this.body.position.y);
        const bullet: IGameBullet = new TankbattleBullet(this.direction, this.bulletDamage);
        bullet.body.position.set(startPos.x, startPos.y);

        switch (this.direction) {
            case "ArrowUp":
                bullet.body.position.x += (this.body.width / 2) - (bullet.body.width / 2);
                break;
            case "ArrowDown":
                bullet.body.position.x += (this.body.width / 2) - (bullet.body.width / 2);
                bullet.body.position.y += this.body.height - (bullet.body.height / 2);
                break;
            case "ArrowLeft":
                bullet.body.position.y += (this.body.height / 2) - (bullet.body.height / 2);
                break;
            case "ArrowRight":
                bullet.body.position.x += this.body.width - (bullet.body.width / 2);
                bullet.body.position.y += (this.body.height / 2) - (bullet.body.width / 2);
                break;
        }

        EventManager.getInstance().triggerEvent("addBulletToScreen", bullet);
    }

    public getnewPosition(): PIXI.Point {
        const newPosition: PIXI.Point = new PIXI.Point(this.body.position.x, this.body.position.y);
        switch (this.direction) {
            case "ArrowUp":
                newPosition.y -= this.velocity * this.delta;
                break;
            case "ArrowDown":
                newPosition.y += this.velocity * this.delta;
                break;
            case "ArrowLeft":
                newPosition.x -= this.velocity * this.delta;
                break;
            case "ArrowRight":
                newPosition.x += this.velocity * this.delta;
                break;
        }
        return newPosition;
    }

    changeDirection(direction: string) {
        this.direction = direction;
        if (this.velocity < Utils.MAX_TANK_VELOCITY) {
            this.velocity++;
        }
    }

    applyBreak(): void {
        this.velocity = 0;
    }
}

export class TankConfig {
    static readonly RED_TANK: string = "0xff0000";
    static readonly BLUE_TANK: string = "0x0000ff";
    static readonly GREEN_TANK: string = "0x00ff00";
    static readonly RED_TANK_DAMAGE: number = 10;
    static readonly BLUE_TANK_DAMAGE: number = 20;
    static readonly GREEN_TANK_DAMAGE: number = 25;
}