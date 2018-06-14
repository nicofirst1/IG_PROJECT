var canvas;
var scene;
var engine;


var gravity = new BABYLON.Vector3(0, -1.5, 0);

var start = function () {

    if (!BABYLON.Engine.isSupported()) return;

    hide_menu();


    BABYLON.Animation.AllowMatricesInterpolation = true;


    canvas = document.getElementById("renderCanvas");

    //---ENGINE
    engine = new BABYLON.Engine(canvas, true);
    //disable online support (remove warnings)
    engine.enableOfflineSupport = false;
    engine.doNotHandleContextLost = true;

    //---SCENE
    scene = new BABYLON.Scene(engine);
    scene.enablePhysics();
    scene.gravity = gravity;
    scene.collisionsEnabled = true;


    initOptimizer(scene);


    var camera = InitCamera(scene);
    //add the camera to the scene
    scene.addCamera(camera);


    initGui(scene, camera);

    var array = initLight(scene);
    var light = array[0];
    var shadowGenerator = array[1];


    var grounds = initMap(scene, light, shadowGenerator, camera);


    initCharacter(scene, camera, shadowGenerator, grounds);
    initSounds(scene);


    // If meteorite 20 below the ground it starts again from the sky
    scene.registerBeforeRender(function () {

        if (useThirdP && bodyMesh) {
            bodyMesh.rotation.x = -camera.rotation.x;
            bodyMesh.rotation.z = -camera.rotation.z;
            //body.position.y = -0.5;
        } else {
            bodyMesh.rotation.x = 0;
            bodyMesh.rotation.z = 0;
            bodyMesh.position.z = 1;
            bodyMesh.position.y = -3;

        }

        if (camera.position.y < -100) displayGameOver();
        scene.meshes.forEach(function (m) {
            if (m.name == "meteorite" && m.position.y < -600) {
                m.dispose();
                createMeteorite(grounds, scene);
            }
        })
    });

    //----LISTENERS
    addKeyboardListeners();
    windowListener();

    //engine.runRenderLoop(function () {
    //   scene.render();
    //});

};


var hide_menu = function () {
    //
    // var menu_items=[];
    // menu_items.push(document.getElementById("main-menu"));
    //
    // for (var elem in menu_items){
    //     elem.style.display='none';
    //     elem.style.visibility = 'hidden';
    //
    // }
    //
    var menu = document.getElementById("main-menu");
    menu.style.display = 'none';
    menu = document.getElementById("loading");
    menu.style.display = 'none';
    menu = document.getElementById("menu-title");
    menu.style.display = 'none';


};
