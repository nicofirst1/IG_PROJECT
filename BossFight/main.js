var light_position1 = new BABYLON.Vector3(100, 100, 100);


var maxWalkingVelocity = 0.25;
var startWalkingVelocity = 0.01;
var currentWalkingVelocity = startWalkingVelocity;

var jumpProgress = 0;
var maxJump = 20;

window.onload = function init() {

    if (!BABYLON.Engine.isSupported()) return;

    // BABYLON.OBJFileLoader.OPTIMIZE_WITH_UV = true;

    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);

    scene.gravity = new BABYLON.Vector3(0, -0.15, 0);
    scene.collisionsEnabled = true;
    scene.enablePhysics();

    var camera = InitCamera(scene);
    var light1 = new BABYLON.PointLight("Moon", light_position1, scene);

    // Set full screen
    var setFullScreen = function () {
        engine.isPointerLock = true;
        window.removeEventListener('click', setFullScreen);
        canvas.requestPointerLock();
    };
    window.addEventListener('click', setFullScreen);

    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light1);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;


    //----ENGINE
    //disabel online support (remove warnings)
    engine.enableOfflineSupport = false;

    BABYLON.Animation.AllowMatricesInterpolation = true;

    // Attach the camera to the canvas
    camera.attachControl(canvas, true);

    //----SCENES
    //add the camera to the scene
    scene.addCamera(camera);
    scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    //scene.registerBeforeRender(beforvar dir = camera.getTarget().subtract(camera.position);

        if (window.moveW) {
            if (currentWalkingVelocity < maxWalkingVelocity) {
                currentWalkingVelocity += 0.007;var dir = camera.getTarget().subtract(camera.position);

        if (window.moveW) {
            if (currentWalkingVelocity < maxWalkingVelocity) {
                currentWalkingVelocity += 0.007;
            } else {
                currentWalkingVelocity = maxWalkingVelocity;
            }
            camera.position.x += dir.x;
            camera.position.y += dir.y;
            camera.position.z += dir.z;
        }

        if (window.moveS) {
            if (currentWalkingVelocity < maxWalkingVelocity) {
                currentWalkingVelocity += 0.007;
            } else {
                currentWalkingVelocity = maxWalkingVelocity;
            }
            camera.position.x -= dir.x;
            camera.position.y -= dir.y;
            camera.position.z -= dir.z;
        }

        if (window.moveA) {
            if (currentWalkingVelocity < maxWalkingVelocity) {
                currentWalkingVelocity += 0.007;
            } else {
                currentWalkingVelocity = maxWalkingVelocity;
            }
            var matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, Math.PI / 2);
            var dir2 = BABYLON.Vector3.TransformCoordinates(dir, matrix);

            camera.position.x -= dir2.x;
            camera.position.y -= dir2.y;
            camera.position.z -= dir2.z;
        }

        if (window.moveD) {
            if (currentWalkingVelocity < maxWalkingVelocity) {
                currentWalkingVelocity += 0.007;
            } else {
                currentWalkingVelocity = maxWalkingVelocity;
            }
            var matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, Math.PI / 2);
            var dir2 = BABYLON.Vector3.TransformCoordinates(dir, matrix);

            camera.position.x += dir2.x;
            camera.position.y += dir2.y;
            camera.position.z += dir2.z;
        }

        if (!window.moveW && !window.moveS && !window.moveA && !window.moveD) {
            currentWalkingVelocity = startWalkingVelocity;
        }
            } else {
                currentWalkingVelocity = maxWalkingVelocity;
            }
            camera.position.x += dir.x;
            camera.position.y += dir.y;
            camera.position.z += dir.z;
        }

        if (window.moveS) {
            if (currentWalkingVelocity < maxWalkingVelocity) {
                currentWalkingVelocity += 0.007;
            } else {
                currentWalkingVelocity = maxWalkingVelocity;
            }
            camera.position.x -= dir.x;
            camera.position.y -= dir.y;
            camera.position.z -= dir.z;
        }

        if (window.moveA) {
            if (currentWalkingVelocity < maxWalkingVelocity) {
                currentWalkingVelocity += 0.007;
            } else {
                currentWalkingVelocity = maxWalkingVelocity;
            }
            var matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, Math.PI / 2);
            var dir2 = BABYLON.Vector3.TransformCoordinates(dir, matrix);

            camera.position.x -= dir2.x;
            camera.position.y -= dir2.y;
            camera.position.z -= dir2.z;
        }

        if (window.moveD) {
            if (currentWalkingVelocity < maxWalkingVelocity) {
                currentWalkingVelocity += 0.007;
            } else {
                currentWalkingVelocity = maxWalkingVelocity;
            }
            var matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, Math.PI / 2);
            var dir2 = BABYLON.Vector3.TransformCoordinates(dir, matrix);

            camera.position.x += dir2.x;
            camera.position.y += dir2.y;
            camera.position.z += dir2.z;
        }

        if (!window.moveW && !window.moveS && !window.moveA && !window.moveD) {
            currentWalkingVelocity = startWalkingVelocity;
        }

    var ground = mapInit(scene);

    //box.checkCollisions = true;

    //initWeapon();

    // CALLS

    //var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    //initCharacter(scene, camera, shadowGenerator);

    //camera = BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);
    //camera.position.y = 15;

    //camera.physicsImpostor = new BABYLON.PhysicsImpostor(camera, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10, restitution: 0.9, friction: 0.05 }, scene);

    initCharacter();

    engine.runRenderLoop(function () {

        // var dir = camera.getTarget().subtract(camera.position);
        //
        // if (window.moveW) {
        //     if (currentWalkingVelocity < maxWalkingVelocity) {
        //         currentWalkingVelocity += 0.007;
        //     } else {
        //         currentWalkingVelocity = maxWalkingVelocity;
        //     }
        //     camera.position.x += dir.x;
        //     camera.position.y += dir.y;
        //     camera.position.z += dir.z;
        // }
        //
        // if (window.moveS) {
        //     if (currentWalkingVelocity < maxWalkingVelocity) {
        //         currentWalkingVelocity += 0.007;
        //     } else {
        //         currentWalkingVelocity = maxWalkingVelocity;
        //     }
        //     camera.position.x -= dir.x;
        //     camera.position.y -= dir.y;
        //     camera.position.z -= dir.z;
        // }
        //
        // if (window.moveA) {
        //     if (currentWalkingVelocity < maxWalkingVelocity) {
        //         currentWalkingVelocity += 0.007;
        //     } else {
        //         currentWalkingVelocity = maxWalkingVelocity;
        //     }
        //     var matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, Math.PI / 2);
        //     var dir2 = BABYLON.Vector3.TransformCoordinates(dir, matrix);
        //
        //     camera.position.x -= dir2.x;
        //     camera.position.y -= dir2.y;
        //     camera.position.z -= dir2.z;
        // }
        //
        // if (window.moveD) {
        //     if (currentWalkingVelocity < maxWalkingVelocity) {
        //         currentWalkingVelocity += 0.007;
        //     } else {
        //         currentWalkingVelocity = maxWalkingVelocity;
        //     }
        //     var matrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, Math.PI / 2);
        //     var dir2 = BABYLON.Vector3.TransformCoordinates(dir, matrix);
        //
        //     camera.position.x += dir2.x;
        //     camera.position.y += dir2.y;
        //     camera.position.z += dir2.z;
        // }
        //
        // if (!window.moveW && !window.moveS && !window.moveA && !window.moveD) {
        //     currentWalkingVelocity = startWalkingVelocity;
        // }

        if (window.jump) {
            if (jumpProgress < maxJump) {
                camera.position.y += 0.3;
                jumpProgress += 1;
            } else {
                jumpProgress = 0;
                window.jump = false;
            }
        }

        scene.render();
    });
};

