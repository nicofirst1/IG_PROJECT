var initCharacter = function (scene) {

    BABYLON.SceneLoader.Append("Models/", "Full_low.obj", scene, function (scene) {
        // Create a default arc rotate camera and light.
        // scene.createDefaultCameraOrLight(true, true, true);

        // The default camera looks at the back of the asset.
        // Rotate the camera by 180 degrees to the front of the asset.
        // scene.activeCamera.alpha += Math.PI;
        

    });

    return scene;
};