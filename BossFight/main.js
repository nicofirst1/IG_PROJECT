window.onload = function init() {

    if (!BABYLON.Engine.isSupported()) return;

    var gravity= new BABYLON.Vector3(0, 9.8, 0);

    // BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;

    var canvas = document.getElementById("renderCanvas");


    var engine = new BABYLON.Engine(canvas, true);
    //disable online support (remove warnings)
    engine.enableOfflineSupport=false;

    var scene = new BABYLON.Scene(engine);
    scene.enablePhysics();
    scene.gravity=gravity;
    scene.collisionsEnabled = true;


    var camera =InitCamera(scene);
    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

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

    var gl = new BABYLON.GlowLayer("glow", scene);

    //----ENGINE


    BABYLON.Animation.AllowMatricesInterpolation = true;


    //add the camera to the scene
    scene.addCamera(camera);
    //scene.registerBeforeRender(beforeRenderFunction);

    mapInit(scene, light,shadowGenerator);


    scene.gravity = new BABYLON.Vector3(0, -0.2, 0);
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

    window.addEventListener("resize", function () { engine.resize();});

    initCharacter(scene, camera, shadowGenerator);

    engine.runRenderLoop(function () {
        scene.render();
    });
};

