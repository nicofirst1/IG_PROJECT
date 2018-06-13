var moveArms = false;
var phase1Arms = true;
var phase2Arms = false;


var armRunAngle = 0;
var armRunInc = -0.1;


var beforeRenderArms = function () {


    var maxUpper = 0.8;

    if (chargingFireballArm) {
        return
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

var armsChargeAnimationTime = 10;
var chargeArmsAnimationInterval;


var armZchargeAngle = 0;
var armXchargeAngle = 0;
var chargingFireballArm = false;

var armsChargeAnimation = function (scene, camera, todoFireball) {


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


};

var dischargeArmsAnimationInterval;
var armsDischargeAnimationTime = 0.01;


var armsDischargeAnimation = function (scene, camera, todoFireball) {


    var maxZRotation = 1;
    var maxXRotation = 1;
    var inc = 0.01;
    var done = false;

    armZchargeAngle = round(armZchargeAngle, 3);
    armXchargeAngle = round(armXchargeAngle, 3);

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

var fireballAnimation = function (scene, camera, todoFireball) {
    if (todoFireball) {
        createFireball(scene, camera)
    }

    var max_scaling = 15;

    var enlargeFireballX = new BABYLON.Animation(
        "enlargeFireballX",
        "scaling.x", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var enlargeFireballY = new BABYLON.Animation(
        "enlargeFireballY",
        "scaling.y", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var enlargeFireballZ = new BABYLON.Animation(
        "enlargeFireballZ",
        "scaling.z", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keysX = [];
    var keysY = [];
    var keysZ = [];

    var curr_scale = 1;
    for (var i = 0; curr_scale < max_scaling; i++) {
        curr_scale += 0.8;
        keysX.push({frame: i, value: curr_scale});
        keysY.push({frame: i, value: curr_scale});
        keysZ.push({frame: i, value: curr_scale});
    }

    enlargeFireballX.setKeys(keysX);
    enlargeFireballY.setKeys(keysY);
    enlargeFireballZ.setKeys(keysZ);

    fireball.animations = [];
    fireball.animations.push(enlargeFireballX);
    fireball.animations.push(enlargeFireballY);
    fireball.animations.push(enlargeFireballZ);

    var animatable = scene.beginAnimation(fireball, false, fps, false);

    var max_scaling_fire = 15;

    var enlargeFirePSMin = new BABYLON.Animation(
        "enlargeFirePSMin",
        "minSize", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    var enlargeFirePSMax = new BABYLON.Animation(
        "enlargeFirePSMax",
        "maxSize", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keysMin = [];
    var keysMax = [];

    var curr_min = pSystem.minSize;
    var cur_max = pSystem.maxSize;

    for (var i = 0; cur_max < max_scaling_fire; i++) {
        curr_min += 0.2;
        cur_max += 0.05;
        keysMin.push({frame: i, value: curr_min});
        keysMax.push({frame: i, value: cur_max});
    }

    enlargeFirePSMin.setKeys(keysMin);
    enlargeFirePSMax.setKeys(keysMax);

    pSystem.animations = [];
    pSystem.animations.push(enlargeFirePSMin);
    pSystem.animations.push(enlargeFirePSMax);

    var animatable = scene.beginAnimation(pSystem, false, fps, false);


}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
