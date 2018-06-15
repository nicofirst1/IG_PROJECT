var moveLegs = false;
var phase1 = true;
var phase2 = false;
var phase3 = false;
var phase4 = false;

var maxUpper = 0.8;
var maxLower = 1.2;

var chargedForJump = false;
var canCharge = true;

var angleUpperRight = 0;
var angleUpperLeft = 0;
var angleLowerLeft = 0;
var angleLowerRight = 0;

var legMovement = function (scene, leg, max, ccw, camera, upperLeg) {
    moveLegs = true;

    var inc = 0.1;

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

                if (phase1) {
                    if (angleUpperLeft >= -maxUpper) {
                        angleUpperLeft -= inc;
                        upperLegLeft.rotate(BABYLON.Axis.Z, -inc);
                    }

                    if (angleLowerLeft >= -maxLower) {
                        angleLowerLeft -= inc;
                        lowerLegLeft.rotate(BABYLON.Axis.Z, -inc);
                    }
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

                if (phase2) {
                    if (angleUpperLeft <= 0) {
                        angleUpperLeft += inc;
                        upperLegLeft.rotate(BABYLON.Axis.Z, inc);
                    }

                    if (angleLowerLeft <= 0) {
                        angleLowerLeft += inc;
                        lowerLegLeft.rotate(BABYLON.Axis.Z, inc);
                    }
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

                if (phase3) {
                    if (angleUpperLeft <= maxUpper) {
                        angleUpperLeft += inc;
                        upperLegLeft.rotate(BABYLON.Axis.Z, inc);
                    }

                    if (angleLowerRight >= -maxLower) {
                        angleLowerRight -= inc;
                        lowerLegRight.rotate(BABYLON.Axis.Z, -inc);
                    }
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

                if (phase4) {
                    if (angleUpperLeft >= 0) {
                        angleUpperLeft -= inc;
                        upperLegLeft.rotate(BABYLON.Axis.Z, -inc);
                    }

                    if (angleLowerRight <= 0) {
                        angleLowerRight += inc;
                        lowerLegRight.rotate(BABYLON.Axis.Z, inc);
                    }
                }
            }
        } else {

            if (angleUpperRight >= 0.1) {
                angleUpperRight -= inc;

                upperLegRight.rotate(BABYLON.Axis.Z, -inc);
                upperLegLeft.rotate(BABYLON.Axis.Z, inc);
            } else if (angleUpperRight <= -0.1) {
                angleUpperRight += inc;
                upperLegRight.rotate(BABYLON.Axis.Z, inc);
                upperLegLeft.rotate(BABYLON.Axis.Z, -inc);

            } else {
                upperLegRight.setRotation(upperLegRightInit);
                upperLegLeft.setRotation(upperLegLeftInit);
                lowerLegRight.setRotation(lowerLegRightInit);
                lowerLegLeft.setRotation(lowerLegLeftInit);
            }

            if (angleLowerRight > 0.1) {
                angleLowerRight -= inc;
                lowerLegRight.rotate(BABYLON.Axis.Z, -inc);
            }
            if (angleLowerLeft > 0.1) {
                angleLowerLeft -= inc;
                lowerLegLeft.rotate(BABYLON.Axis.Z, -inc);
            }
        }

        beforeRenderArms();

    }


};

var angleUpperRight0 = 0;
var isCharging = false;

var legsJumpCharge = function (scene) {

    isCharging = true;
    var inc = 0.3;
    scene.beforeRender = function () {
        if (canCharge && !isJumping) {
            if (angleUpperRight0 >= -maxUpper) {
                angleUpperRight0 -= inc;
                upperLegRight.rotate(BABYLON.Axis.Z, -inc);
                lowerLegRight.rotate(BABYLON.Axis.Z, -inc);
                upperLegLeft.rotate(BABYLON.Axis.Z, -inc);
                lowerLegLeft.rotate(BABYLON.Axis.Z, -inc);
                bodyMesh.position.y -= inc * 0.5;
            }
            else {
                chargedForJump = true;
                canCharge = false;
            }
        }


    };

};


var angleUpperRight1 = 0;

var legsJumpRelease = function (scene) {

    var inc = 0.3;

    scene.beforeRender = function () {
        if (chargedForJump && jumpKeyRelease) {
            if (angleUpperRight1 >= -maxUpper) {
                angleUpperRight1 -= inc;
                upperLegRight.rotate(BABYLON.Axis.Z, inc);
                lowerLegRight.rotate(BABYLON.Axis.Z, inc);
                upperLegLeft.rotate(BABYLON.Axis.Z, inc);
                lowerLegLeft.rotate(BABYLON.Axis.Z, inc);

                bodyMesh.position.y += inc * 0.5;
            } else {
                jumpKeyRelease = false;
                chargedForJump = false;
                cameraJump(scene);
            }
        }

    };

};


function fireKeyboardEvent(event, keycode) {
    var keyboardEvent = document.createEventObject ?
        document.createEventObject() : document.createEvent("Events");

    if(keyboardEvent.initEvent) {
        keyboardEvent.initEvent(event, true, true);
    }

    keyboardEvent.keyCode = keycode;
    keyboardEvent.which = keycode;

    document.dispatchEvent ? document.dispatchEvent(keyboardEvent)
        : document.fireEvent(event, keyboardEvent);
}