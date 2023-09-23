import * as PIXI from 'pixi.js';
import TankBattleMap from './map/TankBattleMap';
import IGameTank from './interfaces/IGameTank';
import IGameBullet from './interfaces/IGameBullet';
import RedTank from './tanks/RedTank';
import BlueTank from './tanks/BlueTank';
import GreenTank from './tanks/GreenTank';
import EventManager from './eventManager/eventManger';
import IGameMap from './interfaces/IGameMap';
export default class TankBattleGame extends PIXI.Container {
    mapArea: IGameMap;
    currentTank: IGameTank;
    bulletArray: IGameBullet[];
    tankList: IGameTank[];
    constructor() {
        super();
        this.bulletArray = [];
        this._createElements();
        this._addKeyListners();
    }

    private _createElements() {

        this.tankList = [new RedTank(), new BlueTank(), new GreenTank()];
        this.mapArea = new TankBattleMap();
        this.addChild(this.mapArea.body);

        this._switchTank();
        this.mapArea.assignRandomCellForTank(this.currentTank);
    }

    private _switchTank() {
        let tankPosition: PIXI.Point;
        let previousTankDirection: string;
        if (this.currentTank) {
            tankPosition = this.currentTank.body.position;
            previousTankDirection = this.currentTank.direction;
            this.removeChild(this.currentTank.body);
        }

        this.currentTank = this.tankList.shift();
        if (tankPosition) {
            this.currentTank.body.position.set(tankPosition.x, tankPosition.y);
            this.currentTank.direction = previousTankDirection;
        }
        this.addChild(this.currentTank.body);
        this.tankList.push(this.currentTank);
    }

    private _addKeyListners() {
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case "ArrowUp":
                case "ArrowDown":
                case "ArrowLeft":
                case "ArrowRight":
                    this._changeTankDirection(event.key);
                    break;
                case "t":
                case "T":
                    this._switchTank();
                    break;

            }
        });

        window.addEventListener("keyup", (event) => {
            switch (event.key) {
                case "ArrowUp":
                case "ArrowDown":
                case "ArrowLeft":
                case "ArrowRight":
                    this.currentTank.applyBreak();
                    break;
                case "f":
                case "F":
                    this._fireTank();
                    break;
            }
        });

        EventManager.getInstance().addListner("addBulletToScreen", this._addBulletToScreen.bind(this));
    }

    private _changeTankDirection(direction: string) {
        this.currentTank.changeDirection(direction);
    }

    private _fireTank() {
        this.currentTank.fire();
    }

    private _addBulletToScreen(bullet: IGameBullet) {
        this.bulletArray.push(bullet);
        this.addChild(bullet.body);
    }

    public update(delta: number): void {
        for (let i: number = 0; i < this.bulletArray.length; i++) {
            this.bulletArray[i].update(delta);

            const collision: boolean = this.mapArea.checkBulletCollisionWithObjects(this.bulletArray[i]);
            if (collision) {
                this.removeChild(this.bulletArray[i].body);
                this.bulletArray.splice(i, 1);
                break;
            }
        }
        let collision = this.mapArea.checkTankCollisionWithObjects(this.currentTank);

        if (collision < 3) {
            this.currentTank.update(delta);
        }

        if (collision != 0)
            this.currentTank.applyBreak();//slowing down while squeezing through cell
    }
}