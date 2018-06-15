var metheoriteID = 0;
var seed = 1;
var max_dim = 3;
var min_dim = 0.5;
var meteorite_number = 5;
var max_meteorites = 10;
var meteoriteProb = 0.0;

var createMeteorite = function (ground, scene) {

    var b = BABYLON.Mesh.CreateSphere("metheorite", 12, 3, scene);
   //water.addToRenderList(b);
    b.subID = metheoriteID;
    metheoriteID += 1;
    if (metheoriteID > 1000) metheoriteID = 0;

    var max = max_dim;
    var min = min_dim;
    var rnd = Math.random(seed++) * (max - min) + min;
    b.scaling.x = rnd;
    b.scaling.y = rnd;
    b.scaling.z = rnd;

    b.checkCollisions = true;

    b.physicsImpostor = new BABYLON.PhysicsImpostor(b, BABYLON.PhysicsImpostor.SphereImpostor, {
        mass: 10,
        friction: 0,
        restitution: 0.1
    });

    var minPos = -groundSize / 2 + 20;
    var maxPos = groundSize / 2 - 20;
    b.position.y = 1000;
    b.position.x = Math.random(seed++) * (maxPos - minPos) + minPos;
    b.position.z = Math.random(seed++) * (maxPos - minPos) + minPos;
    console.log(b.position.x, b.position.z);


    var impulseDir = new BABYLON.Vector3(0, 0, 0);

    var impulseScale = 100;
    //var metPos = b.getAbsolutePosition();
    //impulseDir.x = (camera.position.x -  metPos.x) * impulseScale * rnd;
    //impulseDir.y = (camera.position.y -  metPos.y) * impulseScale * rnd;
    //impulseDir.z = (camera.position.z -  metPos.z) * impulseScale * rnd;
    impulseDir.y = -impulseScale;

    b.physicsImpostor.applyImpulse(impulseDir, b.getAbsolutePosition());

    var fireballMaterial = new BABYLON.StandardMaterial("material", scene);
    fireballMaterial.diffuseTexture = new BABYLON.Texture("Resources/fire/fire.jpg", scene);
    fireballMaterial.emissiveColor = new BABYLON.Vector3(1.0, 0.0, 0.0);
    b.material = fireballMaterial;

    var pSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    pSystem.emitter = b;
    pSystem.particleTexture = new BABYLON.Texture("Resources/map/flares/flare.png", scene);
    pSystem.minEmitBox = new BABYLON.Vector3(-1, 1, -1);
    pSystem.maxEmitBox = new BABYLON.Vector3(1, 1, 1);

    pSystem.color1 = new BABYLON.Color4(1.000, 0.271, 0.000, 1.0);
    pSystem.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
    pSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

    pSystem.minSize = rnd * 5;
    pSystem.maxSize = rnd * 10;

    pSystem.minLifeTime = 0.3;
    pSystem.maxLifeTime = 1.5;

    pSystem.emitRate = 500;

    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    pSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    pSystem.direction1 = new BABYLON.Vector3(0, 8, 0);
    pSystem.direction2 = new BABYLON.Vector3(0, 8, 0);

    pSystem.minAngularSpeed = 0;
    pSystem.maxAngularSpeed = Math.PI;

    pSystem.minEmitPower = 1;
    pSystem.maxEmitPower = 2;
    pSystem.updateSpeed = 0.005;

    b.particleSystem = pSystem;

    pSystem.start();

    // b.onCollide = function(collidedMesh) {
    //     window.alert(collidedMesh.id);
    //     pSystem.stop();
    // };


    b.physicsImpostor.registerOnPhysicsCollide(ground.physicsImpostor, function () {
        if (b.position.y < 80) {
            explosion(scene, pSystem, b, "Resources/map/flares/flare.png", 1.000, 0.271, 0.000, rnd * 6, rnd * 12, ground, true, true);
        }
    });

    b.physicsImpostor.registerOnPhysicsCollide(groundBox.physicsImpostor, function () {
        if (b.position.y < 80) {
            explosion(scene, pSystem, b, "Resources/map/flares/flare.png", 0.1, 0.1, 0.1, rnd * 6, rnd * 12, ground, true, true);
        }
    });


};