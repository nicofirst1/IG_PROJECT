var initCharacter = function (scene, camera, shadowGenerator) {

    var warrior = 0;
    BABYLON.SceneLoader.ImportMesh("", "Models/psc-warrior-babylon/", "psc-warrior.babylon", scene, function (newMeshes) {
        warrior = newMeshes[0];
        camera.target = warrior;

        warrior.scaling = new BABYLON.Vector3(3, 3, 3);
        warrior.rotation.y = Math.PI;
        warrior.position = new BABYLON.Vector3(0, -3, 0);

        // warrior.physicsImpostor = new BABYLON.PhysicsImpostor(s, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 1});

        // shadowGenerator.getShadowMap().renderList.push(warrior);

    });
};