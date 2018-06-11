var initGround = function(scene, ground_x, ground_y) {

    var groundBox = BABYLON.MeshBuilder.CreateBox("groundBox", {height: 4, width: ground_x, depth: ground_y}, scene);
    groundBox.checkCollisions = true;
    groundBox.physicsImpostor = new BABYLON.PhysicsImpostor(groundBox, BABYLON.PhysicsImpostor.BoxImpostor, {
        mass: 0,
        restitution: 0.1,
        friction: 10,
    }, scene);

    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "Resources/map/poly_HM/Heightmap.png", ground_x, ground_x, 50, 0, 25, scene, false, function () {
        ground.convertToFlatShadedMesh();

        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0, friction: 10000, restitution: 0.1 }, scene);
        ground.checkCollisions = true;

        for (var ii = 0; ii < 10; ii++) {
            createShape([ground, groundBox], scene);
        }


        // scene.onPointerUp = function (evt, pickInfo) {
        //     if (pickInfo.pickedMesh.name === "s") {
        //         pickInfo.pickedMesh.applyImpulse(pickInfo.pickedMesh.position.subtract(camera.position).normalize().scale(30), pickInfo.pickedPoint)
        //     }
        // }

        scene.registerBeforeRender(function () {
            scene.meshes.forEach(function (m) {
                if (m.name=="metheorite" && m.position.y < -10) {
                    m.dispose();
                    createShape([ground, groundBox], scene);
                }
            })
        });
    });

    return [ground, groundBox];
};

var metheoriteID = 0;

var createShape = function (grounds, scene) {

    var b = BABYLON.Mesh.CreateSphere("metheorite", 3, 3, scene);
    b.subID = metheoriteID;
    metheoriteID += 1;
    if (metheoriteID > 1000) metheoriteID = 0;

    var max = 5;
    var min = 0.1;
    var rnd = Math.random() * (max - min) + min;
    b.scaling.x = rnd;
    b.scaling.y = rnd;
    b.scaling.z = rnd;
    b.physicsImpostor = new BABYLON.PhysicsImpostor(b, BABYLON.PhysicsImpostor.SphereImpostor, { mass: rnd, friction: 1000, restitution: 0 });
    b.checkCollisions = true;

    var minPos = -500;
    var maxPos = 0;
    b.position.y = 1000;
    b.position.x =  Math.random() * (maxPos - minPos) + minPos;
    b.position.z = Math.random() * (maxPos - minPos) + minPos;

    var impulseDir = new BABYLON.Vector3(rnd*40, -rnd*100, rnd*40);
    b.physicsImpostor.applyImpulse(impulseDir, b.getAbsolutePosition());

    var fireballMaterial = new BABYLON.StandardMaterial("material", scene);
    fireballMaterial.diffuseTexture = new BABYLON.Texture("Resources/fire/fire.jpg", scene);
    fireballMaterial.emissiveColor = new BABYLON.Vector3(1.0, 0.0, 0.0);
    b.material = fireballMaterial;

    var pSystem2 = new BABYLON.ParticleSystem("particles", 2000, scene);
    pSystem2.emitter = b;
    pSystem2.particleTexture = new BABYLON.Texture("Resources/map/flares/flare.png", scene);
    pSystem2.minEmitBox = new BABYLON.Vector3(-1, 1, -1);
    pSystem2.maxEmitBox = new BABYLON.Vector3(1, 1, 1);

    pSystem2.color1 = new BABYLON.Color4(1.000, 0.271, 0.000, 1.0);
    pSystem2.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
    pSystem2.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

    pSystem2.minSize = rnd * 3;
    pSystem2.maxSize = rnd * 6;

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

    b.onCollide = function(collidedMesh) {
        window.alert(collidedMesh.id);
        pSystem2.stop();

        var posAbs = b.getAbsolutePosition();
        var pos = new BABYLON.Vector3(posAbs.x, posAbs.y, posAbs.z);
        b.dispose();

        var bulletFireballRest = BABYLON.Mesh.CreateSphere('bulletFireballRest', 3, 3, scene);
        bulletFireballRest.checkCollisions = true;
        bulletFireballRest.physicsImpostor = new BABYLON.PhysicsImpostor(bulletFireballRest, BABYLON.PhysicsImpostor.SphereImpostor, {
            mass: 0,
            friction: 1000,
            restitution: 0
        });
        bulletFireballRest.position = pos;
        bulletFireballRest.visibility = false;

        var pSystem3 = new BABYLON.ParticleSystem("particles", 2000, scene);
        pSystem3.emitter = bulletFireballRest;
        pSystem3.particleTexture = new BABYLON.Texture("Resources/map/flares/flare.png", scene);
        pSystem3.minEmitBox = new BABYLON.Vector3(-1, 1, -1); // Starting all from
        pSystem3.maxEmitBox = new BABYLON.Vector3(1, 1, 1); // To...

        pSystem3.color1 = new BABYLON.Color4(1.000, 0.271, 0.000, 1.0);
        pSystem3.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
        pSystem3.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

        pSystem3.minSize = rnd * 6;
        pSystem3.maxSize = rnd * 12;

        pSystem3.minLifeTime = 0.3;
        pSystem3.maxLifeTime = 1.5;

        pSystem3.emitRate = 500;

        pSystem3.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        pSystem3.gravity = new BABYLON.Vector3(0, 0, 0);

        pSystem3.direction1 = new BABYLON.Vector3(0, 8, 0);
        pSystem3.direction2 = new BABYLON.Vector3(0, 8, 0);

        pSystem3.minAngularSpeed = 0;
        pSystem3.maxAngularSpeed = Math.PI;

        pSystem3.minEmitPower = 1;
        pSystem3.maxEmitPower = 2;
        pSystem3.updateSpeed = 0.005;

        pSystem3.start();

        collidedMesh.psystem.stop();

        var posAbs = collidedMesh.getAbsolutePosition();
        var pos = new BABYLON.Vector3(posAbs.x, posAbs.y, posAbs.z);
        collidedMesh.dispose();

        var bulletFireballRest2 = BABYLON.Mesh.CreateSphere('bulletFireballRest', 3, 3, scene);
        bulletFireballRest2.checkCollisions = true;
        bulletFireballRest2.physicsImpostor = new BABYLON.PhysicsImpostor(bulletFireballRest2, BABYLON.PhysicsImpostor.SphereImpostor, {
            mass: 0,
            friction: 1000,
            restitution: 0
        });
        bulletFireballRest2.position = pos;
        bulletFireballRest2.visibility = false;

        var pSystem4 = new BABYLON.ParticleSystem("particles", 2000, scene);
        pSystem4.emitter = bulletFireballRest2;
        pSystem4.particleTexture = new BABYLON.Texture("Resources/map/flares/flare.png", scene);
        pSystem4.minEmitBox = new BABYLON.Vector3(-1, 1, -1); // Starting all from
        pSystem4.maxEmitBox = new BABYLON.Vector3(1, 1, 1); // To...

        pSystem4.color1 = new BABYLON.Color4(1.000, 0.271, 0.000, 1.0);
        pSystem4.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
        pSystem4.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

        pSystem4.minSize = rnd * 6;
        pSystem4.maxSize = rnd * 12;

        pSystem4.minLifeTime = 0.3;
        pSystem4.maxLifeTime = 1.5;

        pSystem4.emitRate = 500;

        pSystem4.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        pSystem4.gravity = new BABYLON.Vector3(0, 0, 0);

        pSystem4.direction1 = new BABYLON.Vector3(0, 8, 0);
        pSystem4.direction2 = new BABYLON.Vector3(0, 8, 0);

        pSystem4.minAngularSpeed = 0;
        pSystem4.maxAngularSpeed = Math.PI;

        pSystem4.minEmitPower = 1;
        pSystem4.maxEmitPower = 2;
        pSystem4.updateSpeed = 0.005;

        pSystem4.start();

        setTimeout(function () {
            pSystem3.stop();
            pSystem4.stop();
            setTimeout(function () {
                bulletFireballRest.dispose();
                bulletFireballRest2.dispose();
            }, 4000);
        }, 3000);

        createShape(grounds, scene);
    };

    var groundBox = grounds[1];
    b.physicsImpostor.registerOnPhysicsCollide(groundBox.physicsImpostor, function() {
        pSystem2.stop();

        var posAbs = b.getAbsolutePosition();
        var pos = new BABYLON.Vector3(posAbs.x, posAbs.y, posAbs.z);
        b.dispose();

        var bulletFireballRest = BABYLON.Mesh.CreateSphere('bulletFireballRestWater', 3, 3, scene);
        bulletFireballRest.checkCollisions = true;
        bulletFireballRest.physicsImpostor = new BABYLON.PhysicsImpostor(bulletFireballRest, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, friction: 1000, restitution: 0 });
        bulletFireballRest.position = pos;
        bulletFireballRest.visibility = false;

        var pSystem3 = new BABYLON.ParticleSystem("particles", 2000, scene);
        pSystem3.emitter = bulletFireballRest;
        pSystem3.particleTexture = new BABYLON.Texture("Resources/map/flares/flare.png", scene);
        pSystem3.minEmitBox = new BABYLON.Vector3(-1, 1, -1); // Starting all from
        pSystem3.maxEmitBox = new BABYLON.Vector3(1, 1, 1); // To...

        pSystem3.color1 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
        pSystem3.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
        pSystem3.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

        pSystem3.minSize = rnd * 6;
        pSystem3.maxSize = rnd * 12;

        pSystem3.minLifeTime = 0.3;
        pSystem3.maxLifeTime = 1.5;

        pSystem3.emitRate = 500;

        pSystem3.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        pSystem3.gravity = new BABYLON.Vector3(0, 0, 0);

        pSystem3.direction1 = new BABYLON.Vector3(0, 8, 0);
        pSystem3.direction2 = new BABYLON.Vector3(0, 8, 0);

        pSystem3.minAngularSpeed = 0;
        pSystem3.maxAngularSpeed = Math.PI;

        pSystem3.minEmitPower = 1;
        pSystem3.maxEmitPower = 2;
        pSystem3.updateSpeed = 0.005;

        pSystem3.start();

        setTimeout(function () {
            pSystem3.stop();
            setTimeout(function () {
                bulletFireballRest.dispose();
            }, 4000);
        }, 3000);
        createShape(grounds, scene);

    });

    var ground0 = grounds[0];
    b.physicsImpostor.registerOnPhysicsCollide(ground0.physicsImpostor, function() {
        //b.collisionsCount += 1;
        if (true) {
            pSystem2.stop();

            var posAbs = b.getAbsolutePosition();
            var pos = new BABYLON.Vector3(posAbs.x, posAbs.y, posAbs.z);
            b.dispose();

            var bulletFireballRest = BABYLON.Mesh.CreateSphere('bulletFireballRest', 3, 3, scene);
            bulletFireballRest.checkCollisions = true;
            bulletFireballRest.physicsImpostor = new BABYLON.PhysicsImpostor(bulletFireballRest, BABYLON.PhysicsImpostor.SphereImpostor, {
                mass: 1,
                friction: 1000,
                restitution: 0
            });
            bulletFireballRest.position = pos;
            bulletFireballRest.visibility = false;

            var pSystem3 = new BABYLON.ParticleSystem("particles", 2000, scene);
            pSystem3.emitter = bulletFireballRest;
            pSystem3.particleTexture = new BABYLON.Texture("Resources/map/flares/flare.png", scene);
            pSystem3.minEmitBox = new BABYLON.Vector3(-1, 1, -1); // Starting all from
            pSystem3.maxEmitBox = new BABYLON.Vector3(1, 1, 1); // To...

            pSystem3.color1 = new BABYLON.Color4(1.000, 0.271, 0.000, 1.0);
            pSystem3.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
            pSystem3.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

            pSystem3.minSize = rnd * 6;
            pSystem3.maxSize = rnd * 12;

            pSystem3.minLifeTime = 0.3;
            pSystem3.maxLifeTime = 1.5;

            pSystem3.emitRate = 500;

            pSystem3.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

            pSystem3.gravity = new BABYLON.Vector3(0, 0, 0);

            pSystem3.direction1 = new BABYLON.Vector3(0, 8, 0);
            pSystem3.direction2 = new BABYLON.Vector3(0, 8, 0);

            pSystem3.minAngularSpeed = 0;
            pSystem3.maxAngularSpeed = Math.PI;

            pSystem3.minEmitPower = 1;
            pSystem3.maxEmitPower = 2;
            pSystem3.updateSpeed = 0.005;

            pSystem3.start();

            setTimeout(function () {
                pSystem3.stop();
                setTimeout(function () {
                    bulletFireballRest.dispose();
                }, 4000);
            }, 3000);

            createShape(grounds, scene);
        }
    });


};