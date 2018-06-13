var initGround = function(scene, groundSize, camera) {

    var groundBox = BABYLON.MeshBuilder.CreateBox("groundBox", {height: 4, width: groundSize, depth: groundSize}, scene);
    groundBox.checkCollisions = true;
    groundBox.physicsImpostor = new BABYLON.PhysicsImpostor(groundBox, BABYLON.PhysicsImpostor.BoxImpostor, {
        mass: 0,
        restitution: 0.1,
        friction: 10,
    }, scene);

    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "Resources/map/poly_HM/Heightmap.png", groundSize, groundSize, subdivisions, 0, ground_max_z, scene, false, function () {
        ground.convertToFlatShadedMesh();

        ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0, friction: 10000, restitution: 0.1 }, scene);
        ground.checkCollisions = true;

        var grounds = [ground, groundBox];


        for (var ii = 0; ii < meteorite_number; ii++) {
            createMeteorite(grounds, scene);
        }


    });



    return [ground, groundBox];
};

