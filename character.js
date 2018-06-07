var delayCreateScene = function () {
    // Create a scene.
    var scene = new BABYLON.Scene(engine);

    // Create a default skybox with an environment.
    var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
    var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);

    // Append glTF model to scene.
    BABYLON.SceneLoader.Append("scenes/BoomBox/", "BoomBox.gltf", scene, function (scene) {
        // Create a default arc rotate camera and light.
        scene.createDefaultCameraOrLight(true, true, true);

        // The default camera looks at the back of the asset.
        // Rotate the camera by 180 degrees to the front of the asset.
        scene.activeCamera.alpha += Math.PI;
    });

    return scene;
};