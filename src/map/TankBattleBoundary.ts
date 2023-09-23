import { Graphics } from "pixi.js";
import Utils from "../Utils/Utils";
import IGameCell from "../interfaces/IGameCell";

export default class TankBattleBoundary implements IGameCell {
    type: string;
    health: number;
    body: Graphics;
    constructor() {
        this.type = "Boundary";
        this.body = new Graphics();
    }
    updateHealth(damage: number): void {

    }
}