function Main() {
    this.stage = new PIXI.Stage(0x66FF99, true);
    this.renderer = new PIXI.autoDetectRenderer(
        640,
        1136,
        document.getElementById("game-canvas")
    );
    this.scrollSpeed = Main.MIN_SCROLL_SPEED;
    this.loadSpriteSheet();
}

Main.MIN_SCROLL_SPEED = 5;
Main.MAX_SCROLL_SPEED = 10;
Main.SCROLL_ACCELERATION = 0.005;
Main.AVATAR_X_POSITION = 10;

Main.prototype.update = function() {
    if ((this.scroller.front.slices[Math.floor((this.scroller.front.viewportX + this.avatar.position.x) / WallSlice.WIDTH)].y == null) && (this.prev != null)) {

        this.text.setText((++this.points).toString());

    }

    this.prev = this.scroller.front.slices[Math.floor((this.scroller.front.viewportX + this.avatar.position.x) / WallSlice.WIDTH)].y;

    if (!this.avatar.crashed(this.scroller.front.slices[Math.floor((this.scroller.front.viewportX + this.avatar.position.x) / WallSlice.WIDTH)].y)) {

        this.avatar.updateHeight();

        this.scroller.moveViewportXBy(this.scrollSpeed);
        this.scrollSpeed += Main.SCROLL_ACCELERATION;
        if (this.scrollSpeed > Main.MAX_SCROLL_SPEED) {
            this.scrollSpeed = Main.MAX_SCROLL_SPEED;
        }

        requestAnimFrame(this.update.bind(this));
    } else {
        var _this = this;
        this.g_over = new PIXI.Text("GAME OVER!", {
            font: "50px Arial",
            fill: "red",
            align: "center"
        });
        this.g_over.interactive = true;
        this.g_over.anchor.x = 0.5;
        this.g_over.anchor.y = 0.5;
        this.g_over.position.y = 568;
        this.g_over.position.x = 320;



        //this.g_over.click = function(e){_this.spriteSheetLoaded(); _this.stage.removeChild(_this.g_over);};;
        this.g_over.tap = function(e) {
            _this.spriteSheetLoaded();
            _this.stage.removeChild(_this.g_over);
        };;
        this.stage.addChild(this.g_over);

    }



    this.renderer.render(this.stage);
};

Main.prototype.loadSpriteSheet = function() {
    var assetsToLoad = ["resources/fico.json", "resources/birdP.json", "resources/wall.json", "resources/bg-far.png", "resources/bg-mid.png"];
    loader = new PIXI.AssetLoader(assetsToLoad);
    loader.onComplete = this.spriteSheetLoaded.bind(this);
    loader.load();
}

Main.prototype.spriteSheetLoaded = function() {
    this.scroller = new Scroller(this.stage);

    this.avatar = new Avatar();
    this.stage.addChild(this.avatar);

    this.text = new PIXI.Text("0", {
        font: "50px Arial",
        fill: "red"
    });
    this.stage.addChild(this.text);
    this.points = 0;
    this.prev = null;

    requestAnimFrame(this.update.bind(this));
}

Main.prototype.clickOnScreen = function() {
    this.avatar.jump();
}