var tailBool = true;

var explosion = function (scene, pSystem, mesh, texture_path, r, g, b, minSize, maxSize, grounds, meteoriteBool, visible) {
    pSystem.stop();

    var posAbs = mesh.getAbsolutePosition();
    var pos = new BABYLON.Vector3(posAbs.x, posAbs.y, posAbs.z);

    var name = (r > 0.5) ? 'restObject' : 'restObjectWater';
    var restObject;
    if (meteoriteBool) restObject = BABYLON.Mesh.CreateSphere(name, 12, 3, scene);
    else restObject = BABYLON.Mesh.CreateSphere(name, 12, 0.1, scene);

    //water.addToRenderList(restObject);

    var fireballMaterial = new BABYLON.StandardMaterial("material", scene);
    fireballMaterial.diffuseTexture = new BABYLON.Texture("Resources/magma/magma.jpg", scene);
    fireballMaterial.emissiveColor = new BABYLON.Vector3(1.0, 0.0, 0.0);
    restObject.material = fireballMaterial;

    restObject.scaling.x = mesh.scaling.x;
    restObject.scaling.y = mesh.scaling.y;
    restObject.scaling.z = mesh.scaling.z;

    restObject.checkCollisions = true;
    restObject.physicsImpostor = new BABYLON.PhysicsImpostor(restObject, BABYLON.PhysicsImpostor.SphereImpostor, {
        mass: 0,
        friction: 1000,
        restitution: 100
    });
    restObject.position = pos;
    if (!visible) restObject.visibility = false;

    if (tailBool) {
        pSystem.emitter = restObject;
    }

    mesh.dispose();

    var pSystem2 = new BABYLON.ParticleSystem("particles", 2000, scene);
    pSystem2.emitter = restObject;
    pSystem2.particleTexture = new BABYLON.Texture(texture_path, scene);


    pSystem2.color1 = new BABYLON.Color4(r, g, b, 1.0);
    pSystem2.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
    pSystem2.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

    if (meteoriteBool) {
        pSystem2.minSize = minSize / 3;
        pSystem2.maxSize = maxSize / 3;
        pSystem2.minEmitBox = new BABYLON.Vector3(-1, 1, -1);
        pSystem2.maxEmitBox = new BABYLON.Vector3(1, 1, 1);

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
    } else {
        pSystem2.minSize = minSize * 7;
        pSystem2.maxSize = maxSize * 7;
        pSystem2.minEmitBox = new BABYLON.Vector3(0, 0, 0);
        pSystem2.maxEmitBox = new BABYLON.Vector3(0, .2, 0);

        pSystem2.minLifeTime = 0.075;
        pSystem2.maxLifeTime = 0.1;

        pSystem2.emitRate = 400;

        pSystem2.gravity = new BABYLON.Vector3(0, 0, 0);

        pSystem2.direction1 = new BABYLON.Vector3(0, 8, 0);
        pSystem2.direction2 = new BABYLON.Vector3(0, 8, 0);

        pSystem2.minAngularSpeed = 0;
        pSystem2.maxAngularSpeed = Math.PI;
        pSystem2.minEmitPower = 1;
        pSystem2.maxEmitPower = 2;
        pSystem2.updateSpeed = 0.005;
    }

    pSystem2.start();

    setTimeout(function () {
        pSystem2.stop();
        setTimeout(function () {
            restObject.dispose();
            if (meteoriteBool) {
                if (score_value % 10 && max_dim < 5) {
                    min_dim += 0.5;
                    max_dim += 0.5;
                    meteoriteProb += 0.05 / (score_value % 10);

                }
                createMeteorite(grounds, scene);
                if (Math.random() >= meteoriteProb && meteorite_number < max_meteorites) {
                    meteorite_number += 1;
                    createMeteorite(grounds, scene);

                }
            }
        }, 4000);
    }, 3000);

};