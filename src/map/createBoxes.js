var boxID = 0;
var max_dim_box = 3;
var min_dim_box = 0.5;
var box_number = 10;

var createBoxes = function (scene) {

    var box = BABYLON.Mesh.CreateBox("box", {height: 10, width: 10, depth: 10}, scene);
    //water.addToRenderList(b);
    box.subID = boxID;
    boxID += 1;
    if (boxID > 1000) boxID = 0;

    var max = max_dim_box;
    var min = min_dim_box;
    var rnd1 = Math.random(seed++) * (max - min) + min;
    var rnd2 = Math.random(seed++) * (max - min) + min;
    var rnd3 = Math.random(seed++) * (max - min) + min;

    box.scaling.x = rnd1;
    box.scaling.y = rnd2;
    box.scaling.z = rnd3;

    var minPos = -groundSize / 2;
    var maxPos = groundSize / 2;
    box.position.y = 500;
    box.position.x = Math.random(seed++) * (maxPos - minPos) + minPos;
    box.position.z = Math.random(seed++) * (maxPos - minPos) + minPos;

    box.applyGravity = true;
    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {
        mass: rnd1 * 1000,
        friction: 1000,
        restitution: 0
    });
    box.checkCollisions = true;

    var fireballMaterial = new BABYLON.StandardMaterial("material", scene);
    fireballMaterial.diffuseTexture = new BABYLON.Texture("Resources/green/green.jpg", scene);
    fireballMaterial.emissiveColor = new BABYLON.Vector3(1.0, 0.0, 0.0);
    box.material = fireballMaterial;


    //var fireballMaterial = new BABYLON.StandardMaterial("material", scene);
    //fireballMaterial.diffuseTexture = new BABYLON.Texture("Resources/fire/fire.jpg", scene);
    //fireballMaterial.emissiveColor = new BABYLON.Vector3(1.0, 0.0, 0.0);
   // box.material = fireballMaterial;

    ground111.push(box);
};