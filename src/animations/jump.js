var max_jump_heigth = 8;

//jump animation
var cameraJump = function (scene) {

    var fps = 13;//the speed of the jump execution

    isJumping = true;

    var cam = scene.cameras[0];

    cam.animations = [];

    var jump = new BABYLON.Animation(
        "jump",
        "position.y", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keys = [];

    var i;
    var current_position = cam.position.y;

    keys.push({frame: 0, value: current_position});

    for (i = 1; i < max_jump_heigth; i++) {
        current_position += 2;
        keys.push({frame: i, value: current_position});
    }

    for (; i < max_jump_heigth + 1; i++) {
        keys.push({frame: i, value: current_position});
    }


    jump.setKeys(keys);
    /*

        var easingFunction = new BABYLON.CircleEase();
        easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        jump.setEasingFunction(easingFunction);
    */

    cam.animations.push(jump);


    var animatable = scene.beginAnimation(cam, false, fps, false);


    var angleUpperRight2 = 0;

    var inc2 = 0.05;

    scene.beforeRender = function () {
        if (angleUpperRight2 >= -maxUpper) {
            angleUpperRight2 -= inc2;
            upperLegRight.rotate(BABYLON.Axis.Y, inc2 / 2);
            upperLegLeft.rotate(BABYLON.Axis.Y, -inc2 / 2);
        }

    };

    animatable.onAnimationEnd = function () {
        animatable.animationStarted = false;
        movementBool = true;
        canCharge = true;
        falling = true;
        isCharging = false;

        angleUpperRight0 = 0;
        angleUpperRight1 = 0;

        var angleRot = 0;
        var inc = 0.05;

        scene.beforeRender = function () {
            if (angleRot >= -0.3) {
                angleRot -= inc;

                upperLegRight.rotate(BABYLON.Axis.Y, -inc/1.2);
                upperLegLeft.rotate(BABYLON.Axis.Y, inc/1.2);

            } else {

                fireKeyboardEvent("keydown", 87);
                fireKeyboardEvent("keyup", 87);
            }

        };
    };

};




