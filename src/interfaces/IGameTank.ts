import * as PIXI from 'pixi.js';
import IGameBullet from './IGameBullet';
interface IGameTank {
    velocity: number;
    direction: string;
    body: PIXI.Graphics;
    update(delta: number): void;
    setBody(): void;
    fire(): void;
    changeDirection(direction: string): void;
    applyBreak(): void;
    getnewPosition(): PIXI.Point
}
export default IGameTank;