var moveLegs = false;
var phase1 = true;
var phase2 = false;
var phase3 = false;
var phase4 = false;

var maxUpper = 0.7;
var maxLower = 0.7;

var legMovement = function(scene, leg, max, ccw, camera, upperLeg) {
    moveLegs = true;

    var angleUpperRight = 0;
    var angleUpperLeft = 0;
    var angleLowerLeft = 0;
    var angleLowerRight = 0;

    var incUpperRight = 0.05;
    var inc = 0.05;

    scene.beforeRender = function () {

        if (moveLegs) {
            if (phase1) {
                if (angleUpperRight <= maxUpper) {
                    angleUpperRight += inc;
                    upperLegRight.rotate(BABYLON.Axis.Z, inc);
                } else {
                    phase1 = false;
                    phase2 = true;
                }

                if (angleUpperLeft >= -maxUpper) {
                    angleUpperLeft -= inc;
                    upperLegLeft.rotate(BABYLON.Axis.Z, -inc);
                }

                if (angleLowerLeft >= -maxLower) {
                    angleLowerLeft -= inc;
                    lowerLegLeft.rotate(BABYLON.Axis.Z, -inc);
                }
            }

            else if (phase2) {
                if (angleUpperRight >= 0) {
                    angleUpperRight -= inc;
                    upperLegRight.rotate(BABYLON.Axis.Z, -inc);
                } else {
                    phase2 = false;
                    phase3 = true;
                }

                if (angleUpperLeft <= 0) {
                    angleUpperLeft += inc;
                    upperLegLeft.rotate(BABYLON.Axis.Z, inc);
                }

                if (angleLowerLeft <= 0) {
                    angleLowerLeft += inc;
                    lowerLegLeft.rotate(BABYLON.Axis.Z, inc);
                }
            }

            else if (phase3) {
                if (angleUpperRight >= -maxUpper) {
                    angleUpperRight -= inc;
                    upperLegRight.rotate(BABYLON.Axis.Z, -inc);
                } else {
                    phase3 = false;
                    phase4 = true;
                }

                if (angleUpperLeft <= maxUpper) {
                    angleUpperLeft += inc;
                    upperLegLeft.rotate(BABYLON.Axis.Z, inc);
                }

                if (angleLowerRight >= -maxLower) {
                    angleLowerRight -= inc;
                    lowerLegRight.rotate(BABYLON.Axis.Z, -inc);
                }
            }

            else if (phase4) {
                if (angleUpperRight <= 0) {
                    angleUpperRight += inc;
                    upperLegRight.rotate(BABYLON.Axis.Z, inc);
                } else {
                    phase4 = false;
                    phase1 = true;
                }

                if (angleUpperLeft >= 0) {
                    angleUpperLeft -= inc;
                    upperLegLeft.rotate(BABYLON.Axis.Z, -inc);
                }

                if (angleLowerRight <= 0) {
                    angleLowerRight += inc;
                    lowerLegRight.rotate(BABYLON.Axis.Z, inc);
                }
            }
        } else {
            if (angleUpperRight > 0.0001) {
                angleUpperRight -= inc * 2;

                upperLegRight.rotate(BABYLON.Axis.Z, -inc);
                upperLegLeft.rotate(BABYLON.Axis.Z, inc);
            } else if (angleUpperRight < 0.0001){
                angleUpperRight += inc * 2;
                upperLegRight.rotate(BABYLON.Axis.Z, inc);
                upperLegLeft.rotate(BABYLON.Axis.Z, -inc);
            }

            if (angleLowerRight >  0.0001) {
                angleLowerRight -= inc * 2;
                lowerLegRight.rotate(BABYLON.Axis.Z, -inc);
            } else if (angleLowerRight < 0.0001){
                angleLowerRight += inc * 2;
                lowerLegRight.rotate(BABYLON.Axis.Z, inc);
            }

            if (angleLowerLeft > 0.0001) {
                angleLowerLeft -= inc * 2;
                lowerLegLeft.rotate(BABYLON.Axis.Z, -inc);
            } else if (angleLowerLeft < 0.0001){
                angleLowerLeft += inc * 2;
                lowerLegLeft.rotate(BABYLON.Axis.Z, inc);
            }

        }

    }


};