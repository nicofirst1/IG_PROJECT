
var snowPS;

var snow = function (scene, skybox) {
    // Create a particle system
    snowPS = new BABYLON.ParticleSystem("particles", 50000, scene);

    //Texture of each particle
    snowPS.particleTexture = new BABYLON.Texture("Resources/map/flares/flare.png", scene);

    // Where the particles come from
    snowPS.emitter = skybox; // the starting object, the emitter
    snowPS.minEmitBox = new BABYLON.Vector3(-30, 0, -30); // Starting all from
    snowPS.maxEmitBox = new BABYLON.Vector3(40, 50, 40); // To...

    // Colors of all particles
    snowPS.color1 = new BABYLON.Color4(1, 1, 1.0, 1.0);
    snowPS.color2 = new BABYLON.Color4(1, 1, 1.0, 0.5);
    snowPS.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    snowPS.minSize = 0.1;
    snowPS.maxSize = 0.5;

    // Life time of each particle (random between...
    snowPS.minLifeTime = 3;
    snowPS.maxLifeTime = 15;

    // Emission rate
    snowPS.emitRate = 500;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    snowPS.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    snowPS.gravity = new BABYLON.Vector3(0, -15, 0);

    // Direction of each particle after it has been emitted
    snowPS.direction1 = new BABYLON.Vector3(-7, -8, 3);
    snowPS.direction2 = new BABYLON.Vector3(7, -8, -3);

    // Angular speed, in radians
    snowPS.minAngularSpeed = 0;
    snowPS.maxAngularSpeed = Math.PI;

    // Speed
    snowPS.minEmitPower = 2;
    snowPS.maxEmitPower = 3;
    snowPS.updateSpeed = 0.007;

    // Start the particle system
    snowPS.start();


};