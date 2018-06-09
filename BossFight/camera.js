
var InitCamera=function (scene) {
    var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0, 10, 0), scene);

    camera.position = new BABYLON.Vector3(0, 1.5, 0);

    // This attaches the camera to the canvas

    camera.ellipsoid = new BABYLON.Vector3(0.5, 1, 0.5);
    camera.ellipsoidOffset = new BABYLON.Vector3(0, 0.5, 0);
    camera.checkCollisions = true;
    camera.applyGravity = true;

    // WASD
    camera.keysUp = [87];    // W
    camera.keysDown = [83];  // S
    camera.keysLeft = [65];  // A
    camera.keysRight = [68]; // D

    //camera.parent = this.object;
    camera.speed = 4.0;
    camera.inertia = 0.1;
    camera.angularInertia = 0;
    camera.angularSensibility=100;


    return camera
}