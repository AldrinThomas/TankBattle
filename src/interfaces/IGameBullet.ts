import * as PIXI from 'pixi.js';
export default interface IGameBullet {
    body: PIXI.Graphics;
    direction: string;
    damage: number;
    velocity: number;
    update(delta: number): void;

}