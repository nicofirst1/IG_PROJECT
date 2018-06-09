var light_position1=new BABYLON.Vector3(100, 100, 100);
var light_position2=new BABYLON.Vector3(-100, 100, -100);
var light_position3=new BABYLON.Vector3(-100, 100, 100);
var light_position4=new BABYLON.Vector3(100, 100, -100);


var warrior;

var maxWalkingVelocity = 0.25;
var startWalkingVelocity = 0.01;
var currentWalkingVelocity = startWalkingVelocity;


window.onload = function init() {

    if (!BABYLON.Engine.isSupported()) return;

    // BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;

    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 100, BABYLON.Vector3.Zero(), scene);
    var light1 = new BABYLON.PointLight("Moon", light_position1, scene);

    var light2 = new BABYLON.PointLight("Moon", light_position2, scene);
    var light3 = new BABYLON.PointLight("Moon", light_position3, scene);
    var light4 = new BABYLON.PointLight("Moon", light_position4, scene);

    var cam = scene.activeCamera;
    cam.attachControl(engine.getRenderingCanvas());
    cam.keysUp.push(90);
    cam.keysDown.push(83);
    cam.keysLeft.push(81);
    cam.keysRight.push(68);

    // Set full screen
    var setFullScreen = function () {
        engine.isPointerLock = true;
        window.removeEventListener('click', setFullScreen);
    };
    window.addEventListener('click', setFullScreen);

    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light1);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;


    //----ENGINE
    //disabel online support (remove warnings)
    engine.enableOfflineSupport=false;

    BABYLON.Animation.AllowMatricesInterpolation = true;

    //----CAMERA
    //set the camera position
    camera.setPosition(new BABYLON.Vector3(25, 25, 25));
    camera.attachControl(canvas);


    //----SCENES
    //add the camera to the scene
    scene.addCamera(camera);
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    //scene.registerBeforeRender(beforeRenderFunction);


    var g = new BABYLON.Vector3(0, -30, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();

    scene.enablePhysics(g, physicsPlugin);

    // CALLS
    mapInit(scene);

    //var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    //initCharacter(scene, camera, shadowGenerator);

    warrior = scene.meshes[1];

    //warrior = BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);
    //warrior.position.y = 15;

    //warrior.physicsImpostor = new BABYLON.PhysicsImpostor(warrior, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10, restitution: 0.9, friction: 0.05 }, scene);


    engine.runRenderLoop(function () {

        if (window.moveW) {
            if (currentWalkingVelocity < maxWalkingVelocity) {
                currentWalkingVelocity += 0.007;
            } else {
                currentWalkingVelocity = maxWalkingVelocity;
            }
            warrior.locallyTranslate(new BABYLON.Vector3(0, 0, -currentWalkingVelocity));
        }

        if (window.moveS) {
            if (currentWalkingVelocity < maxWalkingVelocity) {
                currentWalkingVelocity += 0.007;
            } else {
                currentWalkingVelocity = maxWalkingVelocity;
            }
            warrior.locallyTranslate(new BABYLON.Vector3(0, 0, currentWalkingVelocity));
        }

        if (window.moveA) {
            if (currentWalkingVelocity < maxWalkingVelocity) {
                currentWalkingVelocity += 0.007;
            } else {
                currentWalkingVelocity = maxWalkingVelocity;
            }
            warrior.locallyTranslate(new BABYLON.Vector3(currentWalkingVelocity, 0, 0));
        }

        if (window.moveD) {
            if (currentWalkingVelocity < maxWalkingVelocity) {
                currentWalkingVelocity += 0.007;
            } else {
                currentWalkingVelocity = maxWalkingVelocity;
            }
            warrior.locallyTranslate(new BABYLON.Vector3(-currentWalkingVelocity, 0, 0));
        }

        if (!window.moveW && !window.moveS && !window.moveA && !window.moveD) {
            currentWalkingVelocity = startWalkingVelocity;
        }

        if (window.jump) {
            warrior.locallyTranslate(new BABYLON.Vector3(0, 3, 0));
            window.jump = false;
        }

        scene.render();
    });
};