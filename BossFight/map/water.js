var initWater = function(scene, water_color, skybox, grounds) {
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

    var ground = grounds[0];
    // Add skybox and ground to the reflection and refraction
    water.addToRenderList(skybox);
    water.addToRenderList(ground);

    // Assign the water material
    waterMesh.material = water;
}