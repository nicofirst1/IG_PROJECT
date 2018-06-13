var addClickListeners=function () {


    document.body.onmousedown = function onClickLeft(event) {

        createFireballAnimation(scene);

        chargeArmsAnimationInterval=setInterval(function () {
            armsChargeAnimation(scene,camera,true);
        }, armsChargeAnimationTime);


        manaConsumptionFlag=true;
        manaInterval= setInterval(function () {
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



    document.body.onmouseup = mouseup(event)


};

var mouseup=function(event,ground) {

    fireFireball(scene, camera, ground);


    dischargeArmsAnimationInterval=setInterval(function () {
        armsDischargeAnimation(scene,camera,true);
    }, armsDischargeAnimationTime);


    clearInterval(manaInterval);
    clearInterval(chargeArmsAnimationInterval);
    manaConsumptionFlag=false;

    //play random sound
    fireballSound[Math.floor(Math.random()*fireballSound.length)].play();

};



var addKeyboardListeners=function () {

    window.addEventListener("keyup", onKeyUp, false);

    window.addEventListener("keydown", onKeyDown, false);

}

var keyVec = [83, 87, 65 ,68];//WASD


var onKeyUp=function(event) {
    if(keyVec.indexOf(event.keyCode) >= 0) {
        moveLegs = false;
        moveArms = false;
        movementBool = true;
    }
};

var  onKeyDown= function(event) {
    if(keyVec.indexOf(event.keyCode) >= 0) {
        if (chargedForJump) {
            scene.stopAnimation(camera);
            scene.stopAnimation(upperLegRight);
            scene.stopAnimation(upperLegLeft);
            legsCharge = true;
        }
        if (movementBool && !isJumping) {
            movementBool = false;
            moveLegs = true;
            moveArms = true;
            legMovement(scene, upperLegLeft, 2.5, true, camera, true);
        }
    }
}