function Avatar() {
    this.imgs = [
        PIXI.Texture.fromFrame("_0000_U0.png"),
        PIXI.Texture.fromFrame("_0001_U1.png"),
        PIXI.Texture.fromFrame("_0002_U2.png"),
        PIXI.Texture.fromFrame("_0003_U3.png"),
        PIXI.Texture.fromFrame("_0004_U4.png"),
        PIXI.Texture.fromFrame("_0005_U5.png"),
        PIXI.Texture.fromFrame("_0006_U6.png"),
        PIXI.Texture.fromFrame("_0007_U7.png"),
        PIXI.Texture.fromFrame("_0008_U8.png"),
        PIXI.Texture.fromFrame("_0009_U9.png"),
        PIXI.Texture.fromFrame("_0010_U10.png"),
        PIXI.Texture.fromFrame("_0011_U11.png"),
        PIXI.Texture.fromFrame("_0012_U12.png"),
        PIXI.Texture.fromFrame("_0013_U13.png")
    ];

    PIXI.MovieClip.call(this, this.imgs);

    this.position.x = 100;
    this.position.y = 500;
    this.scale.x = 0.5;
    this.scale.y = 0.5;

    this.jumped = false;

    this.i = 0.0;
    this.velocityY = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    this.animationSpeed = 0.4;
    this.play();
}

Avatar.constructor = Avatar;
Avatar.prototype = Object.create(PIXI.MovieClip.prototype);

Avatar.prototype.jump = function() {
    this.velocityY = -8;
    this.position.y += this.velocityY;
}

Avatar.prototype.updateHeight = function() {
    this.rotation = -(this.velocityY) / (-8) * 0.5;
    this.i = this.i + 0.5;

    this.velocityY += 0.5;
    this.position.y += this.velocityY;
}

Avatar.prototype.crashed = function(sliceHeight) {
    if (sliceHeight == null) return false;

    var ymin = sliceHeight - 150;
    var ymax = sliceHeight;

    if ((this.position.y < ymax) && (this.position.y > ymin)) {
        return false;
    } else return true;
}