import Phaser from 'phaser'

export default class EndScene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'EndScene'});
    }

    preload()
    {
        this.load.image('backgroundEnd', 'assets/Tileset/Background/Overlay_illumination.png');
    }

    create()
    {
        this.add.image(512, 288, 'backgroundEnd');
        this.add.text(512, 288, 'victory :)', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: 'black' })
    }

    update(time, delta)
    {

    }
}