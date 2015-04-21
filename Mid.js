function Mid() {
	var texture = PIXI.Texture.fromImage("resources/bg-mid.png");
	PIXI.TilingSprite.call(this, texture, 1136, 400);

	this.scale.y = 1.8;
	this.position.x = 0;
	this.position.y = 190;
	this.tilePosition.x = 0;
	this.tilePosition.y = -1;

	this.viewportX = 0;
}

Mid.constructor = Mid;
Mid.prototype = Object.create(PIXI.TilingSprite.prototype);

Mid.DELTA_X = 0.32;

Mid.prototype.setViewportX = function(newViewportX) {
	var distanceTravelled = newViewportX - this.viewportX;
	this.viewportX = newViewportX;
	this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
}