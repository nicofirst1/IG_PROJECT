var initCharacter = function (scene, camera, shadowGenerator) {

    var warrior = 0;
    BABYLON.SceneLoader.ImportMesh("", "Models/knight/", "knight.babylon", scene, function (newMeshes) {
        warrior = newMeshes[0];
        camera.target = warrior;

        warrior.scaling = new BABYLON.Vector3(3, 3, 3);
        warrior.rotation.y = Math.PI;
        warrior.position = new BABYLON.Vector3(0, 30, 0);

        // shadowGenerator.getShadowMap().renderList.push(warrior);

    });
};