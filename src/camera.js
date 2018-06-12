var useThirdP = true;
var up=false;
var camera1;
var legsCharge = true;


var InitCamera = function (scene) {
    var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 10, 0), scene);

    var camera_position = new BABYLON.Vector3(110, 45, 0);

    camera.position = camera_position;

    // This attaches the camera to the canvas
    camera.ellipsoid = new BABYLON.Vector3(0, 0, 0);
    camera.ellipsoidOffset = new BABYLON.Vector3(0, -0.2, 0);
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
    camera.speed = 10.0;
    camera.inertia = 0.0;
    camera.angularInertia = 0.3;
    camera.angularSensibility = 100;


    camera.attachControl(canvas, true);

    var posCamera1 = new BABYLON.Vector3(0, -3, 0);

    camera1 = new BABYLON.ArcRotateCamera("thirdPCamera", scene);
    //camera1.position = posCamera1;
    camera1.alpha = -Math.PI / 2;
    camera1.beta = 1; // 0 for above
    camera1.radius = 7; // 100 for above

    camera1.layerMask = 2;
    camera1.parent = camera;
    camera1.applyGravity = true;
    //camera1.checkCollisions = true;


    // var rt1 = new BABYLON.RenderTargetTexture("depth", 1024, scene, true, true);
    // scene.customRenderTargets.push(rt1);
    // rt1.activeCamera = camera1;
    // rt1.renderList = scene.meshes;

    scene.activeCameras.push(camera);
    scene.activeCameras.push(camera1);

    useThirdP = true;
    up=false;

    window.addEventListener("keydown", onKeyDown, false);

    function onKeyDown(event) {
        switch (event.keyCode) {
            case 32:
                if (legsCharge  && !isJumping) {
                    legsCharge = false;
                    legsJumpCharge(upperLegRight, scene, true);
                    legsJumpCharge(upperLegLeft, scene, false);
                }
        }
    }

    // add listener for jump
    window.addEventListener("keyup", onKeyUp, false);

    function onKeyUp(event) {
        switch (event.keyCode) {
            case 32:
                if (!legsCharge) {
                    legsJumpRelease(upperLegRight, scene, true);
                    legsJumpRelease(upperLegLeft, scene, false);
                }
                break;


            case 86:
                if (useThirdP) {
                    scene.activeCameras=remove_item(scene.activeCameras, camera1);
                    useThirdP = false;
                    upperArmRight.position = new BABYLON.Vector3(4, -0.5, 5);
                    upperArmLeft.position = new BABYLON.Vector3(-4, -0.5, 5);
                }
                else {
                    scene.activeCameras.push(camera1);
                    useThirdP = true;
                    upperArmRight.position = new BABYLON.Vector3(2, 0.5, 0.5);
                    upperArmLeft.position = new BABYLON.Vector3(-2, 0.5, 0.5);
                }
                break;
            case 88:
                if(!up){
                    camera1.beta=0;
                    camera1.radius=500;
                    up=true
                }
                else{
                    camera1.beta = 1;
                    camera1.radius = 7;

                    up=false
                }
                break;


        }
    }


    return camera
};

function remove_item(arr, value) {
    for (b in arr) {
        if (arr[b] == value) {
            arr.splice(b, 1);
            break;
        }
    }
    return arr;
}

var fps = 13;//the speed of the jump execution
var max_jump_heigth = 4.5;
var isJumping = false;

//jump animation
var cameraJump = function (scene) {


    isJumping = true;

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
        current_position += 2;
        keys.push({frame: i, value: current_position});
    }

    for (; i < max_jump_heigth + 1; i++) {
        keys.push({frame: i, value: current_position});
    }


    jump.setKeys(keys);
    /*

        var easingFunction = new BABYLON.CircleEase();
        easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        jump.setEasingFunction(easingFunction);
    */

    cam.animations.push(jump);


    var animatable = scene.beginAnimation(cam, false, fps, false);
    animatable.onAnimationEnd = function () {
        animatable.animationStarted = false;
        legsCharge = true;
    };

};



var legsJumpCharge = function(leg, scene) {

    var legsMov = new BABYLON.Animation(
        "legsMov",
        "rotation.x", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keys = [];

    var curr_rot = Math.PI / 2;

    var inc = 0.4;

    keys.push({frame: 0, value: curr_rot});

    for (var i = 1; curr_rot <= 2.5; i++) {
        curr_rot += inc;
        keys.push({frame: i, value: curr_rot});
    }



    legsMov.setKeys(keys);

    leg.animations = [];
    leg.animations.push(legsMov);

    scene.beginAnimation(leg, false, i, false);

    var cam = scene.cameras[0];

    cam.animations = [];

    var jump = new BABYLON.Animation(
        "jump",
        "position.y", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keys = [];

    var current_position = cam.position.y;

    keys.push({frame: 0, value: current_position});

    for (var j = 1; j < i; j++) {
        current_position -= 0.25;
        keys.push({frame: j, value: current_position});
    }


    jump.setKeys(keys);

    cam.animations.push(jump);


    var animatable = scene.beginAnimation(cam, false, fps, false);

};

var legsJumpRelease = function(leg, scene, bodyTodo) {

    var legsMov = new BABYLON.Animation(
        "legsMov",
        "rotation.x", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keys = [];

    var curr_rot = leg.rotation.x;

    var inc = 0.4;

    keys.push({frame: 0, value: curr_rot});

    for (var i = 1; curr_rot > Math.PI / 2; i++) {
        curr_rot -= inc;
        keys.push({frame: i, value: curr_rot});
    }

    legsMov.setKeys(keys);

    leg.animations = [];
    leg.animations.push(legsMov);

    scene.beginAnimation(leg, false, i, false);

    var cam = scene.cameras[0];

    cam.animations = [];

    var jump = new BABYLON.Animation(
        "jump",
        "position.y", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keys = [];

    var current_position = cam.position.y;

    keys.push({frame: 0, value: current_position});

    for (var j = 1; j < i; j++) {
        current_position += 0.25;
        keys.push({frame: j, value: current_position});
    }


    jump.setKeys(keys);

    cam.animations.push(jump);


    var animatable = scene.beginAnimation(cam, false, fps, false);

    animatable.onAnimationEnd = function () {
        animatable.animationStarted = false;
        cameraJump(scene);
    };

};


