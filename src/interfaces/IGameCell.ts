import * as PIXI from 'pixi.js';
export default interface IGameCell {
    type: string;
    health: number;
    body: PIXI.Graphics;
    updateHealth(damage: number): void;
}