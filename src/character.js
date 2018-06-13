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
        dude.scaling = new BABYLON.Vector3(0.02,0.02,0.02);
        dude.position = new BABYLON.Vector3(0, 0, 0);
        skeleton.position = new BABYLON.Vector3(0, 0, 0);
        skeleton.scaling = new BABYLON.Vector3(0.02,0.02,0.02);
        initMat = skeleton.bones[7].getLocalMatrix().clone();


        bodyMesh = newMeshes[0];
        bodyMesh.position.y = -2;
        bodyMesh.scaling = new BABYLON.Vector3(0.05,0.05,0.05);
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

        upperArmRight.translate(new BABYLON.Vector3(3,0,4));
        upperArmLeft.translate(new BABYLON.Vector3(3,0,-4));

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

    document.body.onmouseup = function onReleaseLeft(event) {

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

    window.addEventListener("keydown", onKeyDown, false);

    var keyVec = [83, 87, 65 ,68];

    function onKeyDown(event) {
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

    window.addEventListener("keyup", onKeyUp, false);

    function onKeyUp(event) {
        if(keyVec.indexOf(event.keyCode) >= 0) {
            moveLegs = false;
            moveArms = false;
            movementBool = true;
        }
    }
};

var fps = 30;
var frames1 = 15;
var frames2 = 2;

var fireball = null;
var pSystem = null;


var createFireballAnimation = function(scene) {

    createFireball(scene, camera);

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
    for (var i = 0; curr_scale <  max_scaling; i++) {
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

    for (var i = 0; cur_max <  max_scaling_fire; i++) {
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


};

var armsMovementRelease = function(scene, arm, ccw, todoFireball, camera, ground) {

    var max = Math.abs(arm.rotation.y);

    var armsMov = new BABYLON.Animation(
        "armsMov",
        "rotation.y", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keys = [];

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
            fireFireball(scene, camera, ground);
        };
    }
};

var fireballRot = true;


var createFireball = function (scene, camera) {
    fireball = BABYLON.Mesh.CreateSphere('fireball', 16, 0.1, scene);

    var fireballMaterial = new BABYLON.StandardMaterial("material", scene);
    fireballMaterial.diffuseTexture = new BABYLON.Texture("Resources/fire/fire.jpg", scene);
    fireballMaterial.emissiveColor = new BABYLON.Vector3(1.0, 0.0, 0.0);
    fireball.material = fireballMaterial;

    fireball.parent = camera;

    if (useThirdP) fireball.position = new BABYLON.Vector3(0.0, -0.5, 6);
    else fireball.position = new BABYLON.Vector3(0.0, -0.5, 6);

    pSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    pSystem.emitter = fireball;
    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    pSystem.light = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, 0, 0), scene);
    pSystem.light.diffuse = new BABYLON.Color3(.8, 0, 0);
    pSystem.light.range = 15;

    pSystem.particleTexture = new BABYLON.Texture("Resources/map/flares/flare.png", scene);
    pSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    pSystem.maxEmitBox = new BABYLON.Vector3(0, .2, 0);
    pSystem.color1 = new BABYLON.Color4(1.0, 0.05, 0.05, .9);
    pSystem.color2 = new BABYLON.Color4(1, 1, 0, .9);
    pSystem.colorDead = new BABYLON.Color4(.5, .02, 0, .5);
    pSystem.minSize = 0.1;
    pSystem.maxSize = 0.3;
    pSystem.minLifeTime = 0.075;
    pSystem.maxLifeTime = 0.1;
    pSystem.emitRate = 400;
    pSystem.gravity = new BABYLON.Vector3(0, 0, 0);
    pSystem.direction1 = new BABYLON.Vector3(0, .05, 0);
    pSystem.direction2 = new BABYLON.Vector3(0, -.05, 0);
    pSystem.minAngularSpeed = 1.5;
    pSystem.maxAngularSpeed = 2.5;
    pSystem.minEmitPower = 0.4;
    pSystem.maxEmitPower = 0.75;
    pSystem.updateSpeed = 0.008;
    pSystem.start();

    var direction;
    if (fireballRot) {
        direction = new BABYLON.Vector3(0.03, 0.03, 0.03);
        fireballRot = false;
    }
    else {
        direction = new BABYLON.Vector3(0.0, 0.0, 0.0);
    }

    scene.registerBeforeRender(function () {
         if (fireball != null) fireball.rotation.addInPlace(direction);
    });
};

var fireballID = -1;

var fireFireball = function (scene, camera, ground) {

    var scalingX = fireball.scaling.x;
    var scalingY = fireball.scaling.y;
    var scalingZ = fireball.scaling.z;

    var minSizeBall = pSystem.minSize;
    var maxSizeBall = pSystem.maxSize;

    fireball.dispose();
    fireball = null;
    pSystem = null;

    var bulletFireball = BABYLON.Mesh.CreateSphere('bulletFireball', 16, 0.1, scene);
    bulletFireball.subID = fireballID;
    fireballID -= 1;

    if (fireballID < -1000) fireballID = -1;

    bulletFireball.scaling.x = scalingX;
    bulletFireball.scaling.y = scalingY;
    bulletFireball.scaling.z = scalingZ;


    bulletFireball.checkCollisions = true;
    bulletFireball.physicsImpostor = new BABYLON.PhysicsImpostor(bulletFireball, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1*scalingX, friction: 0, restitution: 0 });

    var invView = new BABYLON.Matrix();
    camera.getViewMatrix().invertToRef(invView);
    var direction = BABYLON.Vector3.TransformNormal(new BABYLON.Vector3(0, 0, 1), invView);
    direction.normalize();

    if (useThirdP) {
        direction.y -= 0.25;
    }

    var startPos = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z);
    startPos.x += direction.x * 3;
    startPos.y += direction.y * 3;
    startPos.z += direction.z * 3;

    bulletFireball.position = new BABYLON.Vector3(startPos.x, startPos.y, startPos.z);
    var fireballMaterial = new BABYLON.StandardMaterial("material", scene);
    fireballMaterial.diffuseTexture = new BABYLON.Texture("Resources/fire/fire.jpg", scene);
    fireballMaterial.emissiveColor = new BABYLON.Vector3(1.0, 0.0, 0.0);
    bulletFireball.material = fireballMaterial;

    var pSystem2 = new BABYLON.ParticleSystem("particles", 2000, scene);
    pSystem2.emitter = bulletFireball;
    pSystem2.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    pSystem2.light = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, 0, 0), scene);
    pSystem2.light.diffuse = new BABYLON.Color3(.8, 0, 0);
    pSystem2.light.range = 15;

    pSystem2.particleTexture = new BABYLON.Texture("Resources/map/flares/flare.png", scene);
    pSystem2.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    pSystem2.maxEmitBox = new BABYLON.Vector3(0, .2, 0);
    pSystem2.color1 = new BABYLON.Color4(1.0, 0.05, 0.05, .9);
    pSystem2.color2 = new BABYLON.Color4(1, 1, 0, .9);
    pSystem2.colorDead = new BABYLON.Color4(.5, .02, 0, .5);
    pSystem2.minSize = minSizeBall;
    pSystem2.maxSize = maxSizeBall;
    pSystem2.minLifeTime = 0.075;
    pSystem2.maxLifeTime = 0.1;
    pSystem2.emitRate = 400;
    pSystem2.gravity = new BABYLON.Vector3(0, 0, 0);
    pSystem2.direction1 = new BABYLON.Vector3(0, .05, 0);
    pSystem2.direction2 = new BABYLON.Vector3(0, -.05, 0);
    pSystem2.minAngularSpeed = 1.5;
    pSystem2.maxAngularSpeed = 2.5;
    pSystem2.minEmitPower = 0.4;
    pSystem2.maxEmitPower = 0.75;
    pSystem2.updateSpeed = 0.008;
    pSystem2.start();

    var impulseDir = new BABYLON.Vector3(0.0, 0.0, 0.0);
    impulseDir.x = direction.x * 1000;
    impulseDir.y = direction.y * 1000;
    impulseDir.z = direction.z * 1000;

    bulletFireball.physicsImpostor.applyImpulse(impulseDir, bulletFireball.getAbsolutePosition());
    bulletFireball.collisionsCount = 0;

    var groundBox = ground[1];
    bulletFireball.physicsImpostor.registerOnPhysicsCollide(groundBox.physicsImpostor, function() {
        explosionAnimation(scene, pSystem2, bulletFireball, "Resources/map/flares/flare.png", 0.1, 0.1, 0.1, 0.5, 2, ground, false);
    });

    var ground0 = ground[0];
    bulletFireball.physicsImpostor.registerOnPhysicsCollide(ground0.physicsImpostor, function() {
        bulletFireball.collisionsCount += 1;
        if (bulletFireball.collisionsCount == 3) {
            explosionAnimation(scene, pSystem2, bulletFireball, "Resources/map/flares/flare.png", 1.000, 0.271, 0.000, 0.5, 2, ground, false);
        }
    });
};


