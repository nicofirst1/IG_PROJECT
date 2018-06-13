var moveLegs = false;
var angle = 0;
var inc = 0.02;
var foreward = true;

var legMovement = function(scene, leg, max, ccw, camera, upperLeg) {
    moveLegs = true;

    scene.beforeRender = function () {


        var mat = skeleton.bones[7].getLocalMatrix().copyFrom(initMat);
        mat.multiplyToRef(BABYLON.Matrix.RotationX(angle), mat);

        skeleton.bones[7].markAsDirty();

    }
};