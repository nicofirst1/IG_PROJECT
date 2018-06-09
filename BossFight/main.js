window.onload = function init() {

    if (!BABYLON.Engine.isSupported()) return;

    // BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;

    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    var camera =InitCamera(scene);



    var array= initLight(scene);
    var light=array[0];
    var shadowGenerator=array[1];

    // Set full screen
    var setFullScreen = function () {
        engine.isPointerLock = true;
        window.removeEventListener('click', setFullScreen);
        canvas.requestPointerLock();
    };
    window.addEventListener('click', setFullScreen);



    //----ENGINE
    //disable online support (remove warnings)
    engine.enableOfflineSupport=false;

    BABYLON.Animation.AllowMatricesInterpolation = true;

    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

    //add the camera to the scene
    scene.addCamera(camera);
    scene.ambientColor = new BABYLON.Color3(0.3, 0.15, 0.3);
    //scene.registerBeforeRender(beforeRenderFunction);

    mapInit(scene, light,shadowGenerator);

    scene.enablePhysics();

    scene.gravity = new BABYLON.Vector3(0, -0.6, 0);
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

    scene.collisionsEnabled = true;
    camera.checkCollisions = true;

    window.addEventListener("resize", function () { engine.resize();});

    initCharacter(scene, camera, shadowGenerator);

    engine.runRenderLoop(function () {
        scene.render();
    });
};

