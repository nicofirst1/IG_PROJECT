var initCharacter = function (scene, camera, shadowGenerator) {

    // UPPER RIGHT
    var upperArmRight = BABYLON.Mesh.CreateBox("arm", 1, scene);
    upperArmRight.scaling.x = 0.3;
    upperArmRight.scaling.y = 0.3;
    upperArmRight.scaling.z = 0.5;

    var upperArmRightMaterial = new BABYLON.StandardMaterial("material", scene);
    upperArmRightMaterial.emissiveColor = new BABYLON.Color3(1.000, 0.753, 0.796);
    upperArmRight.material = upperArmRightMaterial;

    upperArmRight.position = new BABYLON.Vector3(1.1, -0.5, 1.2);
    upperArmRight.rotation.y = -0.2;
    upperArmRight.parent = camera;

    // LOWER RIGHT
    var lowerArmRight = BABYLON.Mesh.CreateBox("arm", 2, scene);
    lowerArmRight.scaling.x = 0.5;
    lowerArmRight.scaling.y = 0.5;
    lowerArmRight.scaling.z = 0.5;

    var lowerArmRightMaterial = new BABYLON.StandardMaterial("material", scene);
    lowerArmRightMaterial.emissiveColor = new BABYLON.Color3(1.000, 0.753, 0.796);
    lowerArmRight.material = lowerArmRightMaterial;

    lowerArmRight.position.y = upperArmRight.position.y + 0.45;
    lowerArmRight.position.z = upperArmRight.position.z - 0.4;

    lowerArmRight.rotation.y = -0.2;
    lowerArmRight.parent = upperArmRight;

    // UPPER LEFT
    var upperArmLeft = BABYLON.Mesh.CreateBox("arm", 1, scene);
    upperArmLeft.scaling.x = 0.3;
    upperArmLeft.scaling.y = 0.3;
    upperArmLeft.scaling.z = 0.5;

    var upperArmLeftMaterial = new BABYLON.StandardMaterial("material", scene);
    upperArmLeftMaterial.emissiveColor = new BABYLON.Color3(1.000, 0.753, 0.796);
    upperArmLeft.material = upperArmLeftMaterial;

    upperArmLeft.position = new BABYLON.Vector3(-1.1, -0.5, 1.2);
    upperArmLeft.rotation.y = 0.2;
    upperArmLeft.parent = camera;

    // LOWER LEFT
    var lowerArmLeft = BABYLON.Mesh.CreateBox("arm", 2, scene);
    lowerArmLeft.scaling.x = 0.5;
    lowerArmLeft.scaling.y = 0.5;
    lowerArmLeft.scaling.z = 0.5;

    var lowerArmLeftMaterial = new BABYLON.StandardMaterial("material", scene);
    lowerArmLeftMaterial.emissiveColor = new BABYLON.Color3(1.000, 0.753, 0.796);
    lowerArmLeft.material = lowerArmLeftMaterial;

    lowerArmLeft.position.y = upperArmLeft.position.y + 0.45;
    lowerArmLeft.position.z = upperArmLeft.position.z - 0.4;

    lowerArmLeft.rotation.y = 0.2;
    lowerArmLeft.parent = upperArmLeft;

    upperArmLeft.checkCollisions = true;
    upperArmRight.checkCollisions = true;
    lowerArmLeft.checkCollisions = true;
    lowerArmRight.checkCollisions = true;


};