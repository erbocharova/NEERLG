import Phaser from 'phaser'
import overlay from "../../public/assets/Tileset/Background/Overlay_illumination_1.png"
export default class DeathScene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'DeathScene'});
    }

    preload()
    {
        this.load.image('backgroundDeath', overlay);
    }

    create()
    {
        this.add.image(512, 288, 'backgroundDeath');
        this.add.text(512, 288, 'you died :(', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', color: 'black' })
    }

    update(time, delta)
    {

    }
}