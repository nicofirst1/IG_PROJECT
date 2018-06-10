var ground_x = 500;
var ground_y = 500;
var ground_max_z = 70;// the maximum for the ground height map
var ground_min_z = 0; // the minimum for the ground height map
var sky_size = 10000.0; //the size of the skybox
var texture_scale = 8;//bigger values apply more texture on ground (becomes smaller)
var subdivisions = 124; // allows you to increase the complexity of your mesh in order to improve the visual quality of it
var ambient_fog = false;
var water_color = "#0f38da";

var mapInit = function (scene, light, shadow) {


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
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("Resources/map/ground_texture/rock.jpg", scene);
    groundMaterial.diffuseTexture.uScale = texture_scale;
    groundMaterial.diffuseTexture.vScale = texture_scale;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    groundMaterial.roughness = 3;
    groundMaterial.checkCollisions = true;

    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "Resources/map/height_map/height_map.png", ground_x,
        ground_y, subdivisions, ground_min_z, ground_max_z, scene, false);

    // var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "Resources/map/height_map/height_map.png", ground_x,
    //     ground_y, subdivisions, ground_min_z, ground_max_z, scene, false, function () {
    //         var exponentialPath = function (p) {
    //             var path = [];
    //             for (var i = -50; i <= 50; i++) {
    //                 path.push(new BABYLON.Vector3(p - 50, (Math.sin(p / 3) * 10 * Math.exp((i - p) / 100) + i / 3), i));
    //             }
    //             return path;
    //         };
    //         // let's populate arrayOfPaths with all these different paths
    //         var arrayOfPaths = [];
    //         for (var p = 0; p <= 100; p++) {
    //             arrayOfPaths[p] = exponentialPath(p);
    //         }
    //
    //         ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.HeightmapImpostor, {mass: 0});
    //
    //     });

    ground.material = groundMaterial;
    ground.checkCollisions = true;
    // ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, {
    //     mass: 0,
    //     restitution: 0.1,
    //     friction: 10,
    // }, scene);

    var groundBox = BABYLON.MeshBuilder.CreateBox("groundBox", {height: 0, width: ground_x, depth: ground_y}, scene);
    groundBox.checkCollisions = true;
    groundBox.physicsImpostor = new BABYLON.PhysicsImpostor(groundBox, BABYLON.PhysicsImpostor.BoxImpostor, {
        mass: 0,
        restitution: 0.1,
        friction: 10,
    }, scene);

    //###############################
    //          SNOW
    //###############################
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
    water.bumpHeight = 0.1;
    water.waveLength = 0.01;

    // Add skybox and ground to the reflection and refraction
    water.addToRenderList(skybox);
    water.addToRenderList(ground);

    // Assign the water material
    waterMesh.material = water;

    return [ground, groundBox];
};