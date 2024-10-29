import Phaser from 'phaser'

export default class Platform
{
    constructor(scene, x, y)
    {
        this.scene = scene;

        this.x = x;
        this.y = y;
    }
}