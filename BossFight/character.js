var upperArmRight;
var lowerArmRight;
var upperArmLeft;
var lowerArmLeft;


var initCharacter = function (scene, camera, shadowGenerator, ground) {

    var cameraPS = new BABYLON.ParticleSystem("particles", 2000, scene);
    cameraPS.emitter = camera;
    cameraPS.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    cameraPS.light = new BABYLON.PointLight("Omni1", camera.position, scene);
    cameraPS.light.diffuse = new BABYLON.Color3(1, 1, 1);
    cameraPS.light.range = 15;

    cameraPS.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    cameraPS.maxEmitBox = new BABYLON.Vector3(0, .2, 0);
    cameraPS.color1 = new BABYLON.Color4(1, 1, 1, .9);
    cameraPS.color2 = new BABYLON.Color4(1, 1, 1, .9);
    cameraPS.colorDead = new BABYLON.Color4(1, 1, 1, .5);
    cameraPS.minSize = 1.75;
    cameraPS.maxSize = 2.0;
    cameraPS.minLifeTime = 0.075;
    cameraPS.maxLifeTime = 0.1;
    cameraPS.emitRate = 400;
    cameraPS.gravity = new BABYLON.Vector3(0, 0, 0);
    cameraPS.direction1 = new BABYLON.Vector3(0, .05, 0);
    cameraPS.direction2 = new BABYLON.Vector3(0, -.05, 0);
    cameraPS.minAngularSpeed = 1.5;
    cameraPS.maxAngularSpeed = 2.5;
    cameraPS.minEmitPower = 0.4;
    cameraPS.maxEmitPower = 0.75;
    cameraPS.updateSpeed = 0.008;
    cameraPS.start();

    // UPPER RIGHT
    upperArmRight = BABYLON.Mesh.CreateBox("arm", 1, scene);
    upperArmRight.scaling.x = 0.3;
    upperArmRight.scaling.y = 0.3;
    upperArmRight.scaling.z = 0.5;

    var upperArmRightMaterial = new BABYLON.StandardMaterial("material", scene);
    upperArmRightMaterial.diffuseTexture = new BABYLON.Texture("Resources/armor/armor.jpg", scene);
    upperArmRight.material = upperArmRightMaterial;

    upperArmRight.position = new BABYLON.Vector3(1.1, -0.5, 1.2);
    upperArmRight.parent = camera;

    // LOWER RIGHT
    lowerArmRight = BABYLON.Mesh.CreateBox("arm", 2, scene);
    lowerArmRight.scaling.x = 0.5;
    lowerArmRight.scaling.y = 0.5;
    lowerArmRight.scaling.z = 0.5;

    var lowerArmRightMaterial = new BABYLON.StandardMaterial("material", scene);
    lowerArmRightMaterial.diffuseTexture = new BABYLON.Texture("Resources/armor/armor.jpg", scene);
    lowerArmRight.material = lowerArmRightMaterial;

    lowerArmRight.position.y = upperArmRight.position.y + 0.45;
    lowerArmRight.position.z = upperArmRight.position.z ;

    lowerArmRight.parent = upperArmRight;

    // UPPER LEFT
    upperArmLeft = BABYLON.Mesh.CreateBox("arm", 1, scene);
    upperArmLeft.scaling.x = 0.3;
    upperArmLeft.scaling.y = 0.3;
    upperArmLeft.scaling.z = 0.5;

    var upperArmLeftMaterial = new BABYLON.StandardMaterial("material", scene);
    upperArmLeftMaterial.diffuseTexture = new BABYLON.Texture("Resources/armor/armor.jpg", scene);
    upperArmLeft.material = upperArmLeftMaterial;

    upperArmLeft.position = new BABYLON.Vector3(-1.1, -0.5, 1.2);
    upperArmLeft.parent = camera;

    // LOWER LEFT
    lowerArmLeft = BABYLON.Mesh.CreateBox("arm", 2, scene);
    lowerArmLeft.scaling.x = 0.5;
    lowerArmLeft.scaling.y = 0.5;
    lowerArmLeft.scaling.z = 0.5;

    var lowerArmLeftMaterial = new BABYLON.StandardMaterial("material", scene);
    lowerArmLeftMaterial.diffuseTexture = new BABYLON.Texture("Resources/armor/armor.jpg", scene);
    lowerArmLeft.material = lowerArmLeftMaterial;

    lowerArmLeft.position.y = upperArmLeft.position.y + 0.45;
    lowerArmLeft.position.z = upperArmLeft.position.z;

    lowerArmLeft.parent = upperArmLeft;

    upperArmLeft.checkCollisions = true;
    upperArmRight.checkCollisions = true;
    lowerArmLeft.checkCollisions = true;
    lowerArmRight.checkCollisions = true;

    document.body.onmousedown = function onClickLeft(event) {
        if (upperArmRight.rotation.y < 0.0001) {
            armsMovementCharge(scene, upperArmRight, 1, true, camera, true);
            armsMovementCharge(scene, lowerArmRight, 1, false, camera, false);
            armsMovementCharge(scene, upperArmLeft, 1, false, camera, false);
            armsMovementCharge(scene, lowerArmLeft, 1, true, camera, false);
        }
    };

    document.body.onmouseup = function onReleaseLeft(event) {
        armsMovementRelease(scene, upperArmRight, true, true, camera, ground);
        armsMovementRelease(scene, lowerArmRight, false, false, camera, ground);
        armsMovementRelease(scene, upperArmLeft, false, false, camera, ground);
        armsMovementRelease(scene, lowerArmLeft, true, false, camera, ground);
    };
};

var fps = 30;
var frames1 = 15;
var frames2 = 2;

var fireball = false;

var armsMovementCharge = function(scene, arm, max, ccw, camera, todoFireball) {

    var armsMov = new BABYLON.Animation(
        "armsMov",
        "rotation.y", fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keys = [];

    var curr_rot = arm.rotation.y;

    keys.push({frame: 0, value: curr_rot});

    var inc = max / (frames1);

    for (var i = 1; i <= frames1 ; i++) {
        if (ccw) curr_rot += inc;
        else curr_rot -= inc;
        //window.alert(i + " - " + curr_rot);
        keys.push({frame: i, value: curr_rot});
    }

    armsMov.setKeys(keys);

    arm.animations = [];
    arm.animations.push(armsMov);

    var animatable = scene.beginAnimation(arm, false, fps, false);

    if (todoFireball) {
        animatable.onAnimationEnd = function () {
            animatable.animationStarted = false;

            if (Math.abs(arm.rotation.y - 0.86666666666) < 0.0001) {
                createFireball(scene, camera);
            }
        };
    }
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

    if (todoFireball && Math.abs(arm.rotation.y - 0.86666666666) < 0.0001) {
        animatable.onAnimationEnd = function () {
            animatable.animationStarted = false;
            fireFireball(scene, camera, ground);
        };
    }
};

var pSystem;

var createFireball = function (scene, camera) {
    fireball = BABYLON.Mesh.CreateSphere('fireball', 3, 1.6, scene);

    var fireballMaterial = new BABYLON.StandardMaterial("material", scene);
    fireballMaterial.diffuseTexture = new BABYLON.Texture("Resources/fire/fire.jpg", scene);
    fireballMaterial.emissiveColor = new BABYLON.Vector3(1.0, 0.0, 0.0);
    fireball.material = fireballMaterial;

    fireball.position = new BABYLON.Vector3(0.0, -0.5, 4);
    fireball.parent = camera;

    pSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    pSystem.emitter = fireball;
    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    pSystem.light = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, 0, 0), scene);
    pSystem.light.diffuse = new BABYLON.Color3(.8, 0, 0);
    pSystem.light.range = 15;

    pSystem.particleTexture = new BABYLON.Texture("Resources/fire/fire.jpg", scene);
    pSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    pSystem.maxEmitBox = new BABYLON.Vector3(0, .2, 0);
    pSystem.color1 = new BABYLON.Color4(1.0, 0.05, 0.05, .9);
    pSystem.color2 = new BABYLON.Color4(1, 1, 0, .9);
    pSystem.colorDead = new BABYLON.Color4(.5, .02, 0, .5);
    pSystem.minSize = 1.75;
    pSystem.maxSize = 2.0;
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

    var direction = new BABYLON.Vector3(0.03, 0.03, 0.03);

    scene.registerBeforeRender(function () {
         if (fireball != null) fireball.rotation.addInPlace(direction);
    });
};

var camera1;

var fireFireball = function (scene, camera, ground) {
    fireball.dispose();
    fireball = null;
    pSystem = null;

    var bulletFireball = BABYLON.Mesh.CreateSphere('bulletFireball', 3, 1.6, scene);
    bulletFireball.checkCollisions = true;
    bulletFireball.physicsImpostor = new BABYLON.PhysicsImpostor(bulletFireball, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, friction: 0, restitution: 0 });

    var invView = new BABYLON.Matrix();
    camera.getViewMatrix().invertToRef(invView);
    var direction = BABYLON.Vector3.TransformNormal(new BABYLON.Vector3(0, 0, 1), invView);
    direction.normalize();

    var startPos = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z);
    startPos.x += direction.x * 3;
    startPos.y += direction.y * 3;
    startPos.z += direction.z * 3;

    bulletFireball.position = new BABYLON.Vector3(startPos.x, startPos.y, startPos.z);
    var fireballMaterial = new BABYLON.StandardMaterial("material", scene);
    fireballMaterial.diffuseTexture = new BABYLON.Texture("Resources/fire/fire.jpg", scene);
    fireballMaterial.emissiveColor = new BABYLON.Vector3(1.0, 0.0, 0.0);
    bulletFireball.material = fireballMaterial;

    var pSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    pSystem.emitter = bulletFireball;
    pSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    pSystem.light = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, 0, 0), scene);
    pSystem.light.diffuse = new BABYLON.Color3(.8, 0, 0);
    pSystem.light.range = 15;

    pSystem.particleTexture = new BABYLON.Texture("Resources/fire/fire.jpg", scene);
    pSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    pSystem.maxEmitBox = new BABYLON.Vector3(0, .2, 0);
    pSystem.color1 = new BABYLON.Color4(1.0, 0.05, 0.05, .9);
    pSystem.color2 = new BABYLON.Color4(1, 1, 0, .9);
    pSystem.colorDead = new BABYLON.Color4(.5, .02, 0, .5);
    pSystem.minSize = 1.75;
    pSystem.maxSize = 2.0;
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

    var impulseDir = new BABYLON.Vector3(0.0, 0.0, 0.0);
    impulseDir.x = direction.x * 70;
    impulseDir.y = direction.y * 70;
    impulseDir.z = direction.z * 70;

    bulletFireball.physicsImpostor.applyImpulse(impulseDir, bulletFireball.getAbsolutePosition());

    var groundBox = ground[1];
    bulletFireball.physicsImpostor.registerOnPhysicsCollide(groundBox.physicsImpostor, function() {
        pSystem.stop();

        var posAbs = bulletFireball.getAbsolutePosition();
        var pos = new BABYLON.Vector3(posAbs.x, posAbs.y, posAbs.z);
        bulletFireball.dispose();

        var bulletFireballRest = BABYLON.Mesh.CreateSphere('bulletFireballRest', 3, 1.6, scene);
        bulletFireballRest.checkCollisions = true;
        bulletFireballRest.physicsImpostor = new BABYLON.PhysicsImpostor(bulletFireball, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, friction: 1000, restitution: 0 });
        bulletFireballRest.position = pos;
        bulletFireballRest.visibility = false;

        var pSystem2 = new BABYLON.ParticleSystem("particles", 2000, scene);
        pSystem2.emitter = bulletFireballRest;
        pSystem2.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        pSystem2.light = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, 0, 0), scene);
        pSystem2.light.diffuse = new BABYLON.Color3(0.412, 0.412, 0.412);
        pSystem2.light.range = 15;

        pSystem2.particleTexture = new BABYLON.Texture("Resources/steam/steam.png", scene);
        pSystem2.minEmitBox = new BABYLON.Vector3(-3.5, -3.5, -3.5);
        pSystem2.maxEmitBox = new BABYLON.Vector3(3.5, 3.5, 3.5);
        pSystem2.color1 = new BABYLON.Color4(0.412, 0.412, 0.412, .9);
        pSystem2.color2 = new BABYLON.Color4(0.863, 0.863, 0.863, .9);
        pSystem2.colorDead = new BABYLON.Color4(0.863, 0.863, 0.863, .5);
        pSystem2.minSize = 1.75;
        pSystem2.maxSize = 2.0;
        pSystem2.minLifeTime = 0.075;
        pSystem2.maxLifeTime = 0.1;
        pSystem2.emitRate = 400;
        pSystem2.gravity = new BABYLON.Vector3(0, 0, 0);
        pSystem2.direction1 = new BABYLON.Vector3(0, .05, 0);
        pSystem2.direction2 = new BABYLON.Vector3(0, -.05, 0);
        pSystem2.minAngularSpeed = 1.5;
        pSystem2.maxAngularSpeed = 2.5;
        pSystem2.minEmitPower = 1;
        pSystem2.maxEmitPower = 3;
        pSystem2.updateSpeed = 0.008;
        pSystem2.updateFunction = explosion;

        pSystem2.start();

        setTimeout(function () {
            bulletFireballRest.dispose();
        }, 1000);
    });

    var ground0 = ground[0];
    bulletFireball.physicsImpostor.registerOnPhysicsCollide(ground0.physicsImpostor, function() {
        pSystem.stop();

        var posAbs = bulletFireball.getAbsolutePosition();
        var pos = new BABYLON.Vector3(posAbs.x, posAbs.y, posAbs.z);
        bulletFireball.dispose();

        var bulletFireballRest = BABYLON.Mesh.CreateSphere('bulletFireballRest', 3, 1.6, scene);
        bulletFireballRest.checkCollisions = true;
        bulletFireballRest.physicsImpostor = new BABYLON.PhysicsImpostor(bulletFireball, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, friction: 1000, restitution: 0 });
        bulletFireballRest.position = pos;
        bulletFireballRest.visibility = false;

        var pSystem2 = new BABYLON.ParticleSystem("particles", 2000, scene);
        pSystem2.emitter = bulletFireballRest;
        pSystem2.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        pSystem2.light = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, 0, 0), scene);
        pSystem2.light.diffuse = new BABYLON.Color3(.8, 0, 0);
        pSystem2.light.range = 15;

        pSystem2.particleTexture = new BABYLON.Texture("Resources/fire/fire.jpg", scene);
        pSystem2.minEmitBox = new BABYLON.Vector3(-3.5, -3.5, -3.5);
        pSystem2.maxEmitBox = new BABYLON.Vector3(3.5, 3.5, 3.5);
        pSystem2.color1 = new BABYLON.Color4(1.0, 0.05, 0.05, .9);
        pSystem2.color2 = new BABYLON.Color4(1, 1, 0, .9);
        pSystem2.colorDead = new BABYLON.Color4(.5, .02, 0, .5);
        pSystem2.minSize = 1.75;
        pSystem2.maxSize = 2.0;
        pSystem2.minLifeTime = 0.075;
        pSystem2.maxLifeTime = 0.1;
        pSystem2.emitRate = 400;
        pSystem2.gravity = new BABYLON.Vector3(0, 0, 0);
        pSystem2.direction1 = new BABYLON.Vector3(0, .05, 0);
        pSystem2.direction2 = new BABYLON.Vector3(0, -.05, 0);
        pSystem2.minAngularSpeed = 1.5;
        pSystem2.maxAngularSpeed = 2.5;
        pSystem2.minEmitPower = 1;
        pSystem2.maxEmitPower = 3;
        pSystem2.updateSpeed = 0.008;
        pSystem2.updateFunction = explosion;

        pSystem2.start();

        setTimeout(function () {
            bulletFireballRest.dispose();
        }, 1000);
    });
};

var explosion = function(particles) {
    for (var index = 0; index < particles.length; index++) {
        var particle = particles[index];
        particle.age += this._scaledUpdateSpeed;

        // change direction to return to emitter
        if (particle.age >= particle.lifeTime / 2) {
            var oldLength = particle.direction.length();
            var newDirection = this.emitter.position.subtract(particle.position);
            particle.direction = newDirection.scale(3);
        }

        if (particle.age >= particle.lifeTime) { // Recycle
            particles.splice(index, 1);
            this._stockParticles.push(particle);
            index--;
            continue;
        } else {
            particle.colorStep.scaleToRef(this._scaledUpdateSpeed, this._scaledColorStep);
            particle.color.addInPlace(this._scaledColorStep);

            if (particle.color.a < 0)
                particle.color.a = 0;

            particle.angle += particle.angularSpeed * this._scaledUpdateSpeed;

            particle.direction.scaleToRef(this._scaledUpdateSpeed, this._scaledDirection);
            particle.position.addInPlace(this._scaledDirection);

            this.gravity.scaleToRef(this._scaledUpdateSpeed, this._scaledGravity);
            particle.direction.addInPlace(this._scaledGravity);
        }
    }
};
