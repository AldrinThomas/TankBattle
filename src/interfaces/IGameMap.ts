import * as PIXI from 'pixi.js';
import IGameTank from './IGameTank';
import IGameBullet from './IGameBullet';
export default interface IGameMap {
    body: PIXI.Container;
    assignRandomCellForTank(tank: IGameTank): void;
    checkBulletCollisionWithObjects(bullet: IGameBullet): boolean;
    checkTankCollisionWithObjects(tank: IGameTank): number
}