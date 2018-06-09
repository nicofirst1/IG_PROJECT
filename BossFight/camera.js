var InitCamera = function (scene) {
    var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 10, 0), scene);

    camera.position = new BABYLON.Vector3(0, 35, 0);

    // This attaches the camera to the canvas

    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    camera.ellipsoidOffset = new BABYLON.Vector3(0, 0.5, 0);
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera._needMoveForGravity = true;

    // WASD
    camera.keysUp = [87];    // W
    camera.keysDown = [83];  // S
    camera.keysLeft = [65];  // A
    camera.keysRight = [68]; // D

    //camera.parent = this.object;
    camera.speed = 4.0;
    camera.inertia = 0.6;
    camera.angularInertia = 0;
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


    return camera
};


var fps = 35;
var max_jump_heigth = 10;

var cameraJump = function (scene) {
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


    jump.setKeys(keys);

    var easingFunction = new BABYLON.CircleEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    jump.setEasingFunction(easingFunction);

    cam.animations.push(jump);

    scene.beginAnimation(cam, 0, fps, false);
};

