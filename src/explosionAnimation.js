var tailBool = true;

var explosionAnimation = function(scene, pSystem, mesh, texture_path, r, g, b, minSize, maxSize, grounds, meteoriteBool) {
    pSystem.stop();

    var posAbs = mesh.getAbsolutePosition();
    var pos = new BABYLON.Vector3(posAbs.x, posAbs.y, posAbs.z);

    var name = (r > 0.5) ? 'restObject' : 'restObjectWater';
    var restObject = BABYLON.Mesh.CreateSphere(name, 12, 3, scene);

    var fireballMaterial = new BABYLON.StandardMaterial("material", scene);
    fireballMaterial.diffuseTexture = new BABYLON.Texture("Resources/magma/magma.jpg", scene);
    fireballMaterial.emissiveColor = new BABYLON.Vector3(1.0, 0.0, 0.0);
    restObject.material = fireballMaterial;

    if (meteoriteBool) {
        restObject.scaling.x = mesh.scaling.x ;
        restObject.scaling.y = mesh.scaling.y ;
        restObject.scaling.z = mesh.scaling.z ;
    } else {
        restObject.scaling.x = mesh.scaling.x / 30;
        restObject.scaling.y = mesh.scaling.y / 30;
        restObject.scaling.z = mesh.scaling.z / 30;
    }

    restObject.checkCollisions = true;
    restObject.physicsImpostor = new BABYLON.PhysicsImpostor(restObject, BABYLON.PhysicsImpostor.SphereImpostor, {
        mass: 0,
        friction: 1000,
        restitution: 100
    });
    restObject.position = pos;
    //restObject.visibility = false;

    if (tailBool) {
        pSystem.emitter = restObject;
    }

    mesh.dispose();

    var pSystem2 = new BABYLON.ParticleSystem("particles", 2000, scene);
    pSystem2.emitter = restObject;
    pSystem2.particleTexture = new BABYLON.Texture(texture_path, scene);
    pSystem2.minEmitBox = new BABYLON.Vector3(-1, 1, -1);
    pSystem2.maxEmitBox = new BABYLON.Vector3(1, 1, 1);

    pSystem2.color1 = new BABYLON.Color4(r, g, b, 1.0);
    pSystem2.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
    pSystem2.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

    if (meteoriteBool) {
        pSystem2.minSize = minSize / 3;
        pSystem2.maxSize = maxSize / 3;
    } else {
        pSystem2.minSize = minSize;
        pSystem2.maxSize = maxSize;
    }

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
            restObject.dispose();
            if (meteoriteBool) {
                if (score_value % 10 && max_dim < 15) {
                    min_dim += 0.5;
                    max_dim += 0.5;
                }
                createMeteorite(grounds, scene);
            }
        }, 4000);
    }, 3000);

};