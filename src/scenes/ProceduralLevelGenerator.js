import Phaser from 'phaser'
 
export default class ProceduralLevelGenerator
{
    minLenght = 1;
    maxLenght = 6;
    levelLenght = 32;
    levelHeight = 18;
    platformList = [];

    getRandomInRange(minLenght, maxLenght)
    {
        return Math.floor(Math.random() * (maxLenght - minLenght + 1) + minLenght);
    }

    startPositionGenerator()
    {
        let rightEdge = this.getRandomInRange(this.minLenght, this.maxLenght);
        let platform = new Platform(0, rightEdge, 12);
        this.platformList.push(platform);
    }

    generateNextPlatform()
    {
        let index = this.platformList.length - 1;
        let lastRightEdge = this.platformList[index].rightEdge;
        let lastHeight = this.platformList[index].platformHeight;

        let leftEdge = lastRightEdge + this.getRandomInRange(2, 3);
        let platformHeight = lastHeight + this.getRandomInRange(-3, 3);

        if (platformHeight >= this.levelHeight){
            platformHeight = 14;
        }
        else if (platformHeight < 0){
            platformHeight = -platformHeight;
        }

        let rightEdge = leftEdge + this.getRandomInRange(this.minLenght, this.maxLenght);
        let platform = new Platform(leftEdge, rightEdge, platformHeight);
        this.platformList.push(platform);
    }


    generateLevel()
    {
        let index = 0;
        this.platformList = [];
        this.startPositionGenerator();
        let final = this.levelLenght - 9;
        while (index < final - 2)
        {
            this.generateNextPlatform();
            index = this.platformList[this.platformList.length - 1].rightEdge;
        }
        //let platform = new Platform(final, this.levelLenght - 1, this.levelHeight - 1);
        let platform = new Platform(0, this.levelLenght - 1, this.levelHeight - 1);
        this.platformList.push(platform);

        return this.platformList;
    }
}

class Platform
{
    constructor(leftEdge, rightEdge, platformHeight)
    {
        this.leftEdge = leftEdge;
        this.rightEdge = rightEdge;
        this.platformHeight = platformHeight;
    }
}