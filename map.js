var map_init = function (scene) {

    if (BABYLON.Engine.isSupported()) {
        var sun = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(60, 100, 10), scene);

        var extraGround = BABYLON.Mesh.CreateGround("extraGround", 1000, 1000, 1, scene, false);
        var extraGroundMaterial = new BABYLON.StandardMaterial("extraGround", scene);
        extraGroundMaterial.diffuseTexture = new BABYLON.Texture("ground.jpg", scene);
        extraGroundMaterial.diffuseTexture.uScale = 60;
        extraGroundMaterial.diffuseTexture.vScale = 60;
        extraGround.position.y = -2.05;
        extraGround.material = extraGroundMaterial;

    }
};