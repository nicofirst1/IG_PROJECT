var tailBool = false;

var explosionAnimation = function(scene, pSystem, mesh, texture_path, r, g, b, minSize, maxSize, grounds, metheoriteBool) {
    var posAbs = mesh.getAbsolutePosition();
    var pos = new BABYLON.Vector3(posAbs.x, posAbs.y, posAbs.z);

    pSystem.stop();
    if (tailBool) {
        mesh.visibility = false;
    } else {
        mesh.dispose();
    }

    var restObject = BABYLON.Mesh.CreateSphere('restObject', 3, 3, scene);
    restObject.checkCollisions = true;
    restObject.physicsImpostor = new BABYLON.PhysicsImpostor(restObject, BABYLON.PhysicsImpostor.SphereImpostor, {
        mass: 1,
        friction: 1000,
        restitution: 0
    });
    restObject.position = pos;
    restObject.visibility = false;

    var pSystem2 = new BABYLON.ParticleSystem("particles", 2000, scene);
    pSystem2.emitter = restObject;
    pSystem2.particleTexture = new BABYLON.Texture(texture_path, scene);
    pSystem2.minEmitBox = new BABYLON.Vector3(-1, 1, -1);
    pSystem2.maxEmitBox = new BABYLON.Vector3(1, 1, 1);

    pSystem2.color1 = new BABYLON.Color4(r, g, b, 1.0);
    pSystem2.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
    pSystem2.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

    pSystem2.minSize = minSize;
    pSystem2.maxSize = maxSize;

    pSystem2.minLifeTime = 0.3;
    pSystem2.maxLifeTime = 1.5;

    pSystem2.emitRate = 500;

    pSystem2.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    pSystem2.gravity = new BABYLON.Vector3(0, 0, 0);

    pSystem2.direction1 = new BABYLON.Vector3(0, 8, 0);
    pSystem2.direction2 = new BABYLON.Vector3(0, 8, 0);

    pSystem2.minAngularSpeed = 0;
    pSystem2.maxAngularSpeed = Math.PI;

    pSystem2.minEmitPower = 1;
    pSystem2.maxEmitPower = 2;
    pSystem2.updateSpeed = 0.005;

    pSystem2.start();

    setTimeout(function () {
        pSystem2.stop();
        setTimeout(function () {
            if (tailBool) {
                mesh.dispose();
            }
            if (metheoriteBool) createMetheorite(grounds, scene);
            restObject.dispose();
        }, 4000);
    }, 3000);


};