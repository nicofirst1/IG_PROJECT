

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

    var gravity= new BABYLON.Vector3(0, -0.6, 0);

    // BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;

    var canvas = document.getElementById("renderCanvas");

    var engine = new BABYLON.Engine(canvas, true);
    //disable online support (remove warnings)
    engine.enableOfflineSupport=false;
    engine.doNotHandleContextLost = true;


    var scene = new BABYLON.Scene(engine);
    scene.enablePhysics();
    scene.gravity = gravity;
    scene.collisionsEnabled = true;


    var optimizer=initOptimizer(scene);


    var camera =InitCamera(scene);
    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

    initHealtMana(scene,camera );

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


    BABYLON.Animation.AllowMatricesInterpolation = true;

    //add the camera to the scene
    scene.addCamera(camera);
    //scene.registerBeforeRender(beforeRenderFunction);

    var grounds = mapInit(scene, light,shadowGenerator, camera);


    scene.gravity = new BABYLON.Vector3(0, -0.5, 0);
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

    window.addEventListener("resize", function () { engine.resize();});

    initCharacter(scene, camera, shadowGenerator, grounds);



    engine.runRenderLoop(function () {
        scene.render();
    });

};
