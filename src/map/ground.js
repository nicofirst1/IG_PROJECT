var ground;

var initGround = function (scene, groundSize) {

    ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "Resources/map/newtry/worldHeightMap.jpg", groundSize, groundSize, 32, 0, 40, scene, false, function () {

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
        groundMaterial.diffuseTexture = new BABYLON.Texture("Resources/map/newtry/earth.jpg", scene);
        ground.material = groundMaterial;

        scene.registerBeforeRender(function () {
            scene.meshes.forEach(function (m) {
                if (m.name == "metheorite" && m.position.y < -400) {
                    explosionAnimation(scene, m.particleSystem, m, "Resources/map/flares/flare.png", 1.000, 0.271, 0.000, 0.5, 2, ground, true);
                }
            });
        });

        for(var i = 0; i < meteorite_number; i++) {
            createMeteorite(ground, scene);
        }

    });

    return ground;
};

