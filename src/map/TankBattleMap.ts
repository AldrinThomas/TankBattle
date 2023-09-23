import * as PIXI from 'pixi.js';
import TankBattleEmptyCell from './TankBattleEmptyCell';
import Utils from '../Utils/Utils';
import TankBattleWall from './TankBattleWall';
import TankBattleHay from './TankBattleHay';
import IGameTank from '../interfaces/IGameTank';
import IGameBullet from '../interfaces/IGameBullet';
import IGameCell from '../interfaces/IGameCell';
import TankBattleBoundary from './TankBattleBoundary';
import EventManager from '../eventManager/eventManger';
import IGameMap from 'src/interfaces/IGameMap';

export default class TankBattleMap implements IGameMap {

    body: PIXI.Container;
    assignedCells: IGameCell[];
    unassignedCells: TankBattleEmptyCell[];

    constructor() {
        this.body = new PIXI.Container();
        this.assignedCells = [];
        this.unassignedCells = [];
        this._createCellBlocksForMap();
        EventManager.getInstance().addListner("removeCell", this._removeCell.bind(this));
    }

    public assignRandomCellForTank(tank: IGameTank) {
        this._selectEmptyCell(tank.body);
    }

    public checkBulletCollisionWithObjects(bullet: IGameBullet): boolean {
        let collision: boolean = false;
        for (let i: number = 0; i < this.assignedCells.length; i++) {
            collision = Utils.hitTest(bullet.body.position, bullet.body, this.assignedCells[i].body);
            if (collision) {
                this.assignedCells[i].updateHealth(bullet.damage);
                break;
            }
        }
        return collision;
    }

    public checkTankCollisionWithObjects(tank: IGameTank): number {
        let collision: number = 0;
        for (let i: number = 0; i < this.assignedCells.length; i++) {
            collision = Utils.calculateCollisionPercentage(tank.getnewPosition(), tank.body, this.assignedCells[i].body);
            if (collision)
                break;
        }
        return collision;
    }

    private _removeCell(cell: IGameCell) {
        this.assignedCells.splice(this.assignedCells.indexOf(cell), 1);
        this.body.removeChild(cell.body);
    }

    private _createCellBlocksForMap() {
        //creates boundaries for the map area
        this._createBoundaries();
        //creates empty cells for the map here
        for (let row: number = 0; row < Utils.CELL_COUNT; row++) {
            for (let col: number = 0; col < Utils.CELL_COUNT; col++) {
                let cellItem: TankBattleEmptyCell = new TankBattleEmptyCell();
                cellItem.body.position.set((col * Utils.CELL_SIZE + 1) + Utils.BOUNDARY_SIZE, (row * Utils.CELL_SIZE) + Utils.BOUNDARY_SIZE + 1);
                this.body.addChild(cellItem.body);
                this.unassignedCells.push(cellItem);
            }
        }

        //assigns random cells for walls and hays here
        this._assignWalls();
        this._assignHays();
    }

    private _createBoundaries() {
        const boundaries: TankBattleBoundary[] = [];
        for (let i = 0; i < 4; i++) {
            let boundary: IGameCell = new TankBattleBoundary();
            boundary.body.beginFill(0xff0000);
            this.body.addChild(boundary.body);
            boundaries.push(boundary);
        }
        boundaries[0].body.drawRect(0, 0, Utils.SCREEN_HEIGHT, Utils.BOUNDARY_SIZE);
        boundaries[1].body.drawRect(0, 0, Utils.SCREEN_HEIGHT, Utils.BOUNDARY_SIZE);
        boundaries[1].body.position.set(0, Utils.SCREEN_HEIGHT - Utils.BOUNDARY_SIZE);
        boundaries[2].body.drawRect(0, 0, Utils.BOUNDARY_SIZE, Utils.SCREEN_HEIGHT);
        boundaries[3].body.drawRect(0, 0, Utils.BOUNDARY_SIZE, Utils.SCREEN_HEIGHT);
        boundaries[3].body.position.set(Utils.SCREEN_HEIGHT - Utils.BOUNDARY_SIZE, 0);
        this.assignedCells.push(...boundaries);

    }

    private _assignWalls() {
        for (let i: number = 0; i < Utils.WALL_COUNT; i++) {
            const wall = new TankBattleWall();
            const selectedId: number = this._selectEmptyCell(wall.body);
            this.body.addChild(wall.body);
            this.assignedCells.push(wall);
        }
    }

    private _assignHays() {
        for (let i: number = 0; i < Utils.HAY_COUNT; i++) {
            const hay = new TankBattleHay();
            const selectedId: number = this._selectEmptyCell(hay.body);
            this.body.addChild(hay.body);
            this.assignedCells.push(hay);
        }
    }

    private _selectEmptyCell(newItem: PIXI.Graphics) {
        let random = Utils.getRandomNumber(0, this.unassignedCells.length - 2);
        do {
            random = Utils.getRandomNumber(0, this.unassignedCells.length - 2);
        }
        while ((this.unassignedCells[random] as TankBattleEmptyCell).assigned == true);

        let cell: TankBattleEmptyCell = this.unassignedCells[random];
        cell.assigned = true;
        newItem.position.set(this.unassignedCells[random].body.x + (Utils.CELL_SIZE / 2), this.unassignedCells[random].body.y + (Utils.CELL_SIZE / 2));
        newItem.position.set(this.unassignedCells[random].body.x, this.unassignedCells[random].body.y);
        this.unassignedCells.splice(random, 1);
        return random;
    }

}