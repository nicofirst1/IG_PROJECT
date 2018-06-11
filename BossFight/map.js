var ground_x = 500;
var ground_y = 500;
var ground_max_z = 70;// the maximum for the ground height map
var ground_min_z = 0; // the minimum for the ground height map
var sky_size = 10000.0; //the size of the skybox
var texture_scale = 8;//bigger values apply more texture on ground (becomes smaller)
var subdivisions = 124; // allows you to increase the complexity of your mesh in order to improve the visual quality of it
var ambient_fog = false;
var water_color = "#0f38da";
var snow_flag=false;

var mapInit = function (scene, light, shadow, camera) {


    //###############################
    //          SKYBOX
    //###############################
    var skybox = BABYLON.Mesh.CreateBox("skyBox", sky_size, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("Resources/map/hw_lagoon/lagoon", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.backFaceCulling = false;
    //disable light to prevent sky reflections
    skyboxMaterial.disableLighting = true;
    //This makes the skybox follow our camera's position
    skybox.infiniteDistance = true;
    skybox.material = skyboxMaterial;
    skybox.layerMask = 2; // 010 in binary
    skybox.checkCollisions = true;

    //###############################
    //          FOG
    //###############################
    if (ambient_fog) {
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
        scene.fogDensity = 0.01;
    }


    //###############################
    //          GROUND
    //###############################
    // var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    // groundMaterial.diffuseTexture = new BABYLON.Texture("Resources/map/ground_texture/rock.jpg", scene);
    // groundMaterial.diffuseTexture.uScale = texture_scale;
    // groundMaterial.diffuseTexture.vScale = texture_scale;
    // groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    // groundMaterial.roughness = 3;
    // groundMaterial.checkCollisions = true;

    //var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "Resources/map/height_map/height_map.png", ground_x,
     //   ground_y, subdivisions, ground_min_z, ground_max_z, scene, false);

    var groundBox = BABYLON.MeshBuilder.CreateBox("groundBox", {height: 4, width: ground_x, depth: ground_y}, scene);
    groundBox.checkCollisions = true;
    groundBox.physicsImpostor = new BABYLON.PhysicsImpostor(groundBox, BABYLON.PhysicsImpostor.BoxImpostor, {
        mass: 0,
        restitution: 0.1,
        friction: 10,
    }, scene);

    var createShape = function (grounds) {

        var b = BABYLON.Mesh.CreateSphere("metheorite", 3, 3, scene);
        var max = 5;
        var min = 0.1;
        var rnd = Math.random() * (max - min) + min;
        b.scaling.x = rnd;
        b.scaling.y = rnd;
        b.scaling.z = rnd;
        b.physicsImpostor = new BABYLON.PhysicsImpostor(b, BABYLON.PhysicsImpostor.SphereImpostor, { mass: rnd, friction: 0, restitution: 0 });

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

        var groundBox = grounds[1];
        b.physicsImpostor.registerOnPhysicsCollide(groundBox.physicsImpostor, function() {
            pSystem2.stop();

            var posAbs = b.getAbsolutePosition();
            var pos = new BABYLON.Vector3(posAbs.x, posAbs.y, posAbs.z);
            b.dispose();

            var bulletFireballRest = BABYLON.Mesh.CreateSphere('bulletFireballRest', 3, 1.6, scene);
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
            createShape(grounds);

        });

        var ground0 = grounds[0];
        b.physicsImpostor.registerOnPhysicsCollide(ground0.physicsImpostor, function() {
            //b.collisionsCount += 1;
            if (true) {
                pSystem2.stop();

                var posAbs = b.getAbsolutePosition();
                var pos = new BABYLON.Vector3(posAbs.x, posAbs.y, posAbs.z);
                b.dispose();

                var bulletFireballRest = BABYLON.Mesh.CreateSphere('bulletFireballRest', 3, 1.6, scene);
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

                createShape(grounds);
            }
        });
    };

    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "Resources/map/poly_HM/Heightmap.png", 500, 500, 50, 0, 25, scene, false, function () {
        ground.convertToFlatShadedMesh();

        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0, friction: 10000, restitution: 0.1 }, scene);
        ground.checkCollisions = true;

        for (var ii = 0; ii < 10; ii++) {
            createShape([ground, groundBox]);
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
                    createShape([ground, groundBox]);
                }
            })
        });
    });



    //###############################
    //          SNOW
    //###############################

    if (snow_flag) {
        snow(scene, skybox);
    }
    d
    //###############################
    //          WATER
    //###############################

    var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", ground_x, ground_y, 1, scene, false);

    var water = new BABYLON.WaterMaterial("water", scene);
    water.bumpTexture = new BABYLON.Texture("Resources/map/ground_texture/water2.png", scene);

    // Water properties
    water.windForce = 10;
    water.waveHeight = 0.5;
    water.windDirection = new BABYLON.Vector2(1, 1);
    water.waterColor = new BABYLON.Color3.FromHexString(water_color);
    water.colorBlendFactor = 0.3;
    water.bumpHeight = 0.001;
    water.waveLength = 0.01;

    // Add skybox and ground to the reflection and refraction
    water.addToRenderList(skybox);
    water.addToRenderList(ground);

    // Assign the water material
    waterMesh.material = water;

    return [ground, groundBox];
};


var snow=function (scene, skybox) {
    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("particles", 50000, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("Resources/map/flares/flare.png", scene);

    // Where the particles come from
    particleSystem.emitter = skybox; // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(-100, 0, -100); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(100, 50, 100); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(1, 1, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(1, 1, 1.0, 0.5);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 3;
    particleSystem.maxLifeTime = 15;

    // Emission rate
    particleSystem.emitRate = 5000;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, -15, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(-7, -8, 3);
    particleSystem.direction2 = new BABYLON.Vector3(7, -8, -3);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 2;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.007;

    // Start the particle system
    particleSystem.start();


}