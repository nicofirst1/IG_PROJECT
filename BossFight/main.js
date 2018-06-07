window.onload = function init() {

    if (!BABYLON.Engine.isSupported()) return;

    BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;

    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);

    camera.setPosition(new BABYLON.Vector3(-40, 40, 0));

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

    engine.runRenderLoop(function () {
        scene.render();
    });
};