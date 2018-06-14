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
    lavaMaterial.speed = 0.1;
    lavaMaterial.fogColor = new BABYLON.Color3(1, 0, 0);
    groundBox.material = lavaMaterial;

    ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "Resources/map/poly_HM/Heightmap.png", groundSize, groundSize, 64, 0, ground_max_z, scene, false, function () {

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

        var groundMateial = new BABYLON.StandardMaterial("material", scene);
        groundMateial.uScale = 2;
        groundMateial.vScale = 2;
        groundMateial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        //groundMateial.diffuseTexture = new BABYLON.Texture("Resources/green/green.jpg", scene);
        ground.material = groundMateial;

        var grounds = [ground, groundBox];

        for (var ii = 0; ii < meteorite_number; ii++) {
            createMeteorite(grounds, scene);
        }


    });


    return [ground, groundBox];
};

