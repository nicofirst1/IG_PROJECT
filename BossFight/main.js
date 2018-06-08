var light_position=new BABYLON.Vector3(20, 50, 70);

var jumpHeight = 10;
var jumpProgress = jumpHeight;
var jumpBool = true;

window.onload = function init() {

    if (!BABYLON.Engine.isSupported()) return;

    // BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;

    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 100, BABYLON.Vector3.Zero(), scene);
    var light = new BABYLON.PointLight("Moon", light_position, scene);
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);

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



    //----ENGINE
    //disabel online support (remove warnings)
    engine.enableOfflineSupport=false;

    //----CAMERA
    //set the camera position
    camera.setPosition(new BABYLON.Vector3(25, 25, 25));
    camera.attachControl(canvas);


    //----SCENES
    //add the camera to the scene
    scene.addCamera(camera);
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    scene.registerBeforeRender(beforeRenderFunction);


    var g = new BABYLON.Vector3(0, -9.81, 0);
    var dt = 0.002;
    var physicsPlugin = new BABYLON.CannonJSPlugin();

    scene.enablePhysics(g, physicsPlugin);

    // CALLS
    var ground = mapInit(scene);

    //var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    //initCharacter(scene, camera, shadowGenerator);

    var warrior = BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);
    warrior.position.y = 30;

    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9, friction: 0.05 }, scene);
    warrior.physicsImpostor = new BABYLON.PhysicsImpostor(warrior, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10, restitution: 0.9, friction: 0.05 }, scene);


    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 65) {
            warrior.locallyTranslate(new BABYLON.Vector3(1, 0, 0));
        }
        else if(event.keyCode == 68) {
            warrior.locallyTranslate(new BABYLON.Vector3(-1, 0, 0));
        }
        else if(event.keyCode == 87) {
            warrior.locallyTranslate(new BABYLON.Vector3(0, 0, -1));
            warrior.translate(BABYLON.Vector3.Up(), 3 * 3);
        }
        else if(event.keyCode == 83) {
            warrior.locallyTranslate(new BABYLON.Vector3(0, 0, 1));
        }
        else if(event.keyCode == 32) {
            if (jumpBool == false) {
                jumpBool = true;
            }
        }
    });

    engine.runRenderLoop(function () {
        if (jumpBool) {
            if (jumpProgress > 0) {
                warrior.locallyTranslate(new BABYLON.Vector3(0, -1, 0));
                jumpProgress -= 1;
            } else {
                jumpBool = false;
                jumpProgress = jumpHeight;
            }
        }
        scene.render();
    });
};