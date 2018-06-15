var groundSize = 200;
var ground_max_z = 50;// the maximum for the ground height map
var sky_size = 10000.0; //the size of the skybox
var subdivisions = 32; // allows you to increase the complexity of your mesh in order to improve the visual quality of it
var ambient_fog = false;
var snow_flag=true;
var skybox ;


var initMap = function (scene, light, shadow, camera) {


    skybox = initSkybox(scene, sky_size);

    if (ambient_fog) {
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
        scene.fogDensity = 0.01;
    }


    snow(scene, skybox);

    var grounds = initGround(scene, groundSize);

    //initWater(scene, skybox, grounds);

    return grounds;
};

