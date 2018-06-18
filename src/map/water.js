var water_hight = 0.1;
var water;

var initWater = function (scene, skybox, grounds) {


    var waterMesh = BABYLON.Mesh.CreateGround("waterMesh", groundSize, groundSize, 1, scene, true);

    water = new BABYLON.WaterMaterial("water", scene);
    water.bumpTexture = new BABYLON.Texture("../Resources/map/ground_texture/poly_water.jpg", scene);

    // Water properties
    water.windForce = 10;
    water.waveHeight = 0.5;
    water.windDirection = new BABYLON.Vector2(1, 1);
    water.colorBlendFactor = 0.3;
    water.bumpHeight = water_hight;
    water.waveLength = 0.1;

    var ground = grounds[0];


    // Assign the water material
    waterMesh.material = water;
    // Add skybox and ground to the reflection and refraction


    water.addToRenderList(skybox);
    water.addToRenderList(ground);

}