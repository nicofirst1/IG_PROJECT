var initWeapon = function (scene, camera) {
    scene.getMeshByName('blaster').position = new BABYLON.Vector3(0.05, -0.1, 0.4);
    scene.getMeshByName('blaster').parent = scene.activeCamera;
};