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

        var grounds = [ground, groundBox];

        var metheorite_num = 10;

        for (var ii = 0; ii < metheorite_num; ii++) {
            createMetheorite(grounds, scene);
        }

        // If metheorite 20 below the ground it starts again from the sky
        scene.registerBeforeRender(function () {
            scene.meshes.forEach(function (m) {
                if (m.name=="metheorite" && m.position.y < -20) {
                    m.dispose();
                    createMetheorite(grounds, scene);
                }
            })
        });
    });



    return [ground, groundBox];
};

