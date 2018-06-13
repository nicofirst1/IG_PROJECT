var useThirdP = true;
var up=false;
var camera1;
var legsCharge = true;
var camera;

var jumpKeyRelease = false;

var InitCamera = function (scene) {
    camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 10, 0), scene);

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
    camera1.radius = 10; // 100 for above

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
    var modeSwitch=0;
    up=false;

    window.addEventListener("keydown", onKeyDown, false);

    function onKeyDown(event) {
        switch (event.keyCode) {
            case 32:
                if (!chargedForJump  && !isJumping) {
                    if (canCharge) legsJumpCharge(scene);
                }
        }
    }

    // add listener for jump
    window.addEventListener("keyup", onKeyUp, false);

    function onKeyUp(event) {
        switch (event.keyCode) {
            case 32:
                jumpKeyRelease = true;
                if (chargedForJump) {
                    legsJumpRelease(scene);
                }
                canCharge = true;
                break;


            case 86://V
                if (modeSwitch===0) {
                    switchFPS(scene);
                    modeSwitch = 1;
                    useThirdP=false;
                    header2.text="Current POV is FP"


                }
                else if(modeSwitch===1) {
                    switchTPS(scene,false);
                    modeSwitch = 2;
                    useThirdP=true;
                    header2.text="Current POV is TP"

                }
                else if (modeSwitch===2){
                    switchTPS(scene,true);
                    modeSwitch = 0;
                    useThirdP=true;
                    header2.text="Current POV is 2D"

                }
                else{
                    modeSwitch=0;
                }
                break;


        }
    }


    return camera
};

var switchFPS=function (scene) {

    scene.activeCameras=remove_item(scene.activeCameras, camera1);
    upperArmRight.position = new BABYLON.Vector3(4, -0.5, 5);
    upperArmLeft.position = new BABYLON.Vector3(-4, -0.5, 5);

};

var switchTPS=function (scene, is2d) {

    if (is2d){
        camera1.beta=0;
        camera1.radius=500;
    }
    else{
        camera1.beta=1;
        camera1.radius=7;

        scene.activeCameras.push(camera1);
        upperArmRight.position = new BABYLON.Vector3(2, 0.5, 0.5);
        upperArmLeft.position = new BABYLON.Vector3(-2, 0.5, 0.5);

    }


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
var max_jump_heigth = 8;
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


    var animatable = scene.beginAnimation(cam, false, fps, false);
    animatable.onAnimationEnd = function () {
        animatable.animationStarted = false;
        chargedForJump = false;
        canSetRelease = true;
        canSetCharged = true;
        movementBool = true;
    };

};




