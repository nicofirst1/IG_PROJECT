var canvas;
var scene;
var engine;

var hide_menu=function () {
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
    var menu=document.getElementById("main-menu");
    menu.style.display='none';
    menu=document.getElementById("loading");
    menu.style.display='none';
    menu=document.getElementById("menu-title");
    menu.style.display='none';



};

var start=function () {

    if (!BABYLON.Engine.isSupported()) return;

    hide_menu();


    BABYLON.Animation.AllowMatricesInterpolation = true;

    var gravity= new BABYLON.Vector3(0, -2.1, 0);


    canvas = document.getElementById("renderCanvas");

    //---ENGINE
    engine = new BABYLON.Engine(canvas, true);
    //disable online support (remove warnings)
    engine.enableOfflineSupport=false;
    engine.doNotHandleContextLost = true;

    //---SCENE
    scene = new BABYLON.Scene(engine);
    scene.enablePhysics();
    scene.gravity = gravity;
    scene.collisionsEnabled = true;


    var optimizer=initOptimizer(scene);


    var camera =InitCamera(scene);

    initHealtMana(scene,camera );

    var array= initLight(scene);
    var light=array[0];
    var shadowGenerator=array[1];


    windowListener();





    //add the camera to the scene
    scene.addCamera(camera);
    //scene.registerBeforeRender(beforeRenderFunction);

    var grounds = mapInit(scene, light,shadowGenerator, camera);




    initCharacter(scene, camera, shadowGenerator, grounds);

    initSounds(scene);

    //initShield(scene,camera);

    // If meteorite 20 below the ground it starts again from the sky
    scene.registerBeforeRender(function () {

        if (useThirdP && bodyMesh) {
            bodyMesh.rotation.x = -camera.rotation.x;
            bodyMesh.rotation.z = -camera.rotation.z;
            //body.position.y = -0.5;
        } else {
            //body.rotation.x = 0;
            //body.rotation.z = 0;
            //body.position.y = -0.2;
        }

        if (camera.position.y < -100) displayGameOver();
        scene.meshes.forEach(function (m) {
            if (m.name=="meteorite" && m.position.y < -600) {
                m.dispose();
                createMeteorite(grounds, scene);
            }
        })
    });

    //----ENGINE
    addKeyboardListeners();

    engine.runRenderLoop(function () {
        scene.render();
    });

};
