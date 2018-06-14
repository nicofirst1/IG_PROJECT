var ground;

var initGround = function (scene, groundSize) {

    var groundBox = BABYLON.MeshBuilder.CreateBox("groundBox", {
        height: 6,
        width: groundSize,
        depth: groundSize
    }, scene);
    groundBox.checkCollisions = true;
    groundBox.physicsImpostor = new BABYLON.PhysicsImpostor(groundBox, BABYLON.PhysicsImpostor.BoxImpostor, {
        mass: 0,
        restitution: 0.1,
        friction: 10,
    }, scene);

    var lavaMaterial = new BABYLON.LavaMaterial("lava", scene);
    lavaMaterial.noiseTexture = new BABYLON.Texture("Resources/steam/steam.png", scene); // Set the bump texture
    lavaMaterial.diffuseTexture = new BABYLON.Texture("Resources/fire/fire.jpg", scene); // Set the diffuse texture
    lavaMaterial.speed = 0;
    lavaMaterial.fogColor = new BABYLON.Color3(1, 0, 0);
    groundBox.material = lavaMaterial;

    ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "Resources/map/poly_HM/Heightmap3.png", groundSize, groundSize, 64, -3, ground_max_z, scene, false, function () {

        scene.executeWhenReady(function () {
            engine.runRenderLoop(function () {
                scene.render();
            });
        });

        ground.convertToFlatShadedMesh();

        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.MeshImpostor, {
            mass: 0,
            friction: 10000,
            restitution: 0.1
        }, scene);
        ground.checkCollisions = true;

        var groundMaterial = new BABYLON.StandardMaterial("material", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("Resources/ice/ice.jpg", scene);
        groundMaterial.emissiveColor = new BABYLON.Vector3(0.878, 1.000, 1.000);
        ground.material = groundMaterial;

        var grounds = [ground, groundBox];

        for (var ii = 0; ii < meteorite_number; ii++) {
            createMeteorite(grounds, scene);
        }


    });


    return [ground, groundBox];
};

