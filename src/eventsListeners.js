//########################
//         MOUSE
//########################

var addClickListeners = function () {


    document.body.onmousedown = function onClickLeft(event) {

        createFireballAnimation(scene);

        chargeArmsAnimationInterval = setInterval(function () {
            armsChargeAnimation();
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
            armsDischargeAnimation();
        }, armsDischargeAnimationTime);


        clearInterval(manaInterval);
        clearInterval(chargeArmsAnimationInterval);
        manaConsumptionFlag = false;

        //play random sound
        fireballSound[Math.floor(Math.random() * fireballSound.length)].play();

    };


};

var mouseup = function (event, ground) {

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


//########################
//         KEYBOARD
//########################
var addKeyboardListeners = function () {

    window.addEventListener("keyup", onKeyUp, false);

    window.addEventListener("keydown", onKeyDown, false);

}

var keyVec = [83, 87, 65, 68];//WASD


var onKeyUp = function (event) {
    if (keyVec.indexOf(event.keyCode) >= 0) {
        moveLegs = false;
        moveArms = false;
        if (!movementBool) {
            movementBool = true;
            angleUpperRight = 0;
            angleUpperLeft = 0;
            angleLowerLeft = 0;
            angleLowerRight = 0;
            upperLegRight.setRotation(upperLegRightInit);
            upperLegLeft.setRotation(upperLegLeftInit);
            lowerLegRight.setRotation(lowerLegRightInit);
            lowerLegLeft.setRotation(lowerLegLeftInit);
        }
    }
    switch (event.keyCode) {
        case 32:
            jumpKeyRelease = true;
            legsJumpRelease(scene);

            if (!chargedForJump) {
                upperLegRight.setRotation(upperLegRightInit);
                upperLegLeft.setRotation(upperLegLeftInit);
                lowerLegRight.setRotation(lowerLegRightInit);
                lowerLegLeft.setRotation(lowerLegLeftInit);
                bodyMesh.position.y = -2;
            }
            break;


        case 86://V
            if (modeSwitch === 0) {
                switchFPS(scene);
                modeSwitch = 1;
                useThirdP = false;
                currentPov.text = "Current POV is FP"


            }
            else if (modeSwitch === 1) {
                switchTPS(scene, false);
                modeSwitch = 2;
                useThirdP = true;
                currentPov.text = "Current POV is TP"

            }
            else if (modeSwitch === 2) {
                switchTPS(scene, true);
                modeSwitch = 0;
                useThirdP = true;
                currentPov.text = "Current POV is 2D"

            }
            else {
                modeSwitch = 0;
            }
            break;

        case 77://music with M
            if (playMusicFlag) {
                audio.pause();
                playMusicFlag = false
            }
            else {
                audio.play();
                playMusicFlag = true;
            }
            break;

        case 90: //z
            if (snow_flag){

                snowPS.start();
                snow_flag=false;
            }
            else{
                snowPS.stop();
                snow_flag=true;
            }


    }
};

var onKeyDown = function (event) {
    if (keyVec.indexOf(event.keyCode) >= 0) {
        if (chargedForJump) {
            //scene.stopAnimation(camera);
            //scene.stopAnimation(upperLegRight);
            //scene.stopAnimation(upperLegLeft);
            legsCharge = true;
        }
        if (movementBool && !isJumping) {
            movementBool = false;
            moveLegs = true;
            moveArms = true;
            legMovement(scene, upperLegLeft, 2.5, true, camera, true);
        }
    }
    if (event.keyCode === 32) {
        if (!isCharging) legsJumpCharge(scene);
        else {
            isCharging = false;
        }
    }
}


//########################
//         WINDOW
//########################

var windowListener = function () {

    window.addEventListener('click', setFullScreen);
    window.addEventListener("resize", function () {
        engine.resize();
    });


};

// Set full screen
var setFullScreen = function () {
    engine.isPointerLock = true;
    canvas.requestPointerLock();
};

