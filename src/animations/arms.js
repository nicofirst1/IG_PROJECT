var moveArms = false;
var phase1Arms = true;
var phase2Arms = false;


var armRunAngle = 0;
var armRunInc = -0.085;


var beforeRenderArms = function () {


    var maxUpper = 0.8;

    if (chargingFireballArm) {
        return
    }

    if(isNaN(armRunAngle)){
        armRunAngle=0;
    }


    if (moveArms) {

        if (armRunAngle < maxUpper && phase1Arms) {
            if (armRunInc < 0) armRunInc = -armRunInc;

        }
        else {
            if (armRunInc > 0) armRunInc = -armRunInc;
            phase1Arms = false;
            phase2Arms = true;
        }

        if (armRunAngle > -maxUpper && phase2Arms) {
            if (armRunInc > 0) armRunInc = -armRunInc;
        }
        else {
            if (armRunInc < 0) armRunInc = -armRunInc;
            phase1Arms = true;
            phase2Arms = false;

        }


        upperArmRight.rotate(BABYLON.Axis.Z, armRunInc);
        upperArmLeft.rotate(BABYLON.Axis.Z, -armRunInc);
        armRunAngle += armRunInc;

    }
    else {
        armRunAngle = round(armRunAngle, 3);

        if (armRunAngle > 0) {
            if (armRunInc > 0) armRunInc = -armRunInc;
            upperArmRight.rotate(BABYLON.Axis.Z, armRunInc);
            upperArmLeft.rotate(BABYLON.Axis.Z, -armRunInc);
            armRunAngle += armRunInc;
        }
        else if (armRunAngle < 0) {
            if (armRunInc < 0) armRunInc = -armRunInc;
            upperArmRight.rotate(BABYLON.Axis.Z, armRunInc);
            upperArmLeft.rotate(BABYLON.Axis.Z, -armRunInc);
            armRunAngle += armRunInc;
        }

    }
};

var armsChargeAnimationTime = 5;
var chargeArmsAnimationInterval;


var armZchargeAngle = 0;
var armXchargeAngle = 0;
var chargingFireballArm = false;

var armsChargeAnimation = function () {



    var maxZRotation = 1;
    var maxXRotation = 1;
    var inc = 0.01;
    chargingFireballArm = true;


    if (armZchargeAngle < maxZRotation) {
        upperArmRight.rotate(BABYLON.Axis.Z, -inc);
        upperArmLeft.rotate(BABYLON.Axis.Z, -inc);
        armZchargeAngle += inc;
    }
    if (armXchargeAngle < maxXRotation) {
        upperArmRight.rotate(BABYLON.Axis.X, inc);
        upperArmLeft.rotate(BABYLON.Axis.X, -inc);
        armXchargeAngle += inc;
    }

    //fireballAnimation(scene,camera,todoFireball)


};

var dischargeArmsAnimationInterval;
var armsDischargeAnimationTime = 0.001;


var armsDischargeAnimation = function () {

    //console.log(armXchargeAngle);

    var inc = 0.01;
    var done = false;

    armZchargeAngle = round(armZchargeAngle, 3);
    armXchargeAngle = round(armXchargeAngle, 3);

    if(!armZchargeAngle || ! armXchargeAngle) {
        clearInterval(dischargeArmsAnimationInterval);
        chargingFireballArm = false;
    }

    if (armZchargeAngle > 0) {
        upperArmRight.rotate(BABYLON.Axis.Z, inc);
        upperArmLeft.rotate(BABYLON.Axis.Z, inc);
        armZchargeAngle -= inc;
        done = false;
    }
    else done = true;
    if (armXchargeAngle > 0) {
        upperArmRight.rotate(BABYLON.Axis.X, -inc);
        upperArmLeft.rotate(BABYLON.Axis.X, inc);
        armXchargeAngle -= inc;
        done = false;

    }
    else done = true;

    if (done) {
        clearInterval(dischargeArmsAnimationInterval);
        chargingFireballArm = false;

    }


};

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
