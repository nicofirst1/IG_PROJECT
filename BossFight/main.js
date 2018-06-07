window.onload = function init() {

    if (!BABYLON.Engine.isSupported()) return;

    // BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;

    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 100, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(25, 25, 25));
    scene.addCamera(camera);

    var light = new BABYLON.PointLight("Moon", new BABYLON.Vector3(20, 50, 70), scene);
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

    var beforeRenderFunction = function () {
        // Camera
        if (camera.beta < 0.1)
            camera.beta = 0.1;
        else if (camera.beta > (Math.PI / 2) * 0.9)
            camera.beta = (Math.PI / 2) * 0.9;

        if (camera.radius > 50)
            camera.radius = 50;

        if (camera.radius < 5)
            camera.radius = 5;
    };

    camera.attachControl(canvas);

    scene.registerBeforeRender(beforeRenderFunction);

    // CALLS
    mapInit(scene);
    initCharacter(scene, camera, shadowGenerator);

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 65) {
            scene.meshes[1].locallyTranslate(new BABYLON.Vector3(1, 0, 0));
        }
        else if(event.keyCode == 68) {
            scene.meshes[1].locallyTranslate(new BABYLON.Vector3(-1, 0, 0));
        }
        else if(event.keyCode == 87) {
            scene.meshes[1].locallyTranslate(new BABYLON.Vector3(0, 0, -1));
        }
        else if(event.keyCode == 83) {
            scene.meshes[1].locallyTranslate(new BABYLON.Vector3(0, 0, 1));
        }
    });

    engine.runRenderLoop(function () {
        scene.render();
    });
};