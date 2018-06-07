var initCharacter = function (scene, shadowGenerator) {

    BABYLON.SceneLoader.ImportMesh("", "Models/psc-warrior-babylon/", "psc-warrior.babylon", scene, function (newMeshes) {
        var warrior = newMeshes[0];

        warrior.scaling = new BABYLON.Vector3(3, 3, 3);
        warrior.rotation.y = Math.PI;
        warrior.position = new BABYLON.Vector3(0, -3, 0);

        shadowGenerator.getShadowMap().renderList.push(warrior);

    });

};