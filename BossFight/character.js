var upperArmRight;
var lowerArmRight;
var upperArmLeft;
var lowerArmLeft;


var initCharacter = function (scene, camera, shadowGenerator) {

    // UPPER RIGHT
    upperArmRight = BABYLON.Mesh.CreateBox("arm", 1, scene);
    upperArmRight.scaling.x = 0.3;
    upperArmRight.scaling.y = 0.3;
    upperArmRight.scaling.z = 0.5;

    var upperArmRightMaterial = new BABYLON.StandardMaterial("material", scene);
    upperArmRightMaterial.diffuseTexture = new BABYLON.Texture("Resources/armor/armor.jpg", scene);
    upperArmRight.material = upperArmRightMaterial;

    upperArmRight.position = new BABYLON.Vector3(1.1, -0.5, 1.2);
    upperArmRight.parent = camera;

    // LOWER RIGHT
    lowerArmRight = BABYLON.Mesh.CreateBox("arm", 2, scene);
    lowerArmRight.scaling.x = 0.5;
    lowerArmRight.scaling.y = 0.5;
    lowerArmRight.scaling.z = 0.5;

    var lowerArmRightMaterial = new BABYLON.StandardMaterial("material", scene);
    lowerArmRightMaterial.diffuseTexture = new BABYLON.Texture("Resources/armor/armor.jpg", scene);
    lowerArmRight.material = lowerArmRightMaterial;

    lowerArmRight.position.y = upperArmRight.position.y + 0.45;
    lowerArmRight.position.z = upperArmRight.position.z ;

    lowerArmRight.parent = upperArmRight;

    // UPPER LEFT
    upperArmLeft = BABYLON.Mesh.CreateBox("arm", 1, scene);
    upperArmLeft.scaling.x = 0.3;
    upperArmLeft.scaling.y = 0.3;
    upperArmLeft.scaling.z = 0.5;

    var upperArmLeftMaterial = new BABYLON.StandardMaterial("material", scene);
    upperArmLeftMaterial.diffuseTexture = new BABYLON.Texture("Resources/armor/armor.jpg", scene);
    upperArmLeft.material = upperArmLeftMaterial;

    upperArmLeft.position = new BABYLON.Vector3(-1.1, -0.5, 1.2);
    upperArmLeft.parent = camera;

    // LOWER LEFT
    lowerArmLeft = BABYLON.Mesh.CreateBox("arm", 2, scene);
    lowerArmLeft.scaling.x = 0.5;
    lowerArmLeft.scaling.y = 0.5;
    lowerArmLeft.scaling.z = 0.5;

    var lowerArmLeftMaterial = new BABYLON.StandardMaterial("material", scene);
    lowerArmLeftMaterial.diffuseTexture = new BABYLON.Texture("Resources/armor/armor.jpg", scene);
    lowerArmLeft.material = lowerArmLeftMaterial;

    lowerArmLeft.position.y = upperArmLeft.position.y + 0.45;
    lowerArmLeft.position.z = upperArmLeft.position.z;

    lowerArmLeft.parent = upperArmLeft;

    upperArmLeft.checkCollisions = true;
    upperArmRight.checkCollisions = true;
    lowerArmLeft.checkCollisions = true;
    lowerArmRight.checkCollisions = true;

    document.body.onmousedown = function onClickLeft(event) {
        if (upperArmRight.rotation.y < 0.0001) {
            armsMovementCharge(scene, upperArmRight, 1, true, camera, true);
            armsMovementCharge(scene, lowerArmRight, 1, false, camera, false);
            armsMovementCharge(scene, upperArmLeft, 1, false, camera, false);
            armsMovementCharge(scene, lowerArmLeft, 1, true, camera, false);
        }
    };

    document.body.onmouseup = function onReleaseLeft(event) {
        armsMovementRelease(scene, upperArmRight, true, true);
        armsMovementRelease(scene, lowerArmRight, false, false);
        armsMovementRelease(scene, upperArmLeft, false, false);
        armsMovementRelease(scene, lowerArmLeft, true, false);
    };
};

var fps = 30;
var frames1 = 15;
var frames2 = 2;

var fireball = false;

var armsMovementCharge = function(scene, arm, max, ccw, camera, todoFireball) {

    var armsMov = new BABYLON.Animation(
        "armsMov",
        "rotation.y", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keys = [];

    var curr_rot = arm.rotation.y;

    keys.push({frame: 0, value: curr_rot});

    var inc = max / (frames1);

    for (var i = 1; i <= frames1 ; i++) {
        if (ccw) curr_rot += inc;
        else curr_rot -= inc;
        //window.alert(i + " - " + curr_rot);
        keys.push({frame: i, value: curr_rot});
    }

    armsMov.setKeys(keys);

    arm.animations = [];
    arm.animations.push(armsMov);

    var animatable = scene.beginAnimation(arm, false, fps, false);

    if (todoFireball) {
        animatable.onAnimationEnd = function () {
            animatable.animationStarted = false;

            if (Math.abs(arm.rotation.y - 0.86666666666) < 0.0001) {
                createFireball(scene, camera);
            }
        };
    }
};

var armsMovementRelease = function(scene, arm, ccw, todoFireball) {

    var max = Math.abs(arm.rotation.y);

    var armsMov = new BABYLON.Animation(
        "armsMov",
        "rotation.y", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keys = [];

    keys.push({frame: 0, value: 0});

    var curr_rot = arm.rotation.y;

    var inc = max / (frames2);

    for (var i = 0; i < frames2; i++) {
        if (ccw) curr_rot -= inc;
        else curr_rot += inc;
        //window.alert(i + " - " + curr_rot);
        keys.push({frame: i, value: curr_rot});
    }

    keys.push({frame: i, value: 0});

    armsMov.setKeys(keys);

    arm.animations = [];
    arm.animations.push(armsMov);

    scene.stopAnimation(arm);

    var animatable = scene.beginAnimation(arm, false, fps, false);

    if (todoFireball && fireball != null) {
        animatable.onAnimationEnd = function () {
            animatable.animationStarted = false;
            fireFireball(scene);
        };
    }
};

var createFireball = function (scene, camera) {
    fireball = BABYLON.Mesh.CreateBox("fireball", 1, scene);
    fireball.scaling.x = 0.6;
    fireball.scaling.y = 0.6;
    fireball.scaling.z = 0.6;

    var fireballMaterial = new BABYLON.StandardMaterial("material", scene);
    fireballMaterial.diffuseTexture = new BABYLON.Texture("Resources/fire/fire.jpg", scene);
    fireballMaterial.emissiveColor = new BABYLON.Vector3(1.0, 0.0, 0.0);
    fireball.material = fireballMaterial;

    fireball.position = new BABYLON.Vector3(0.0, -0.5, 4);
    fireball.parent = camera;
};

var fireFireball = function (scene) {
    var max = 10000;

    var fireballCast = new BABYLON.Animation(
        "fireballCast",
        "position.z", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keys = [];

    keys.push({frame: 0, value: 0});

    var curr_pos = fireball.position.z;

    for (var i = 0; i < max; i++) {
        curr_pos += i;
        keys.push({frame: i, value: curr_pos});
    }

    keys.push({frame: i, value: 0});

    fireballCast.setKeys(keys);

    fireball.animations = [];
    fireball.animations.push(fireballCast);

    var animatable = scene.beginAnimation(fireball, false, fps, false);
    animatable.onAnimationEnd = function () {
        animatable.animationStarted = false;
        deleteMesh(fireball);
    };
};

var deleteMesh = function (fireball) {
    fireball.dispose();
    fireball = null;
};
