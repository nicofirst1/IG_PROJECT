var initShield = function (scene, camera) {

    var shieldTexture = new BABYLON.StandardMaterial("material", scene);
    shieldTexture.diffuseTexture = new BABYLON.Texture("../Resources/fire/fire.jpg", scene);
    shieldTexture.emissiveColor = new BABYLON.Vector3(1.0, 0.0, 0.0);

    shieldTexture.alpha = 1;


    var shield = BABYLON.Mesh.CreateBox("box", 10.0, scene);

    shield.rotation.y = 0;
    shield.scaling.z = 0.1;
    shield.scaling.y = 2;
    shield.scaling.x = 2;


    shield.position = new BABYLON.Vector3(0, 0, 50);
    shield.parent = camera;

    shield.material = shieldTexture;

    shield.physicsImpostor = new BABYLON.PhysicsImpostor(shield, BABYLON.PhysicsImpostor.BoxImpostor, {
        mass: 0,
        friction: 0,
        restitution: 0.1
    }, scene);

    shield.checkCollisions = true;


};