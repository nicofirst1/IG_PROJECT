var ground;
var groundBox;

var initGround = function (scene, groundSize) {

    groundBox = BABYLON.MeshBuilder.CreateBox("groundBox", {
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
    lavaMaterial.noiseTexture = new BABYLON.Texture("../Resources/steam/steam.png", scene); // Set the bump texture
    lavaMaterial.diffuseTexture = new BABYLON.Texture("../Resources/fire/fire.jpg", scene); // Set the diffuse texture
    lavaMaterial.speed = 0;
    lavaMaterial.fogColor = new BABYLON.Color3(1, 0, 0);
    groundBox.material = lavaMaterial;

    ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "../Resources/map/newtry/4.jpg", groundSize, groundSize, 128, 0, ground_max_z, scene, false, function () {

        scene.executeWhenReady(function () {
            engine.runRenderLoop(function () {
                scene.render();
            });
        });

        ground.convertToFlatShadedMesh();

        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.MeshImpostor, {
            mass: 0,
        }, scene);
        ground.checkCollisions = true;

        var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("../Resources/ice/ice.jpg", scene);
        ground.material = groundMaterial;

        scene.registerBeforeRender(function () {
            scene.meshes.forEach(function (m) {
                if (m.name == "metheorite" && m.position.y < -400) {
                    explosion(scene, m.particleSystem, m, "../Resources/map/flares/flare.png", 1.000, 0.271, 0.000, 0.5, 2, ground, true);
                }
            });
        });

        for(var i = 0; i < meteorite_number; i++) {
            createMeteorite(ground, scene);
        }

    });

    return ground;
};

