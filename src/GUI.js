var advancedTexture;

var healt_value = 100;
var healt_bar;
var healt_text;


var mana_value = 100;
var mana_bar;
var mana_text;


var ignoreCollision = ["arm"]; //meshes to ignore for collisions
var damages = {
    lava: 1,
    bulletFireballRest: 1,
    metheorite: 30,
};
var previousCollision = {
    id: "",
    subId: ""
};

var healtRegenTimeout = 2000;
var manaRegenTimeout = 2000;


var score_value = 0;
var gameOverBar;
var gameOverText;
var gameOverFlag = false;

var manaInterval;
var manaConsumptionFlag = false;
var manaConsumptionInterval = 100;

var initGui = function (scene, camera) {


    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("gameUI", true, scene);

    //init healt and mana bars
    healtBar(scene, advancedTexture);
    manaBar(scene, advancedTexture);
    scoreBar(scene, advancedTexture);
    gameOver();
    writtenInfos(advancedTexture);


    //add mdamage function on camera
    camera.onCollide = inflictDamage;

    //restore healt with timer
    setInterval(function () {
        if (gameOverFlag) {
            return
        }
        if (healt_value < 100) {
            update_healt(1)
        }
    }, healtRegenTimeout);

    //restore mana with timer
    setInterval(function () {
        if (gameOverFlag) {
            return
        }
        if (manaConsumptionFlag) {
            return;
        }
        if (mana_value < 100) {
            update_mana(1)
        }
    }, manaRegenTimeout);


};


var inflictDamage = function (collidedMesh) {
    //ignore collision with sepcific meshes

    if (healt_value == 0) {
        return;
    }
    for (var idx in ignoreCollision) {
        if (collidedMesh.id === ignoreCollision[idx]) {
            return;
        }
    }

    if (collidedMesh.id === "groundBox" || collidedMesh.id === "ground") {
        if (Math.abs(camera.position.y - 5.51) < 0.0001 ) {
                update_healt(-1);
        }

        if (isJumping && falling && upperLegRight) {
            upperLegLeft.rotation.x = Math.PI / 2;
            upperLegRight.rotation.x = Math.PI / 2;


            var angleUpperRight00 = 0;
            var angleUpperRight11 = 0;
            var inc = 0.07;

            scene.beforeRender = function () {

                if (angleUpperRight00 >= -maxUpper) {
                    angleUpperRight00 -= inc;
                    upperLegRight.rotate(BABYLON.Axis.Z, -inc);
                    lowerLegRight.rotate(BABYLON.Axis.Z, -inc);
                    upperLegLeft.rotate(BABYLON.Axis.Z, -inc);
                    lowerLegLeft.rotate(BABYLON.Axis.Z, -inc);
                    bodyMesh.position.y -= inc * 0.5;
                } else {
                    if (angleUpperRight11 >= -maxUpper) {
                        angleUpperRight11 -= inc;
                        upperLegRight.rotate(BABYLON.Axis.Z, inc);
                        lowerLegRight.rotate(BABYLON.Axis.Z, inc);
                        upperLegLeft.rotate(BABYLON.Axis.Z, inc);
                        lowerLegLeft.rotate(BABYLON.Axis.Z, inc);

                        upperLegRight.rotate(BABYLON.Axis.Y, -inc / 7);
                        upperLegLeft.rotate(BABYLON.Axis.Y, inc / 7);

                        bodyMesh.position.y += inc * 0.5;
                    } else {
                        upperLegRight.setRotation(upperLegRightInit);
                        upperLegLeft.setRotation(upperLegLeftInit);
                        isJumping = false;
                        falling = false;
                        fireKeyboardEvent("keydown", 87);
                        fireKeyboardEvent("keyup", 87);
                    }
                }
            };


            isJumping = false;
            falling = false;
        }

        return;
    }


    if (collidedMesh.id === "restObject") {
        update_healt(-damages.bulletFireballRest)
    }

    //ignore collision from same objects
    if (previousCollision.id === collidedMesh.id) {
        if (previousCollision.subId === collidedMesh.subId) {
            return;
        }
    }

    if (collidedMesh.id === "metheorite") {

        update_healt(-damages.metheorite);


    }


    //update previous collision
    previousCollision.id = collidedMesh.id;
    previousCollision.subId = collidedMesh.subId;


};

var displayGameOver = function () {
    gameOverFlag = true;


    gameOverText.text = "Game Over\n\nYour Score is : " + score_value + "\n\nReload page to restart game";

    advancedTexture.addControl(gameOverBar);
    advancedTexture.addControl(gameOverText);

    setInterval(function () {

        gameOverBar.alpha += 0.01;
    }, 50);


}

var update_healt = function (value) {
    healt_value += value;

    if (healt_value <= 0) {

        displayGameOver();
    }

    healt_bar.width = 5 * healt_value + "px";
    healt_text.text = healt_value + "/100";

};

var update_mana = function (value) {
    mana_value += value;
    mana_bar.width = 5 * mana_value + "px";
    mana_text.text = mana_value + "/100";

};

var healtBar = function (scene, advancedTexture) {


    healt_bar = new BABYLON.GUI.Rectangle();
    healt_bar.width = "500px";
    healt_bar.height = "40px";
    healt_bar.cornerRadius = 0;
    healt_bar.color = "Orange";
    healt_bar.thickness = 4;
    healt_bar.background = "red";
    healt_bar.top = "10px";

    healt_bar.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    healt_bar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    var healt_bk = new BABYLON.GUI.Rectangle();
    healt_bk.width = "500px";
    healt_bk.height = "40px";
    healt_bk.cornerRadius = 0;
    healt_bk.color = "gray";
    healt_bk.thickness = 4;
    healt_bk.background = "gray";
    healt_bk.top = "10px";

    healt_bk.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    healt_bk.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    healt_text = new BABYLON.GUI.TextBlock();
    healt_text.text = "100/100";
    healt_text.color = "white";
    healt_text.fontSize = 24;
    healt_text.top = "15px";

    healt_text.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    healt_text.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    healt_text.paddingLeft = "200px";

    advancedTexture.addControl(healt_bk);
    advancedTexture.addControl(healt_bar);
    advancedTexture.addControl(healt_text);


};


var manaBar = function (scene, advancedTexture) {


    mana_bar = new BABYLON.GUI.Rectangle();
    mana_bar.width = "500px";
    mana_bar.height = "40px";
    mana_bar.cornerRadius = 0;
    mana_bar.color = "#429cff";
    mana_bar.thickness = 4;
    mana_bar.background = "#1f36ff";
    mana_bar.top = "55px";
    mana_bar.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    mana_bar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    var mana_bk = new BABYLON.GUI.Rectangle();
    mana_bk.width = "500px";
    mana_bk.height = "40px";
    mana_bk.cornerRadius = 0;
    mana_bk.color = "#5e5e5e";
    mana_bk.thickness = 4;
    mana_bk.background = "#5e5e5e";
    mana_bk.top = "55px";
    mana_bk.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    mana_bk.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    mana_text = new BABYLON.GUI.TextBlock();
    mana_text.text = "100/100";
    mana_text.color = "white";
    mana_text.fontSize = 24;
    mana_text.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    mana_text.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    mana_text.paddingLeft = "200px";
    mana_text.paddingTop = "60";

    advancedTexture.addControl(mana_bk);
    advancedTexture.addControl(mana_bar);
    advancedTexture.addControl(mana_text);


};


var scoreBar = function (scene, advancedTexture) {


    var score_bk = new BABYLON.GUI.Rectangle();
    score_bk.width = "200px";
    score_bk.height = "40px";
    score_bk.cornerRadius = 0;
    score_bk.color = "#5e5e5e";
    score_bk.thickness = 4;
    score_bk.background = "#5e5e5e";
    score_bk.top = "10px";
    score_bk.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    score_bk.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    var score_text = new BABYLON.GUI.TextBlock();
    score_text.text = "Score: " + score_value;
    score_text.color = "white";
    score_text.fontSize = 24;
    score_text.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    score_text.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    score_text.paddingRight = "10px";
    score_text.paddingTop = "15";

    advancedTexture.addControl(score_bk);
    advancedTexture.addControl(score_text);


    //restore mana with timer
    setInterval(function () {
            if (gameOverFlag) {
                return
            }
            score_value += 1;
            score_text.text = "Score: " + score_value;
        }
        , 1000);


};

var gameOver = function () {


    var canvas = document.getElementById("renderCanvas");

    gameOverBar = new BABYLON.GUI.Rectangle("gameOver");
    gameOverBar.background = "black";
    gameOverBar.height = canvas.height;
    gameOverBar.alpha = 0.0;
    gameOverBar.width = canvas.width;
    //gameOverBar.alpha = 1;

    gameOverText = new BABYLON.GUI.TextBlock();
    gameOverText.color = "white";
    gameOverText.fontSize = 100;


};


var playMusicFlag = true;
var currentPov;
var audio;

var writtenInfos = function (adcancedTexture) {
    audio = document.getElementById("sfx-background");

    var header = new BABYLON.GUI.TextBlock();
    header.text = "Play/pause music with 'M'";
    header.width = "250px";
    header.color = "yellow";
    header.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    header.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    header.paddingTop = "750px";


    var header1 = new BABYLON.GUI.TextBlock();
    header1.text = "Switch POV with 'V'";
    header1.width = "250px";
    header1.color = "yellow";
    header1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    header1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    header1.paddingTop = "700px";

    var header2 = new BABYLON.GUI.TextBlock();
    header2.text = "Toggle snow with 'Z'";
    header2.width = "250px";
    header2.color = "yellow";
    header2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    header2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    header2.paddingTop = "650px";


    currentPov = new BABYLON.GUI.TextBlock();
    currentPov.text = "Current POV is TP";
    currentPov.width = "250px";
    currentPov.color = "magenta";
    currentPov.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    currentPov.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    currentPov.paddingTop = "750px";


    adcancedTexture.addControl(header);
    adcancedTexture.addControl(header1);
    adcancedTexture.addControl(header2);
    adcancedTexture.addControl(currentPov);

};