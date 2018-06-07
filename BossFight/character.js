var initCharacter = function (scene) {

    BABYLON.SceneLoader.Append("Models/", "Full_low.obj", scene, function (scene) {
        // Create a default arc rotate camera and light.
        // scene.createDefaultCameraOrLight(true, true, true);

        // The default camera looks at the back of the asset.
        // Rotate the camera by 180 degrees to the front of the asset.
        // scene.activeCamera.alpha += Math.PI;
        

    });

    // BABYLON.SceneLoader.ImportMesh("warrior", "Models/psc-warrior-babylon/", "psc-warrior.babylon", scene, function (newMeshes) {
    //     var warrior = newMeshes[1];
    //
    //     warrior.scaling = new BABYLON.Vector3(15, 15, 15);
    //     warrior.rotation.y = Math.PI;
    //     warrior.position = new BABYLON.Vector3(0, 0, -80);
    //
    // });

};