var useThirdP = true;
var up = false;
var TPcamera;
var legsCharge = true;
var camera;

var falling = true;
var isJumping = true;

var jumpKeyRelease = false;
var modeSwitch = 0;
var camera_position = new BABYLON.Vector3(0, 55, 0);

var InitCamera = function (scene) {
    camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 10, 0), scene);


    camera.position = camera_position;

    // This attaches the camera to the canvas
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    camera.ellipsoidOffset = new BABYLON.Vector3(0, -0.5, 0);
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


    TPcamera = new BABYLON.ArcRotateCamera("thirdPCamera", scene);
    //TPcamera.position = posCamera1;
    TPcamera.alpha = -Math.PI / 2;
    TPcamera.beta = 1; // 0 for above
    TPcamera.radius = 10; // 100 for above

    TPcamera.layerMask = 2;
    TPcamera.parent = camera;
    TPcamera.applyGravity = true;
    //TPcamera.checkCollisions = true;


    scene.activeCameras.push(camera);
    scene.activeCameras.push(TPcamera);

    useThirdP = true;
    up = false;


    return camera
};

var switchFPS = function (scene) {



    scene.activeCameras = remove_item(scene.activeCameras, TPcamera);
    armAdjustFP();


};

var switchTPS = function (scene, is2d) {

    if (is2d) {
        TPcamera.beta = 0;
        TPcamera.radius = 200;
    }
    else {
        TPcamera.beta = 1;
        TPcamera.radius = 10;

        scene.activeCameras.push(TPcamera);
        armSetOP();
        armAdjustTP();

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
