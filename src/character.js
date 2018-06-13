var upperArmRight;
var lowerArmRight;
var upperArmLeft;
var lowerArmLeft;

var upperLegRight;
var lowerLegRight;
var upperLegLeft;
var lowerLegLeft;

var upperLegRightInit;
var lowerLegRightInit;
var upperLegLeftInit;
var lowerLegLeftInit;

var upperArmRightInit;
var lowerArmRightInit;
var upperArmLeftInit;
var lowerArmLeftInit;

var movementBool = true;
var body;
var head;

var skeleton;
var initMat;
var dude;

var bodyMesh;

var initCharacter = function (scene, camera, shadowGenerator, ground) {

    BABYLON.SceneLoader.ImportMesh("", "Models/dude/", "Dude.babylon", scene, function (newMeshes, particleSystems, skeletons) {

        dude = newMeshes[0];
        skeleton = skeletons[0];
        dude.scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
        dude.position = new BABYLON.Vector3(0, 0, 0);
        skeleton.position = new BABYLON.Vector3(0, 0, 0);
        skeleton.scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
        initMat = skeleton.bones[7].getLocalMatrix().clone();


        bodyMesh = newMeshes[0];
        bodyMesh.position.y = -2;
        bodyMesh.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        bodyMesh.parent = camera;

        body = skeleton.bones[0];
        head = skeleton.bones[7];

        upperArmRight = skeleton.bones[12];
        lowerArmRight = skeleton.bones[14];
        upperArmLeft = skeleton.bones[31];
        lowerArmLeft = skeleton.bones[33];

        upperLegRight = skeleton.bones[50];
        lowerLegRight = skeleton.bones[51];
        upperLegLeft = skeleton.bones[54];
        lowerLegLeft = skeleton.bones[55];

        upperLegRight.rotate(BABYLON.Axis.Y, -0.15);
        upperLegLeft.rotate(BABYLON.Axis.Y, 0.15);


        upperArmRight.rotate(BABYLON.Axis.Y, -0.7);
        upperArmLeft.rotate(BABYLON.Axis.Y, 0.7);

        lowerArmRight.rotate(BABYLON.Axis.Z, -1.5);
        lowerArmLeft.rotate(BABYLON.Axis.Z, -1.5);


        lowerArmRight.rotate(BABYLON.Axis.X, 0.3);
        lowerArmLeft.rotate(BABYLON.Axis.X, -0.3);

        upperArmRight.translate(new BABYLON.Vector3(3, 0, 4));
        upperArmLeft.translate(new BABYLON.Vector3(3, 0, -4));

        upperLegRightInit = upperLegRight.getRotation();
        upperLegLeftInit = upperLegLeft.getRotation();
        lowerLegRightInit = lowerLegRight.getRotation();
        lowerLegLeftInit = lowerLegLeft.getRotation();

        upperArmRightInit = upperArmRight.getRotation();
        upperArmLeftInit = upperArmLeft.getRotation();
        lowerArmRightInit = lowerArmRight.getRotation();
        lowerArmLeftInit = lowerArmLeft.getRotation();

    });

    document.body.onmousedown = function onClickLeft(event) {

        createFireballAnimation(scene);

        chargeArmsAnimationInterval = setInterval(function () {
            armsChargeAnimation(scene, camera, true);
        }, armsChargeAnimationTime);


        manaConsumptionFlag = true;
        manaInterval = setInterval(function () {
            if (mana_value <= 0) {
                mana_value = 0;
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("mouseup", true, true);
                document.body.dispatchEvent(evt);
            } else {
                update_mana(-1);
            }
        }, manaConsumptionInterval);
    };

    document.body.onmouseup = function onReleaseLeft(event) {

        fireFireball(scene, camera, ground);


        dischargeArmsAnimationInterval = setInterval(function () {
            armsDischargeAnimation(scene, camera, true);
        }, armsDischargeAnimationTime);


        clearInterval(manaInterval);
        clearInterval(chargeArmsAnimationInterval);
        manaConsumptionFlag = false;

        //play random sound
        fireballSound[Math.floor(Math.random() * fireballSound.length)].play();

    };

}




