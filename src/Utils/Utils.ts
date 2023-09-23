import * as PIXI from 'pixi.js';
export default class Utils {
    static readonly CELL_SIZE: number = 35;
    static readonly BULLET_SIZE: number = 20;
    static readonly BOUNDARY_SIZE: number = 10;
    static readonly CELL_COUNT: number = 50;

    static readonly SCREEN_WIDTH: number = Utils.CELL_SIZE * Utils.CELL_COUNT + (Utils.BOUNDARY_SIZE * 2);
    static readonly SCREEN_HEIGHT: number = Utils.CELL_SIZE * Utils.CELL_COUNT + (Utils.BOUNDARY_SIZE * 2);

    static readonly HAY_COUNT: number = 25;
    static readonly WALL_COUNT: number = 50;

    static readonly EMPTY_CELL_COLOR: number = 0xf4f3f1;
    static readonly WALL_COLOR: number = 0x044076;
    static readonly HAY_COLOR: number = 0xffeda0;
    static readonly BULLET_COLOR: number = 0xff0000;

    static readonly MAX_TANK_VELOCITY: number = 5;

    static readonly HAY_HEALTH: number = 100;

    static getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static hitTest(positionA: PIXI.Point, bodyA: PIXI.Graphics, bodyB: PIXI.Graphics): boolean {
        const boundsA = bodyA.getBounds();
        const boundsB = bodyB.getBounds();

        const collision = positionA.x + boundsA.width > boundsB.x &&
            positionA.x < boundsB.x + boundsB.width &&
            positionA.y + boundsA.height > boundsB.y &&
            boundsA.y < boundsB.y + boundsB.height;

        return collision;
    }

    static calculateCollisionPercentage(positionA: PIXI.Point, boundsA: PIXI.Graphics, boundsB: PIXI.Graphics): number {
        // Calculate the coordinates of the overlapping rectangle
        const x1 = Math.max(positionA.x, boundsB.x);
        const y1 = Math.max(positionA.y, boundsB.y);
        const x2 = Math.min(positionA.x + boundsA.width, boundsB.x + boundsB.width);
        const y2 = Math.min(positionA.y + boundsA.height, boundsB.y + boundsB.height);

        // Calculate the area of overlap
        const overlapArea = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);

        // Calculate the area of one of the objects 
        const areaA = boundsA.width * boundsA.height;

        // Calculate the percentage of collision
        const collisionPercentage = (overlapArea / areaA) * 100;

        return collisionPercentage;
    }
}
