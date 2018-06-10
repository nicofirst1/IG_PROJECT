var InitCamera = function (scene) {
    var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 10, 0), scene);

    camera.position = new BABYLON.Vector3(30, 45, 0);

    var pSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    pSystem.emitter = camera;
    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    pSystem.light = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, 0, 0), scene);
    pSystem.light.diffuse = new BABYLON.Color3(.8, 0, 0);
    pSystem.light.range = 15;

    pSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    pSystem.maxEmitBox = new BABYLON.Vector3(0, .2, 0);
    pSystem.color1 = new BABYLON.Color4(0.5, 0.05, 1.0, .9);
    pSystem.color2 = new BABYLON.Color4(0.0, 0.05, 0.85, .9);
    pSystem.colorDead = new BABYLON.Color4(.5, .02, 0, .5);
    pSystem.minSize = 1.75;
    pSystem.maxSize = 2.0;
    pSystem.minLifeTime = 0.075;
    pSystem.maxLifeTime = 0.1;
    pSystem.emitRate = 400;
    pSystem.gravity = new BABYLON.Vector3(0, 0, 0);
    pSystem.direction1 = new BABYLON.Vector3(0, .05, 0);
    pSystem.direction2 = new BABYLON.Vector3(0, -.05, 0);
    pSystem.minAngularSpeed = 1.5;
    pSystem.maxAngularSpeed = 2.5;
    pSystem.minEmitPower = 0.4;
    pSystem.maxEmitPower = 0.75;
    pSystem.updateSpeed = 0.008;

    // This attaches the camera to the canvas

    camera.ellipsoid = new BABYLON.Vector3(2, 2, 2);
    camera.ellipsoidOffset = new BABYLON.Vector3(0, -1, 0);
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera._needMoveForGravity = true;

    // WASD
    camera.keysUp = [87];    // W
    camera.keysDown = [83];  // S
    camera.keysLeft = [65];  // A
    camera.keysRight = [68]; // D

    /*
    -----------------------------------
    Camera parameters
    -----------------------------------
    */
    camera.speed = 2.5;
    camera.inertia = 0.4;
    camera.angularInertia = 0.3;
    camera.angularSensibility = 100;

    // add listener for jump
    window.addEventListener("keyup", onKeyUp, false);

    function onKeyUp(event) {
        switch (event.keyCode) {
            case 32:
                cameraJump(scene);
                break;
        }
    }


    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("gameUI",true,scene);

    healtBar(scene,advancedTexture);
    manaBar(scene,advancedTexture);


    return camera
};

var fps = 13;//the speed of the jump execution
var max_jump_heigth = 10;

//jump animation
var cameraJump = function(scene) {
    var cam = scene.cameras[0];

    cam.animations = [];

    var jump = new BABYLON.Animation(
        "jump",
        "position.y", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keys = [];

    var i;
    var current_position = cam.position.y;

    keys.push({frame: 0, value: current_position});

    for (i = 1; i < max_jump_heigth; i++) {
        current_position += 1;
        keys.push({frame: i, value: current_position});
    }

    for (; i < max_jump_heigth + 2; i++) {
        keys.push({frame: i, value: current_position});
    }


    jump.setKeys(keys);
    /*

        var easingFunction = new BABYLON.CircleEase();
        easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        jump.setEasingFunction(easingFunction);
    */

    cam.animations.push(jump);

    scene.beginAnimation(cam, false, fps, false);
};

var healtBar= function (scene,advancedTexture) {


    var healt_bar = new BABYLON.GUI.Rectangle();
    healt_bar.width = "500px";
    healt_bar.height = "40px";
    healt_bar.cornerRadius = 0;
    healt_bar.color = "Orange";
    healt_bar.thickness = 4;
    healt_bar.background = "red";
    healt_bar.top="10px";

    healt_bar.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    healt_bar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    var healt_text=new BABYLON.GUI.TextBlock();
    healt_text.text="100/100";
    healt_text.color="white";
    healt_text.fontSize=24;
    healt_text.top="15px";

    healt_text.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    healt_text.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    healt_text.paddingLeft="200px";


    advancedTexture.addControl(healt_bar);
    advancedTexture.addControl(healt_text);


};


var manaBar= function (scene, advancedTexture) {


    var mana_bar = new BABYLON.GUI.Rectangle();
    mana_bar.width = "500px";
    mana_bar.height = "40px";
    mana_bar.cornerRadius = 0;
    mana_bar.color = "#429cff";
    mana_bar.thickness = 4;
    mana_bar.background = "#1f36ff";
    mana_bar.top="55px";
    mana_bar.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    mana_bar.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;


    var mana_text=new BABYLON.GUI.TextBlock();
    mana_text.text="100/100";
    mana_text.color="white";
    mana_text.fontSize=24;
    mana_text.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    mana_text.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    mana_text.paddingLeft="200px";
    mana_text.paddingTop="60";

    advancedTexture.addControl(mana_bar);
    advancedTexture.addControl(mana_text);


};