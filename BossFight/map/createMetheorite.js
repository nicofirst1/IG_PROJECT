var metheoriteID = 0;
var seed = 1;

var createMetheorite = function (grounds, scene) {

    var b = BABYLON.Mesh.CreateSphere("metheorite", 12, 3, scene);
    b.subID = metheoriteID;
    metheoriteID += 1;
    if (metheoriteID > 1000) metheoriteID = 0;

    var max = 15;
    var min = 3;
    var rnd = Math.random(seed++) * (max - min) + min;
    b.scaling.x = rnd;
    b.scaling.y = rnd;
    b.scaling.z = rnd;
    b.physicsImpostor = new BABYLON.PhysicsImpostor(b, BABYLON.PhysicsImpostor.SphereImpostor, { mass: rnd / 3 , friction: 1000, restitution: 0 });
    b.checkCollisions = true;

    var minPos = -250;
    var maxPos = 250;
    b.position.y = 1000;
    b.position.x =  Math.random(seed++) * (maxPos - minPos) + minPos;
    b.position.z = Math.random(seed++) * (maxPos - minPos) + minPos;

    var impulseDir = new BABYLON.Vector3(0, 0, 0);
    impulseDir.y = 1000;
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

    pSystem.minSize = rnd * 3;
    pSystem.maxSize = rnd * 6;

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

    pSystem.start();

    // b.onCollide = function(collidedMesh) {
    //     window.alert(collidedMesh.id);
    //     pSystem.stop();
    // };

    var groundBox = grounds[1];
    b.physicsImpostor.registerOnPhysicsCollide(groundBox.physicsImpostor, function() {
        if (b.position.y < 200) {
            explosionAnimation(scene, pSystem, b, "Resources/map/flares/flare.png", 0.1, 0.1, 0.1, rnd * 6, rnd * 12, grounds, true);
        }
    });

    var ground0 = grounds[0];
    b.physicsImpostor.registerOnPhysicsCollide(ground0.physicsImpostor, function() {
        if (b.position.y < 200) {
            explosionAnimation(scene, pSystem, b, "Resources/map/flares/flare.png", 1.000, 0.271, 0.000, rnd * 6, rnd * 12, grounds, true);
        }
    });


};