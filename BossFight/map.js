var ground_x = 500;
var ground_y = 500;
var ground_max_z = 70;// the maximum for the ground height map
var ground_min_z = 0; // the minimum for the ground height map
var sky_size = 10000.0; //the size of the skybox
var texture_scale = 200;//bigger values apply more texture on ground (becomes smaller)
var subdivisions = 200; // allows you to increase the complexity of your mesh in order to improve the visual quality of it
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
    groundMaterial.diffuseTexture = new BABYLON.Texture("Resources/map/ground_texture/gravel.jpg", scene);
    groundMaterial.diffuseTexture.uScale = texture_scale;
    groundMaterial.diffuseTexture.vScale = texture_scale;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    groundMaterial.roughness = 3;



    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "Resources/map/height_map/height_map.png", ground_x,
        ground_y, subdivisions, ground_min_z, ground_max_z, scene, false);

    //var ground = BABYLON.Mesh.CreateGround("ground1", 500, 500, 2, scene);
    ground.position.y = 0.0;
    ground.receiveShadows = true;
    ground.checkCollisions = true;
    ground.material = groundMaterial;
    ground.isBlocker=true;

    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, {
        mass: 0,
        restitution: 0,
        friction: 10,
    }, scene);




    //###############################
    //          WATER
    //###############################

    // var water = BABYLON.Mesh.CreateGround("water", ground_x, ground_y, 1, scene, false);
    // var waterMaterial = new WaterMaterial("water", scene, light);
    // waterMaterial.refractionTexture.renderList.push(ground);
    //
    // waterMaterial.reflectionTexture.renderList.push(ground);
    // waterMaterial.reflectionTexture.renderList.push(skybox);
    //
    // water.material = waterMaterial;


    // Water
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


};